package com.intheloop.smartbox.service;

import com.intheloop.smartbox.domain.Device;
import com.intheloop.smartbox.domain.DeviceLog;
import com.intheloop.smartbox.repository.DeviceLogRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceLogService {
    private final DeviceLogRepository deviceLogRepository;

    public DeviceLogService(DeviceLogRepository deviceLogRepository) {
        this.deviceLogRepository = deviceLogRepository;
    }

    public void create(Device device, String log) {
        var deviceLog = new DeviceLog();
        deviceLog.setDevice(device);
        deviceLog.setLog(log);
        deviceLogRepository.save(deviceLog);
    }

    public List<DeviceLog> getAll(Pageable pageable) {
        return deviceLogRepository
            .findAll(pageable)
            .toList();
    }
}
