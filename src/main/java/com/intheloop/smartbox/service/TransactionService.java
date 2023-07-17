package com.intheloop.smartbox.service;

import com.intheloop.smartbox.domain.Card;
import com.intheloop.smartbox.repository.TransactionRepository;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public void createTransaction(Card card, double capacity) {

    }
}
