package com.intheloop.smartbox.repository;

import com.intheloop.smartbox.domain.reports.DeviceReport;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface DeviceReportRepository extends
    CrudRepository<DeviceReport, Long>,
    PagingAndSortingRepository<DeviceReport, Long> {
}
