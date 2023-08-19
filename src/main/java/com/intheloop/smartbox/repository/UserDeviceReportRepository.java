package com.intheloop.smartbox.repository;

import com.intheloop.smartbox.domain.reports.UserDeviceReport;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDeviceReportRepository extends
    CrudRepository<UserDeviceReport, Long>,
    PagingAndSortingRepository<UserDeviceReport, Long> {
}
