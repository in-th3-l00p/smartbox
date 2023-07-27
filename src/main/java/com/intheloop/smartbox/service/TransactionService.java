package com.intheloop.smartbox.service;

import com.intheloop.smartbox.domain.Card;
import com.intheloop.smartbox.domain.Transaction;
import com.intheloop.smartbox.domain.User;
import com.intheloop.smartbox.repository.SlotRepository;
import com.intheloop.smartbox.repository.TransactionRepository;
import com.intheloop.smartbox.web.rest.errors.SlotNotFoundException;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final SlotRepository slotRepository;

    public TransactionService(
        TransactionRepository transactionRepository,
        SlotRepository slotRepository
    ) {
        this.transactionRepository = transactionRepository;
        this.slotRepository = slotRepository;
    }

    public void createTransaction(Card card, Long slotCount, double volume) {
        var slotList = card
            .getDevice()
            .getSlots()
            .stream()
            .sorted((a, b) -> a.getId().compareTo(b.getId()))
            .toList();
        if (slotList.size() < slotCount)
            throw new SlotNotFoundException();
        var slot = slotList.get(slotCount.intValue() - 1);

        var transaction = new Transaction();
        transaction.setCard(card);
        transaction.setVolume(volume);
        transaction.setSlot(slot);
        transactionRepository.save(transaction);

        slot.setVolume(slot.getVolume() + volume);
        slotRepository.save(slot);
    }

    public List<Transaction> getAll(Pageable pageable) {
        return transactionRepository
            .findAll(pageable)
            .toList();
    }

    public List<Transaction> getUserTransactions(User user, Pageable pageable) {
        return transactionRepository
            .findAllByCard(user.getCard(), pageable)
            .toList();
    }
}
