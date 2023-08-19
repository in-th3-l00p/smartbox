package com.intheloop.smartbox.service.dto;

import com.intheloop.smartbox.domain.CardSlot;

public class CardSlotDTO {
    private String slotName;
    private Double value;

    public CardSlotDTO() {
    }

    public CardSlotDTO(CardSlot cardSlot) {
        this.slotName = cardSlot.getSlot().getName();
        this.value = cardSlot.getValue();
    }

    public String getSlotName() {
        return slotName;
    }

    public void setSlotName(String slotName) {
        this.slotName = slotName;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
