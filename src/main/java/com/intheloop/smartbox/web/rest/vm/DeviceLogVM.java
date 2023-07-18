package com.intheloop.smartbox.web.rest.vm;

public class DeviceLogVM {
    private String mtp;
    private Long pub;
    private String log;

    public DeviceLogVM() {
    }

    public String getMtp() {
        return mtp;
    }

    public void setMtp(String mtp) {
        this.mtp = mtp;
    }

    public Long getPub() {
        return pub;
    }

    public void setPub(Long pub) {
        this.pub = pub;
    }

    public String getLog() {
        return log;
    }

    public void setLog(String log) {
        this.log = log;
    }
}
