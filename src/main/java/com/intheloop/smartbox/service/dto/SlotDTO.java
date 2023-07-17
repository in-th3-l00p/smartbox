package com.intheloop.smartbox.service.dto;

import com.intheloop.smartbox.domain.Slot;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * DTO for {@link com.intheloop.smartbox.domain.Slot}
 */
public class SlotDTO implements Serializable {
    private final String createdBy;
    private final Instant createdDate;
    private final String lastModifiedBy;
    private final Instant lastModifiedDate;
    private final Long id;
    private final boolean empty;
    private final Double capacity;

    public SlotDTO(String createdBy, Instant createdDate, String lastModifiedBy, Instant lastModifiedDate, Long id, boolean empty, Double capacity) {
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.lastModifiedBy = lastModifiedBy;
        this.lastModifiedDate = lastModifiedDate;
        this.id = id;
        this.empty = empty;
        this.capacity = capacity;
    }

    public SlotDTO(Slot slot) {
        this.createdBy = slot.getCreatedBy();
        this.createdDate = slot.getCreatedDate();
        this.lastModifiedBy = slot.getLastModifiedBy();
        this.lastModifiedDate = slot.getLastModifiedDate();
        this.id = slot.getId();
        this.empty = slot.isEmpty();
        this.capacity = slot.getCapacity();
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
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
        return Objects.equals(this.createdBy, entity.createdBy) &&
            Objects.equals(this.createdDate, entity.createdDate) &&
            Objects.equals(this.lastModifiedBy, entity.lastModifiedBy) &&
            Objects.equals(this.lastModifiedDate, entity.lastModifiedDate) &&
            Objects.equals(this.id, entity.id) &&
            Objects.equals(this.empty, entity.empty) &&
            Objects.equals(this.capacity, entity.capacity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(createdBy, createdDate, lastModifiedBy, lastModifiedDate, id, empty, capacity);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
            "createdBy = " + createdBy + ", " +
            "createdDate = " + createdDate + ", " +
            "lastModifiedBy = " + lastModifiedBy + ", " +
            "lastModifiedDate = " + lastModifiedDate + ", " +
            "id = " + id + ", " +
            "empty = " + empty + ", " +
            "capacity = " + capacity + ")";
    }
}
