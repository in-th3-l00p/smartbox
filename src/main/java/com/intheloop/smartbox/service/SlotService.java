package com.intheloop.smartbox.service;

import com.intheloop.smartbox.domain.CardSlot;
import com.intheloop.smartbox.domain.Device;
import com.intheloop.smartbox.domain.Slot;
import com.intheloop.smartbox.repository.CardRepository;
import com.intheloop.smartbox.repository.CardSlotRepository;
import com.intheloop.smartbox.repository.SlotRepository;
import com.intheloop.smartbox.web.rest.errors.SlotNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SlotService {
    private final SlotRepository slotRepository;
    private final CardSlotRepository cardSlotRepository;
    private final CardRepository cardRepository;

    public SlotService(SlotRepository slotRepository,
                       CardSlotRepository cardSlotRepository,
                       CardRepository cardRepository) {
        this.slotRepository = slotRepository;
        this.cardSlotRepository = cardSlotRepository;
        this.cardRepository = cardRepository;
    }

    public Slot create(String name, Device device) {
        var slot = new Slot();
        slot.setName(name);
        slot.setDevice(device);
        var finalSlot = slotRepository.save(slot);
        cardRepository.findAllByDevice(device).forEach(card -> {
            var cardSlot = new CardSlot();
            cardSlot.setCard(card);
            cardSlot.setSlot(finalSlot);
            cardSlot.setValue(0.0);
            cardSlotRepository.save(cardSlot);
        });
        return finalSlot;
    }

    public Slot get(Long slotId) {
        var slot = slotRepository.findById(slotId);
        return slot.orElseThrow(SlotNotFoundException::new);
    }

    public void delete(Slot slot) {
        cardRepository.findAllByDevice(slot.getDevice()).forEach(card -> {
            var cardSlot = cardSlotRepository.findByCardAndSlot(card, slot);
            cardSlot.ifPresent(cardSlotRepository::delete);
        });
        slotRepository.delete(slot);
    }
}
