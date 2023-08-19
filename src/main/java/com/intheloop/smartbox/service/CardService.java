package com.intheloop.smartbox.service;

import com.intheloop.smartbox.domain.Card;
import com.intheloop.smartbox.domain.CardSlot;
import com.intheloop.smartbox.domain.Device;
import com.intheloop.smartbox.domain.User;
import com.intheloop.smartbox.repository.CardRepository;
import com.intheloop.smartbox.repository.CardSlotRepository;
import com.intheloop.smartbox.web.rest.errors.CardNotFound;
import org.springframework.stereotype.Service;

@Service
public class CardService {
    private final CardRepository cardRepository;
    private final CardSlotRepository cardSlotRepository;

    public CardService(CardRepository cardRepository, CardSlotRepository cardSlotRepository) {
        this.cardRepository = cardRepository;
        this.cardSlotRepository = cardSlotRepository;
    }

    public Card create(User user, Device device) {
        var card = new Card();
        card.setUser(user);
        card.setDevice(device);
        Card finalCard = cardRepository.save(card);
        device.getSlots().forEach(slot -> {
            var cardSlot = new CardSlot();
            cardSlot.setCard(finalCard);
            cardSlot.setSlot(slot);
            cardSlotRepository.save(cardSlot);
        });
        return finalCard;
    }

    public Card get(Long cardId) {
        return cardRepository
            .findById(cardId)
            .orElseThrow(CardNotFound::new);
    }

    public Card update(Card card, Device device) {
        cardSlotRepository.deleteAll(card.getCardSlots());
        card.setDevice(device);
        var finalCard = cardRepository.save(card);
        device.getSlots().forEach(slot -> {
            var cardSlot = new CardSlot();
            cardSlot.setCard(finalCard);
            cardSlot.setSlot(slot);
            cardSlotRepository.save(cardSlot);
        });
        return finalCard;
    }

    public void delete(Card card) {
        cardRepository.delete(card);
    }
}
