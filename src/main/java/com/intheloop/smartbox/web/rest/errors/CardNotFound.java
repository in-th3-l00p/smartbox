package com.intheloop.smartbox.web.rest.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CardNotFound extends RuntimeException {
    public CardNotFound() {
        super("Cardul nu a fost găsit.");
    }
}
