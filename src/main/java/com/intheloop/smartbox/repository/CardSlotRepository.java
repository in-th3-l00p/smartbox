package com.intheloop.smartbox.repository;

import com.intheloop.smartbox.domain.Card;
import com.intheloop.smartbox.domain.CardSlot;
import com.intheloop.smartbox.domain.Slot;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CardSlotRepository extends CrudRepository<CardSlot, Long> {
    Optional<CardSlot> findByCardAndSlot(Card card, Slot slot);
}
