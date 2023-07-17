package com.intheloop.smartbox.repository;

import com.intheloop.smartbox.domain.Card;
import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<Card, Long> {
}
