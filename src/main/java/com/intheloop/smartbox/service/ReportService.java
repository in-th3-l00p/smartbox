package com.intheloop.smartbox.service;

import com.intheloop.smartbox.domain.Device;
import com.intheloop.smartbox.domain.User;
import com.intheloop.smartbox.domain.reports.*;
import com.intheloop.smartbox.repository.*;
import com.intheloop.smartbox.web.rest.errors.CardNotFound;
import com.intheloop.smartbox.web.rest.errors.ReportNotFoundException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {
    private final UserReportRepository userReportRepository;
    private final DeviceReportRepository deviceReportRepository;
    private final UserDeviceReportRepository userDeviceReportRepository;
    private final ReportSlotRepository reportSlotRepository;
    private final ReportUserRepository reportUserRepository;
    private final CardRepository cardRepository;

    public ReportService(
        UserReportRepository userReportRepository,
        DeviceReportRepository deviceReportRepository,
        UserDeviceReportRepository userDeviceReportRepository,
        ReportSlotRepository reportSlotRepository,
        ReportUserRepository reportUserRepository, CardRepository cardRepository) {
        this.userReportRepository = userReportRepository;
        this.deviceReportRepository = deviceReportRepository;
        this.userDeviceReportRepository = userDeviceReportRepository;
        this.reportSlotRepository = reportSlotRepository;
        this.reportUserRepository = reportUserRepository;
        this.cardRepository = cardRepository;
    }

    public void createUserReport(User user) {
        if (user.getCard() == null)
            throw new CardNotFound();
        var report = new UserReport();
        report.setUserId(user.getId());
        report.setUsername(user.getLogin());
        report.setUserFirstName(user.getFirstName());
        report.setUserLastName(user.getLastName());
        report.setUserAddress(user.getAddress());
        report.setUserEmail(user.getEmail());
        report.setCardId(user.getCard().getId());
        report.setDeviceId(user.getCard().getDevice().getId());
        var finalReport = userReportRepository.save(report);
        user.getCard().getCardSlots().forEach(cardSlot -> {
            var reportCardSlot = new ReportSlot();
            reportCardSlot.setSlotName(cardSlot.getSlot().getName());
            reportCardSlot.setVolume(cardSlot.getSlot().getVolume());
            reportCardSlot.setUserReport(finalReport);
            reportSlotRepository.save(reportCardSlot);
        });
    }

    public void createDeviceReport(Device device) {
        var report = new DeviceReport();
        report.setDeviceId(device.getId());
        report.setDeviceName(device.getName());
        report.setDeviceLocation(device.getLocation());
        var finalReport = deviceReportRepository.save(report);
        device.getSlots().forEach(slot -> {
            var reportSlot = new ReportSlot();
            reportSlot.setSlotName(slot.getName());
            reportSlot.setVolume(slot.getVolume());
            reportSlot.setDeviceReport(finalReport);
            reportSlotRepository.save(reportSlot);
        });
    }

    public void createUserDeviceReport(Device device) {
        var report = new UserDeviceReport();
        report.setDeviceId(device.getId());
        report.setDeviceName(device.getName());
        report.setDeviceLocation(device.getLocation());
        var finalReport = userDeviceReportRepository.save(report);
        cardRepository
            .findAllByDevice(device)
            .forEach(card -> {
                var user = new ReportUser(card.getUser(), finalReport);
                finalReport.getUsers().add(reportUserRepository.save(user));
            });
        userDeviceReportRepository.save(report);
    }

    public List<UserReport> getUserReports() {
        return (List<UserReport>) userReportRepository.findAll(
            Sort.by("createdBy").descending()
        );
    }

    public List<DeviceReport> getDeviceReports() {
        return (List<DeviceReport>) deviceReportRepository.findAll(
            Sort.by("createdBy").descending()
        );
    }

    public List<UserDeviceReport> getUserDeviceReports() {
        return (List<UserDeviceReport>) userDeviceReportRepository.findAll(
            Sort.by("createdBy").descending()
        );
    }

    public UserReport getUserReport(Long id) {
        return userReportRepository
            .findById(id)
            .orElseThrow(ReportNotFoundException::new);
    }

    public DeviceReport getDeviceReport(Long id) {
        return deviceReportRepository
            .findById(id)
            .orElseThrow(ReportNotFoundException::new);
    }

    public UserDeviceReport getUserDeviceReport(Long id) {
        return userDeviceReportRepository
            .findById(id)
            .orElseThrow(ReportNotFoundException::new);
    }
}
