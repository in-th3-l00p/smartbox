package com.intheloop.smartbox.service;

import com.intheloop.smartbox.domain.Device;
import com.intheloop.smartbox.domain.Slot;
import com.intheloop.smartbox.repository.SlotRepository;
import com.intheloop.smartbox.web.rest.errors.SlotNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SlotService {
    private final SlotRepository slotRepository;

    public SlotService(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    public Slot create(Device device) {
        var slot = new Slot();
        slot.setDevice(device);
        return slotRepository.save(slot);
    }

    public Slot get(Long slotId) {
        var slot = slotRepository.findById(slotId);
        return slot.orElseThrow(SlotNotFoundException::new);
    }

    public void updateCapacity(Slot slot, Double volume) {
        slot.setVolume(volume);
        slotRepository.save(slot);
    }

    public void delete(Slot slot) {
        slotRepository.delete(slot);
    }
}
