package com.example.quickhirebackend.dto;

import java.util.Date;

public class PaymentDTO {
    private Integer profid;
    private Double amount;
    private Date startdate;
    private Date enddate;
    private String status;

    @Override
    public String toString() {
        return "PaymentDTO{" +
                "profid=" + profid +
                ", amount=" + amount +
                ", startdate=" + startdate +
                ", enddate=" + enddate +
                ", status='" + status + '\'' +
                '}';
    }
// Constructor, getters, and setters

    public PaymentDTO() {
        // Default constructor
    }

    public Integer getProfId() {
        return profid;
    }

    public void setProfId(Integer profid) {
        this.profid = profid;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getStartDate() {
        return startdate;
    }

    public void setStartDate(Date startDate) {
        this.startdate = startDate;
    }

    public Date getEndDate() {
        return enddate;
    }

    public void setEndDate(Date endDate) {
        this.enddate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
