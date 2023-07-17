package com.intheloop.smartbox.service;

import com.intheloop.smartbox.domain.Card;
import com.intheloop.smartbox.domain.Device;
import com.intheloop.smartbox.domain.User;
import com.intheloop.smartbox.repository.CardRepository;
import com.intheloop.smartbox.web.rest.errors.CardNotFound;
import org.springframework.stereotype.Service;

@Service
public class CardService {
    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public Card create(User user, Device device) {
        Card card = new Card();
        card.setUser(user);
        card.setDevice(device);
        return cardRepository.save(card);
    }

    public Card get(Long cardId) {
        return cardRepository
            .findById(cardId)
            .orElseThrow(CardNotFound::new);
    }

    public Card update(Card card, Device device) {
        card.setDevice(device);
        return cardRepository.save(card);
    }

    public void delete(Card card) {
        cardRepository.delete(card);
    }
}
