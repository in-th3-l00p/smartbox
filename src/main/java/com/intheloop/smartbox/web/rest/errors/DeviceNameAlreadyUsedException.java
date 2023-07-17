package com.intheloop.smartbox.web.rest.errors;

import java.net.URI;

@SuppressWarnings("java:S110") // Inheritance tree of classes should not be too deep
public class DeviceNameAlreadyUsedException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public DeviceNameAlreadyUsedException() {
        super(URI.create(""), "Numele dispozitivului este deja folosit", "deviceManagement", "deviceexists");
    }
}
