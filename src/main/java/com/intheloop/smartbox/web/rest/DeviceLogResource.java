package com.intheloop.smartbox.web.rest;

import com.intheloop.smartbox.security.AuthoritiesConstants;
import com.intheloop.smartbox.service.DeviceLogService;
import com.intheloop.smartbox.service.dto.DeviceLogDTO;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/deviceLog")
public class DeviceLogResource {
    private final DeviceLogService deviceLogService;

    public DeviceLogResource(DeviceLogService deviceLogService) {
        this.deviceLogService = deviceLogService;
    }

    /**
     * {@code GET /api/admin/deviceLog} : Get all device logs
     * @param pageable : pagination information
     * @return with status {@code 200 (OK)} and body of {@link java.util.List<DeviceLogDTO>}
     */
    @GetMapping("/all")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<?> getAll(
        @PageableDefault(
            size = 100,
            sort = "createdDate",
            direction = Sort.Direction.DESC
        )
        @ParameterObject
        Pageable pageable
    ) {
        return ResponseEntity.ok(deviceLogService
            .getAll(pageable)
            .stream()
            .map(DeviceLogDTO::new)
            .toList());
    }
}
