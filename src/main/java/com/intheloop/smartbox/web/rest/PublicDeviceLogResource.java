package com.intheloop.smartbox.web.rest;

import com.intheloop.smartbox.service.DeviceLogService;
import com.intheloop.smartbox.service.DeviceService;
import com.intheloop.smartbox.web.rest.vm.DeviceLogVM;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public/deviceLog")
public class PublicDeviceLogResource {
    private final DeviceLogService deviceLogService;
    private final DeviceService deviceService;

    public PublicDeviceLogResource(
        DeviceLogService deviceLogService,
        DeviceService deviceService
    ) {
        this.deviceLogService = deviceLogService;
        this.deviceService = deviceService;
    }

    /**
     * {@code POST /api/public/deviceLog} : Create a device log
     * @param deviceLogVM : device log view model
     */
    @PostMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void createDeviceLog(@RequestBody DeviceLogVM deviceLogVM) {
        var device = deviceService.get(deviceLogVM.getPub());
        deviceLogService.create(device, deviceLogVM.getLog());
    }
}
