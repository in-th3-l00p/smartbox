package com.intheloop.smartbox.service.dto.reports;

import com.intheloop.smartbox.domain.reports.DeviceReport;

import java.util.List;

public class DeviceReportDTO {
    private final Long id;
    private final Long deviceId;
    private final String deviceName;
    private final String deviceLocation;
    private final List<ReportSlotDTO> slots;

    public DeviceReportDTO(DeviceReport deviceReport) {
        this.id = deviceReport.getId();
        this.deviceId = deviceReport.getDeviceId();
        this.deviceName = deviceReport.getDeviceName();
        this.deviceLocation = deviceReport.getDeviceLocation();
        this.slots = deviceReport
            .getReportSlots()
            .stream()
            .map(ReportSlotDTO::new)
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

    public List<ReportSlotDTO> getSlots() {
        return slots;
    }
}
