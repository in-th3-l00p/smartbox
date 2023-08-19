package com.intheloop.smartbox.service.dto.reports;

import com.intheloop.smartbox.domain.reports.UserReport;

import java.util.List;

public class UserReportDTO {
    private final Long id;
    private final Long userId;
    private final String username;
    private final String firstName;
    private final String lastName;
    private final String address;
    private final String email;
    private final Long deviceId;
    private final Long cardId;
    private final List<ReportSlotDTO> slots;

    public UserReportDTO(UserReport userReport) {
        this.id = userReport.getId();
        this.userId = userReport.getUserId();
        this.username = userReport.getUsername();
        this.firstName = userReport.getUserFirstName();
        this.lastName = userReport.getUserLastName();
        this.address = userReport.getUserAddress();
        this.email = userReport.getUserEmail();
        this.deviceId = userReport.getDeviceId();
        this.cardId = userReport.getCardId();
        this.slots = userReport
            .getReportSlots()
            .stream()
            .map(ReportSlotDTO::new)
            .toList();
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public Long getCardId() {
        return cardId;
    }

    public List<ReportSlotDTO> getSlots() {
        return slots;
    }
}
