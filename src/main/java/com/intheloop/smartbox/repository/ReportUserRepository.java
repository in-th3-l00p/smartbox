package com.intheloop.smartbox.repository;

import com.intheloop.smartbox.domain.reports.ReportUser;
import org.springframework.data.repository.CrudRepository;

public interface ReportUserRepository extends
    CrudRepository<ReportUser, Long> {
}
