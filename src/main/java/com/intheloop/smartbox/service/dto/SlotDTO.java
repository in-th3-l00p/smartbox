package com.intheloop.smartbox.service.dto;

import com.intheloop.smartbox.domain.Slot;

import java.io.Serializable;

/**
 * DTO for {@link com.intheloop.smartbox.domain.Slot}
 */
public class SlotDTO implements Serializable {
    private final Long id;
    private final Double volume;

    public SlotDTO(Long id, Double volume) {
        this.id = id;
        this.volume = volume;
    }

    public SlotDTO(Slot slot) {
        this.id = slot.getId();
        this.volume = slot.getVolume();
    }

    public Long getId() {
        return id;
    }

    public Double getVolume() {
        return volume;
    }
}
