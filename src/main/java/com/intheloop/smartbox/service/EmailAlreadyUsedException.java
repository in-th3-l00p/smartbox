package com.intheloop.smartbox.service;

public class EmailAlreadyUsedException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public EmailAlreadyUsedException() {
        super("Emailul este deja folosit!");
    }
}
