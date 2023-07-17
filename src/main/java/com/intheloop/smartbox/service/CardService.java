package com.intheloop.smartbox.service;

import com.intheloop.smartbox.domain.Card;
import com.intheloop.smartbox.domain.Device;
import com.intheloop.smartbox.domain.User;
import com.intheloop.smartbox.repository.CardRepository;
import org.springframework.stereotype.Service;

@Service
public class CardService {
    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    public void create(User user, Device device) {
        Card card = new Card();
        card.setUser(user);
        card.setDevice(device);
        cardRepository.save(card);
    }

    public void update(Card card, Device device) {
        card.setDevice(device);
        cardRepository.save(card);
    }

    public void delete(Card card) {
        cardRepository.delete(card);
    }
}
