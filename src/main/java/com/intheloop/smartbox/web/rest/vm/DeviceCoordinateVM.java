package com.intheloop.smartbox.web.rest.vm;

public class DeviceCoordinateVM {
    private Long pub;
    private Double latitude;
    private Double longitude;

    public DeviceCoordinateVM() {
    }

    public Long getPub() {
        return pub;
    }

    public void setPub(Long pub) {
        this.pub = pub;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
