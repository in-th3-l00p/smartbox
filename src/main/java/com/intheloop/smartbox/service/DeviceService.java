package com.intheloop.smartbox.service;

import com.intheloop.smartbox.domain.Device;
import com.intheloop.smartbox.repository.DeviceRepository;
import com.intheloop.smartbox.repository.SlotRepository;
import com.intheloop.smartbox.web.rest.errors.BadRequestAlertException;
import com.intheloop.smartbox.web.rest.errors.DeviceNameAlreadyUsedException;
import com.intheloop.smartbox.web.rest.errors.DeviceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceService {
    private final Logger log = LoggerFactory.getLogger(DeviceService.class);
    private final DeviceRepository deviceRepository;
    private final SlotRepository slotRepository;

    public DeviceService(DeviceRepository deviceRepository,
                         SlotRepository slotRepository) {
        this.deviceRepository = deviceRepository;
        this.slotRepository = slotRepository;
    }

    public Device create(String name, String location) {
        if (name.isEmpty() || location.isEmpty())
            throw new BadRequestAlertException("Datele oferite sunt invalide", "deviceManager", "invaliddata");
        var existing = deviceRepository.findByName(name);
        if (existing.isPresent())
            throw new DeviceNameAlreadyUsedException();
        var device = new Device();
        device.setName(name);
        device.setLocation(location);
        device = deviceRepository.save(device);
        return device;
    }

    public List<Device> getDevices(Pageable pageable) {
        return deviceRepository
            .findAll(pageable)
            .stream()
            .toList();
    }

    public Device get(Long id) {
        var device = deviceRepository.findById(id);
        return device.orElseThrow(DeviceNotFoundException::new);
    }

    public Device get(String name) {
        var device = deviceRepository.findByName(name);
        return device.orElseThrow(DeviceNotFoundException::new);
    }

    public void delete(Long id) {
        deviceRepository
            .findById(id)
            .ifPresentOrElse(
                deviceRepository::delete,
                () -> { throw new DeviceNotFoundException(); }
            );

    }

    public void update(Long id, String name, String location) {
        if (name.isEmpty() || location.isEmpty())
            throw new BadRequestAlertException("Datele oferite sunt invalide", "deviceManager", "invaliddata");
        var existing = deviceRepository.findByName(name);
        if (existing.isPresent())
            throw new DeviceNameAlreadyUsedException();
        deviceRepository
            .findById(id)
            .ifPresentOrElse(
                (device) -> {
                    device.setName(name);
                    device.setLocation(location);
                    deviceRepository.save(device);
                },
                () -> { throw new DeviceNotFoundException(); }
            );
    }
}
