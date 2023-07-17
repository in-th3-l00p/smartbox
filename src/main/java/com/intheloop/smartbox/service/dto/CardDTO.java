package com.intheloop.smartbox.service.dto;

import com.intheloop.smartbox.domain.Card;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * DTO for {@link com.intheloop.smartbox.domain.Card}
 */
public class CardDTO implements Serializable {
    private final String createdBy;
    private final Instant createdDate;
    private final String lastModifiedBy;
    private final Instant lastModifiedDate;
    private final Long id;

    public CardDTO(String createdBy, Instant createdDate, String lastModifiedBy, Instant lastModifiedDate, Long id) {
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.lastModifiedBy = lastModifiedBy;
        this.lastModifiedDate = lastModifiedDate;
        this.id = id;
    }

    public CardDTO(Card card) {
        this.createdBy = card.getCreatedBy();
        this.createdDate = card.getCreatedDate();
        this.lastModifiedBy = card.getLastModifiedBy();
        this.lastModifiedDate = card.getLastModifiedDate();
        this.id = card.getId();
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CardDTO entity = (CardDTO) o;
        return Objects.equals(this.createdBy, entity.createdBy) &&
            Objects.equals(this.createdDate, entity.createdDate) &&
            Objects.equals(this.lastModifiedBy, entity.lastModifiedBy) &&
            Objects.equals(this.lastModifiedDate, entity.lastModifiedDate) &&
            Objects.equals(this.id, entity.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(createdBy, createdDate, lastModifiedBy, lastModifiedDate, id);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
            "createdBy = " + createdBy + ", " +
            "createdDate = " + createdDate + ", " +
            "lastModifiedBy = " + lastModifiedBy + ", " +
            "lastModifiedDate = " + lastModifiedDate + ", " +
            "id = " + id + ")";
    }
}
