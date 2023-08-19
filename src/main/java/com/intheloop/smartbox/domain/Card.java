package com.intheloop.smartbox.domain;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table
public class Card extends AbstractAuditingEntity<Long> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne
    private User user;

    @ManyToOne
    private Device device;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "card")
    private Set<Transaction> transactions = new HashSet<>();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "card", cascade = CascadeType.REMOVE)
    private Set<CardSlot> cardSlots = new HashSet<>();

    public Card() {
    }

    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public Set<CardSlot> getCardSlots() {
        return cardSlots;
    }

    public void setCardSlots(Set<CardSlot> cardSlots) {
        this.cardSlots = cardSlots;
    }
}
