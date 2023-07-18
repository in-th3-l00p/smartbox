package com.intheloop.smartbox.web.rest.vm;

public class TransactionVM {
    private String mtp;
    private Long pub;
    private Long cid;
    private Long sid;
    private Double vol;

    public TransactionVM() {
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

    public Long getCid() {
        return cid;
    }

    public void setCid(Long cid) {
        this.cid = cid;
    }

    public Long getSid() {
        return sid;
    }

    public void setSid(Long sid) {
        this.sid = sid;
    }

    public Double getVol() {
        return vol;
    }

    public void setVol(Double vol) {
        this.vol = vol;
    }
}
