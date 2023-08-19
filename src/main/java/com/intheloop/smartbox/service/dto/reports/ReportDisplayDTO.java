package com.intheloop.smartbox.service.dto.reports;

import com.intheloop.smartbox.domain.reports.DeviceReport;
import com.intheloop.smartbox.domain.reports.UserDeviceReport;
import com.intheloop.smartbox.domain.reports.UserReport;

import java.time.Instant;

public class ReportDisplayDTO {
    private final Long id;
    private final Instant createdAt;

    public ReportDisplayDTO(UserReport userReport) {
        this.id = userReport.getId();
        this.createdAt = userReport.getCreatedDate();
    }

    public ReportDisplayDTO(DeviceReport deviceReport) {
        this.id = deviceReport.getId();
        this.createdAt = deviceReport.getCreatedDate();
    }

    public ReportDisplayDTO(UserDeviceReport userDeviceReport) {
        this.id = userDeviceReport.getId();
        this.createdAt = userDeviceReport.getCreatedDate();
    }

    public Long getId() {
        return id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
