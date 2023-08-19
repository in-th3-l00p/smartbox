package com.intheloop.smartbox.web.rest;

import com.intheloop.smartbox.service.DeviceLogService;
import com.intheloop.smartbox.service.DeviceService;
import com.intheloop.smartbox.service.dto.DeviceCoordinatesDTO;
import com.intheloop.smartbox.web.rest.vm.DeviceCoordinateVM;
import com.intheloop.smartbox.web.rest.vm.DeviceLogVM;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/device")
public class PublicDeviceResource {
    private final DeviceLogService deviceLogService;
    private final DeviceService deviceService;

    public PublicDeviceResource(
        DeviceLogService deviceLogService,
        DeviceService deviceService
    ) {
        this.deviceLogService = deviceLogService;
        this.deviceService = deviceService;
    }

    /**
     * {@code POST /api/public/device/log} : Create a device log
     * @param deviceLogVM : device log view model
     */
    @PostMapping(
        path = "/log",
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void createDeviceLog(@RequestBody DeviceLogVM deviceLogVM) {
        var device = deviceService.get(deviceLogVM.getPub());
        deviceLogService.create(device, deviceLogVM.getLog());
    }

    @PostMapping(
        path = "/coordinate",
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void updateDeviceCoordinates(@RequestBody DeviceCoordinateVM deviceCoordinateVM) {
        var device = deviceService.get(deviceCoordinateVM.getPub());
        deviceService.setCoordinates(
            device,
            deviceCoordinateVM.getLatitude(),
            deviceCoordinateVM.getLongitude()
        );
    }

    @GetMapping(
        path = "/coordinate",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<DeviceCoordinatesDTO> getAllDeviceCoordinates() {
        return deviceService
            .getDevices(Pageable.unpaged())
            .stream().map(DeviceCoordinatesDTO::new).toList();
    }
}
