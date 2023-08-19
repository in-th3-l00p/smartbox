package com.intheloop.smartbox.repository;

import com.intheloop.smartbox.domain.Card;
import com.intheloop.smartbox.domain.Device;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CardRepository extends CrudRepository<Card, Long> {
    List<Card> findAllByDevice(Device device);
}
