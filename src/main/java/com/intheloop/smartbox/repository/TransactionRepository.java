package com.intheloop.smartbox.repository;

import com.intheloop.smartbox.domain.Card;
import com.intheloop.smartbox.domain.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TransactionRepository extends
    CrudRepository<Transaction, Long>,
    PagingAndSortingRepository<Transaction, Long> {
    Page<Transaction> findAllByCard(Card card, Pageable pageable);
}
