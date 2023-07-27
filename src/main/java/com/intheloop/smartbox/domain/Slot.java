package com.intheloop.smartbox.domain;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table
public class Slot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "volume", nullable = false)
    private Double volume = 0.0;

    @ManyToOne
    private Device device;

    @OneToMany(mappedBy = "slot", cascade = CascadeType.REMOVE)
    private Set<Transaction> transactions;

    public Slot() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getVolume() {
        return volume;
    }

    public void setVolume(Double volume) {
        this.volume = volume;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }
}
