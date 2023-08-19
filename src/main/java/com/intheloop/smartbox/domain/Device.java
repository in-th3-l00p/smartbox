package com.intheloop.smartbox.domain;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @OneToMany(
        cascade = CascadeType.REMOVE,
        mappedBy = "device",
        fetch = FetchType.EAGER
    )
    private Set<Slot> slots = new HashSet<>();

    @OneToMany(mappedBy = "device", cascade = CascadeType.REMOVE)
    private Set<Card> cards = new HashSet<>();

    @OneToMany(mappedBy = "device", cascade = CascadeType.REMOVE)
    private Set<DeviceLog> deviceLogs = new HashSet<>();
    public Device() {
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

    public Set<Card> getCards() {
        return cards;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }

    public Set<Slot> getSlots() {
        return slots;
    }

    public void setSlots(Set<Slot> slots) {
        this.slots = slots;
    }

    public Set<DeviceLog> getDeviceLogs() {
        return deviceLogs;
    }

    public void setDeviceLogs(Set<DeviceLog> deviceLogs) {
        this.deviceLogs = deviceLogs;
    }
}
