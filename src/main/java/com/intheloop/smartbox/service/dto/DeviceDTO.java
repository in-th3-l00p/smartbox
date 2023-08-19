package com.intheloop.smartbox.service.dto;

import com.intheloop.smartbox.domain.Device;

import java.util.Set;
import java.util.stream.Collectors;

public class DeviceDTO {
    private Long id;
    private String name;
    private String location;
    private Double latitude;
    private Double longitude;
    private Set<SlotDTO> slots;

    public DeviceDTO() {
    }

    public DeviceDTO(Device device) {
        this.id = device.getId();
        this.name = device.getName();
        this.location = device.getLocation();
        this.latitude = device.getLatitude();
        this.longitude = device.getLongitude();
        this.slots = device
            .getSlots()
            .stream()
            .map(SlotDTO::new)
            .collect(Collectors.toSet());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Set<SlotDTO> getSlots() {
        return slots;
    }

    public void setSlots(Set<SlotDTO> slots) {
        this.slots = slots;
    }
}
