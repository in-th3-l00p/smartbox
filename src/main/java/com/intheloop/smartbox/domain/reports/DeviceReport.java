package com.intheloop.smartbox.domain.reports;

import com.intheloop.smartbox.domain.AbstractAuditingEntity;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "device_reports")
public class DeviceReport extends AbstractAuditingEntity<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "device_id", nullable = false)
    private Long deviceId;

    @Column(name = "device_name", nullable = false)
    private String deviceName;

    @Column(name = "device_location", nullable = false)
    private String deviceLocation;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "deviceReport")
    private Set<ReportSlot> reportSlots = new HashSet<>();

    public DeviceReport() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(Long deviceId) {
        this.deviceId = deviceId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getDeviceLocation() {
        return deviceLocation;
    }

    public void setDeviceLocation(String deviceLocation) {
        this.deviceLocation = deviceLocation;
    }

    public Set<ReportSlot> getReportSlots() {
        return reportSlots;
    }

    public void setReportSlots(Set<ReportSlot> reportSlots) {
        this.reportSlots = reportSlots;
    }
}
