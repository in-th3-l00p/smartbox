package com.intheloop.smartbox.repository;

import com.intheloop.smartbox.domain.DeviceLog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface DeviceLogRepository extends
    CrudRepository<DeviceLog, Long>,
    PagingAndSortingRepository<DeviceLog, Long>
{
}
