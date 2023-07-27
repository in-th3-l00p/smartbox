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
    private final Long userId;
    private final DeviceDTO device;

    public CardDTO(String createdBy, Instant createdDate, String lastModifiedBy, Instant lastModifiedDate, Long id, Long userId, DeviceDTO device) {
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.lastModifiedBy = lastModifiedBy;
        this.lastModifiedDate = lastModifiedDate;
        this.id = id;
        this.userId = userId;
        this.device = device;
    }

    public CardDTO(Card card) {
        this.createdBy = card.getCreatedBy();
        this.createdDate = card.getCreatedDate();
        this.lastModifiedBy = card.getLastModifiedBy();
        this.lastModifiedDate = card.getLastModifiedDate();
        this.id = card.getId();
        this.userId = card.getUser().getId();
        this.device = new DeviceDTO(card.getDevice());
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

    public Long getUserId() {
        return userId;
    }

    public DeviceDTO getDevice() {
        return device;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CardDTO cardDTO = (CardDTO) o;
        return Objects.equals(createdBy, cardDTO.createdBy) && Objects.equals(createdDate, cardDTO.createdDate) && Objects.equals(lastModifiedBy, cardDTO.lastModifiedBy) && Objects.equals(lastModifiedDate, cardDTO.lastModifiedDate) && Objects.equals(id, cardDTO.id) && Objects.equals(userId, cardDTO.userId) && Objects.equals(device, cardDTO.device);
    }

    @Override
    public int hashCode() {
        return Objects.hash(createdBy, createdDate, lastModifiedBy, lastModifiedDate, id, userId, device);
    }

    @Override
    public String toString() {
        return "CardDTO{" +
            "createdBy='" + createdBy + '\'' +
            ", createdDate=" + createdDate +
            ", lastModifiedBy='" + lastModifiedBy + '\'' +
            ", lastModifiedDate=" + lastModifiedDate +
            ", id=" + id +
            ", userId=" + userId +
            ", device=" + device +
            '}';
    }
}
