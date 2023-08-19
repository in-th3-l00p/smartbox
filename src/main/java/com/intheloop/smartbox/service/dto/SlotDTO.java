package com.intheloop.smartbox.service.dto;

import com.intheloop.smartbox.domain.Slot;

import java.io.Serializable;

/**
 * DTO for {@link com.intheloop.smartbox.domain.Slot}
 */
public class SlotDTO implements Serializable {
    private final Long id;
    private final String name;
    private final Double volume;

    public SlotDTO(Long id, String name, Double volume) {
        this.id = id;
        this.name = name;
        this.volume = volume;
    }

    public SlotDTO(Slot slot) {
        this.id = slot.getId();
        this.name = slot.getName();
        this.volume = slot.getVolume();
    }

    public Long getId() {
        return id;
    }

    public Double getVolume() {
        return volume;
    }

    public String getName() {
        return name;
    }
}
