package com.intheloop.smartbox.web.rest.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class SlotNotFoundException extends RuntimeException{
    public SlotNotFoundException() {
        super("Fanta nu a fost găsită.");
    }
}
