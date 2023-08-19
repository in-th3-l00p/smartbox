package com.intheloop.smartbox.service.dto;

import com.intheloop.smartbox.domain.Card;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

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
    private final List<CardSlotDTO> cardSlots;

    public CardDTO(Card card) {
        this.createdBy = card.getCreatedBy();
        this.createdDate = card.getCreatedDate();
        this.lastModifiedBy = card.getLastModifiedBy();
        this.lastModifiedDate = card.getLastModifiedDate();
        this.id = card.getId();
        this.userId = card.getUser().getId();
        this.device = new DeviceDTO(card.getDevice());
        this.cardSlots = card.getCardSlots().stream().map(CardSlotDTO::new).toList();
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

    public List<CardSlotDTO> getCardSlots() {
        return cardSlots;
    }
}
