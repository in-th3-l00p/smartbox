package com.intheloop.smartbox.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * DTO for {@link com.intheloop.smartbox.domain.Transaction}
 */
public class TransactionDTO implements Serializable {
    private final String createdBy;
    private final Instant createdDate;
    private final String lastModifiedBy;
    private final Instant lastModifiedDate;
    private final Long id;
    private final Double capacity;

    public TransactionDTO(String createdBy, Instant createdDate, String lastModifiedBy, Instant lastModifiedDate, Long id, Double capacity) {
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.lastModifiedBy = lastModifiedBy;
        this.lastModifiedDate = lastModifiedDate;
        this.id = id;
        this.capacity = capacity;
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

    public Double getCapacity() {
        return capacity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TransactionDTO entity = (TransactionDTO) o;
        return Objects.equals(this.createdBy, entity.createdBy) &&
            Objects.equals(this.createdDate, entity.createdDate) &&
            Objects.equals(this.lastModifiedBy, entity.lastModifiedBy) &&
            Objects.equals(this.lastModifiedDate, entity.lastModifiedDate) &&
            Objects.equals(this.id, entity.id) &&
            Objects.equals(this.capacity, entity.capacity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(createdBy, createdDate, lastModifiedBy, lastModifiedDate, id, capacity);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
            "createdBy = " + createdBy + ", " +
            "createdDate = " + createdDate + ", " +
            "lastModifiedBy = " + lastModifiedBy + ", " +
            "lastModifiedDate = " + lastModifiedDate + ", " +
            "id = " + id + ", " +
            "capacity = " + capacity + ")";
    }
}
