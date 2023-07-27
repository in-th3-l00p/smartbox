package com.intheloop.smartbox.service.dto;

import com.intheloop.smartbox.domain.DeviceLog;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * DTO for {@link com.intheloop.smartbox.domain.DeviceLog}
 */
public class DeviceLogDTO implements Serializable {
    private final Instant createdDate;
    private final Long id;
    private final String log;
    private final DeviceDTO device;

    public DeviceLogDTO(Instant createdDate, Long id, String log, DeviceDTO device) {
        this.createdDate = createdDate;
        this.id = id;
        this.log = log;
        this.device = device;
    }

    public DeviceLogDTO(DeviceLog deviceLog) {
        this.id = deviceLog.getId();
        this.log = deviceLog.getLog();
        this.device = new DeviceDTO(deviceLog.getDevice());
        this.createdDate = deviceLog.getCreatedDate();
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public Long getId() {
        return id;
    }

    public String getLog() {
        return log;
    }

    public DeviceDTO getDevice() {
        return device;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DeviceLogDTO entity = (DeviceLogDTO) o;
        return Objects.equals(this.createdDate, entity.createdDate) &&
            Objects.equals(this.id, entity.id) &&
            Objects.equals(this.log, entity.log) &&
            Objects.equals(this.device, entity.device);
    }

    @Override
    public int hashCode() {
        return Objects.hash(createdDate, id, log, device);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
            "createdDate = " + createdDate + ", " +
            "id = " + id + ", " +
            "log = " + log + ", " +
            "device = " + device + ")";
    }
}
