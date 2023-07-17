package com.intheloop.smartbox.repository;

import com.intheloop.smartbox.domain.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface DeviceRepository extends
    CrudRepository<Device, Long>,
    PagingAndSortingRepository<Device, Long>
{
    Optional<Device> findByName(String name);
    Page<Device> findAll(Pageable pageable);
}
