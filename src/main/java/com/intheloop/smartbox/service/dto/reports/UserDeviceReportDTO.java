package com.intheloop.smartbox.service.dto.reports;

import com.intheloop.smartbox.domain.reports.ReportUserDTO;
import com.intheloop.smartbox.domain.reports.UserDeviceReport;

import java.util.List;

public class UserDeviceReportDTO {
    private final Long id;
    private final Long deviceId;
    private final String deviceName;
    private final String deviceLocation;
    private final List<ReportUserDTO> users;

    public UserDeviceReportDTO(UserDeviceReport userDeviceReport) {
        this.id = userDeviceReport.getId();
        this.deviceId = userDeviceReport.getDeviceId();
        this.deviceName = userDeviceReport.getDeviceName();
        this.deviceLocation = userDeviceReport.getDeviceLocation();
        this.users = userDeviceReport
            .getUsers()
            .stream()
            .map(ReportUserDTO::new)
            .toList();
    }

    public Long getId() {
        return id;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public String getDeviceLocation() {
        return deviceLocation;
    }

    public List<ReportUserDTO> getUsers() {
        return users;
    }
}
