package com.intheloop.smartbox.domain.reports;

public class ReportUserDTO {
    private final Long id;
    private final Long userId;
    private final String username;
    private final String firstName;
    private final String lastName;
    private final String address;
    private final String email;
    private final Long cardId;

    public ReportUserDTO(ReportUser reportUser) {
        this.id = reportUser.getId();
        this.userId = reportUser.getUserId();
        this.username = reportUser.getLogin();
        this.firstName = reportUser.getFirstName();
        this.lastName = reportUser.getLastName();
        this.address = reportUser.getAddress();
        this.email = reportUser.getEmail();
        this.cardId = reportUser.getCardId();
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

    public Long getCardId() {
        return cardId;
    }
}
