package com.intheloop.smartbox.repository;

import com.intheloop.smartbox.domain.Slot;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface SlotRepository extends
    CrudRepository<Slot, Long>,
    PagingAndSortingRepository<Slot, Long>
{

}
