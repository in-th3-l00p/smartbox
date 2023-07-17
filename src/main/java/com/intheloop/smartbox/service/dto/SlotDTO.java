package com.intheloop.smartbox.service.dto;

import com.intheloop.smartbox.domain.Slot;

import java.io.Serializable;
import java.util.Objects;

/**
 * DTO for {@link com.intheloop.smartbox.domain.Slot}
 */
public class SlotDTO implements Serializable {
    private final Long id;
    private final boolean empty;
    private final Double capacity;

    public SlotDTO(Long id, boolean empty, Double capacity) {
        this.id = id;
        this.empty = empty;
        this.capacity = capacity;
    }

    public SlotDTO(Slot slot) {
        this.id = slot.getId();
        this.empty = slot.isEmpty();
        this.capacity = slot.getCapacity();
    }

    public Long getId() {
        return id;
    }

    public boolean isEmpty() {
        return empty;
    }

    public Double getCapacity() {
        return capacity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SlotDTO entity = (SlotDTO) o;
        return
            Objects.equals(this.id, entity.id) &&
            Objects.equals(this.empty, entity.empty) &&
            Objects.equals(this.capacity, entity.capacity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, empty, capacity);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
            "id = " + id + ", " +
            "empty = " + empty + ", " +
            "capacity = " + capacity + ")";
    }
}
