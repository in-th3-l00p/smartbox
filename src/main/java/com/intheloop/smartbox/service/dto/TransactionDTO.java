package com.intheloop.smartbox.service.dto;

import com.intheloop.smartbox.domain.Transaction;

import java.io.Serializable;
import java.time.Instant;

/**
 * DTO for {@link com.intheloop.smartbox.domain.Transaction}
 */
public class TransactionDTO implements Serializable {
    private final String createdBy;
    private final Instant createdDate;
    private final String lastModifiedBy;
    private final Instant lastModifiedDate;
    private final Long id;
    private final Double volume;
    private final CardDTO card;
    private final SlotDTO slot;

    public TransactionDTO(String createdBy, Instant createdDate, String lastModifiedBy, Instant lastModifiedDate, Long id, Double volume, CardDTO card, SlotDTO slot) {
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.lastModifiedBy = lastModifiedBy;
        this.lastModifiedDate = lastModifiedDate;
        this.id = id;
        this.volume = volume;
        this.card = card;
        this.slot = slot;
    }

    public TransactionDTO(Transaction transaction) {
        this.id = transaction.getId();
        this.createdBy = transaction.getCreatedBy();
        this.createdDate = transaction.getCreatedDate();
        this.lastModifiedBy = transaction.getLastModifiedBy();
        this.lastModifiedDate = transaction.getLastModifiedDate();
        this.volume = transaction.getVolume();
        this.card = new CardDTO(transaction.getCard());
        this.slot = new SlotDTO(transaction.getSlot());
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

    public Double getVolume() {
        return volume;
    }

    public CardDTO getCard() {
        return card;
    }

    public SlotDTO getSlot() {
        return slot;
    }
}
