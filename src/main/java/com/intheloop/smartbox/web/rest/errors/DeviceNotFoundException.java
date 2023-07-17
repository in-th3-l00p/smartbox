package com.intheloop.smartbox.web.rest.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DeviceNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public DeviceNotFoundException() {
        super("Dispozitivul nu a fost găsit.");
    }
}
