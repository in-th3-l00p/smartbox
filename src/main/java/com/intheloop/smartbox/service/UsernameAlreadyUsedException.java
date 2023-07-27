package com.intheloop.smartbox.service;

public class UsernameAlreadyUsedException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public UsernameAlreadyUsedException() {
        super("Numele de utilizator este deja folosit!");
    }
}
