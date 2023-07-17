package com.intheloop.smartbox.domain;

import jakarta.persistence.*;
import java.util.Set;
import java.util.HashSet;

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

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "device")
    private Set<Slot> slots = new HashSet<>();

    @OneToMany(
        cascade = CascadeType.ALL,
        mappedBy = "device",
        fetch = FetchType.EAGER
    )
    private Set<Card> cards = new HashSet<>();

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
}
