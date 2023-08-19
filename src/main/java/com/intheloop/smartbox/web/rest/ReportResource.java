package com.intheloop.smartbox.web.rest;

import com.intheloop.smartbox.service.DeviceService;
import com.intheloop.smartbox.service.ReportService;
import com.intheloop.smartbox.service.UserService;
import com.intheloop.smartbox.service.dto.reports.DeviceReportDTO;
import com.intheloop.smartbox.service.dto.reports.ReportDisplayDTO;
import com.intheloop.smartbox.service.dto.reports.UserDeviceReportDTO;
import com.intheloop.smartbox.service.dto.reports.UserReportDTO;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/report")
public class ReportResource {
    private final UserService userService;
    private final DeviceService deviceService;
    private final ReportService reportService;

    public ReportResource(UserService userService, DeviceService deviceService, ReportService reportService) {
        this.userService = userService;
        this.deviceService = deviceService;
        this.reportService = reportService;
    }

    @PostMapping("/user/{userId}")
    public void generateUserReport(@PathVariable Long userId) {
        reportService.createUserReport(userService.get(userId));
    }

    @GetMapping(
        path = "/user/all",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<ReportDisplayDTO> getUserReports() {
        return reportService
            .getUserReports()
            .stream()
            .map(ReportDisplayDTO::new)
            .toList();
    }

    @GetMapping(
        path = "/user/{reportId}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public UserReportDTO getUserReport(@PathVariable Long reportId) {
        return new UserReportDTO(reportService.getUserReport(reportId));
    }

    @PostMapping("/device/{deviceId}")
    public void generateDeviceReport(@PathVariable Long deviceId) {
        reportService.createDeviceReport(deviceService.get(deviceId));
    }

    @GetMapping(
        path = "/device/all",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<ReportDisplayDTO> getDeviceReports() {
        return reportService
            .getDeviceReports()
            .stream()
            .map(ReportDisplayDTO::new)
            .toList();
    }

    @GetMapping(
        path = "/device/{reportId}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public DeviceReportDTO getDeviceReport(@PathVariable Long reportId) {
        return new DeviceReportDTO(
            reportService.getDeviceReport(reportId)
        );
    }

    @PostMapping("/userDevice/{deviceId}")
    public void generateUserDeviceReport(
        @PathVariable Long deviceId
    ) {
        reportService.createUserDeviceReport(deviceService.get(deviceId));
    }

    @GetMapping(
        path = "/userDevice/all",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<ReportDisplayDTO> getUserDeviceReports() {
        return reportService
            .getUserDeviceReports()
            .stream()
            .map(ReportDisplayDTO::new)
            .toList();
    }

    @GetMapping(
        path = "/userDevice/{reportId}",
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public UserDeviceReportDTO getUserDeviceReport(@PathVariable Long reportId) {
        return new UserDeviceReportDTO(
            reportService.getUserDeviceReport(reportId)
        );
    }
}
