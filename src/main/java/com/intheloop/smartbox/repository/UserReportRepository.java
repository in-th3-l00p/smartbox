package com.intheloop.smartbox.repository;

import com.intheloop.smartbox.domain.reports.UserReport;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserReportRepository extends
    CrudRepository<UserReport, Long>,
    PagingAndSortingRepository<UserReport, Long> {
}
