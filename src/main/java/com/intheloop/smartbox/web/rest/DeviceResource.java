package com.intheloop.smartbox.web.rest;

import com.intheloop.smartbox.security.AuthoritiesConstants;
import com.intheloop.smartbox.service.DeviceService;
import com.intheloop.smartbox.service.dto.DeviceDTO;
import com.intheloop.smartbox.web.rest.errors.DeviceNameAlreadyUsedException;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

// devices' admin controller
@RestController
@RequestMapping("/api/admin/device")
public class DeviceResource {
    private final DeviceService deviceService;

    public DeviceResource(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    /**
     * {@code POST /api/admin/device} : Create a new device
     * @param deviceDTO : device DTO
     * @return status {@code 200} and body {@link DeviceDTO}
     * @throws DeviceNameAlreadyUsedException if the given name is already used, with status {@code 500 (BAD REQUEST)}
     */
    @PostMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<?> createDevice(@RequestBody DeviceDTO deviceDTO) {
        var device = deviceService.create(
            deviceDTO.getName(),
            deviceDTO.getLocation()
        );
        return ResponseEntity.ok(new DeviceDTO(device));
    }

    /**
     * {@code GET /api/admin/device/all} : Gets all the devices
     *
     * @param pageable the pagination information.
     * @return with status {@code 200 (OK)} and body of {@link java.util.List<DeviceDTO>}
     */
    @GetMapping(
        path = "/all",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> getAllDevices(@ParameterObject Pageable pageable) {
        return ResponseEntity.ok(deviceService
            .getDevices(pageable)
            .stream()
            .map(DeviceDTO::new)
            .toList());
    }

    /**
     * {@code DELETE /api/admin/{deviceId}} : deletes a device
     * @param deviceId : device's id
     */
    @DeleteMapping(path = "/{deviceId}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public void removeDevice(@PathVariable Long deviceId) {
        deviceService.delete(deviceId);
    }

    /**
     * {@code PUT /api/admin/{deviceId}} : updates a device
     * @param deviceId : device's id
     * @param deviceDTO : device DTO
     */
    @PutMapping(
        path = "/{deviceId}",
        consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public void updateDevice(
        @PathVariable Long deviceId,
        @RequestBody DeviceDTO deviceDTO
    ) {
        deviceService.update(
            deviceId,
            deviceDTO.getName(),
            deviceDTO.getLocation()
        );
    }
}
