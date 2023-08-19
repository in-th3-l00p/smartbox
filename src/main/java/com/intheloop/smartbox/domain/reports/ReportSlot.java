package com.intheloop.smartbox.domain.reports;

import jakarta.persistence.*;

@Entity
@Table(name = "report_slots")
public class ReportSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String slotName;

    @Column(nullable = false)
    private Double volume;

    @ManyToOne
    private UserReport userReport;

    @ManyToOne
    private DeviceReport deviceReport;

    public ReportSlot() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSlotName() {
        return slotName;
    }

    public void setSlotName(String slotName) {
        this.slotName = slotName;
    }

    public Double getVolume() {
        return volume;
    }

    public void setVolume(Double volume) {
        this.volume = volume;
    }

    public UserReport getUserReport() {
        return userReport;
    }

    public void setUserReport(UserReport userReport) {
        this.userReport = userReport;
    }

    public DeviceReport getDeviceReport() {
        return deviceReport;
    }

    public void setDeviceReport(DeviceReport deviceReport) {
        this.deviceReport = deviceReport;
    }
}
