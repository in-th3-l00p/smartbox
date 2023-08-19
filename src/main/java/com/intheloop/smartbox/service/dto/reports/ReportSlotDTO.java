package com.intheloop.smartbox.service.dto.reports;

import com.intheloop.smartbox.domain.reports.ReportSlot;

public class ReportSlotDTO {
    private final Long id;
    private final String name;
    private final Double volume;

    public ReportSlotDTO(ReportSlot reportSlot) {
        this.id = reportSlot.getId();
        this.name = reportSlot.getSlotName();
        this.volume = reportSlot.getVolume();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getVolume() {
        return volume;
    }
}
