package com.boarding.employee_management.models;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity(name="timesheet")
public class Timesheet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date checkinDate;
    private Date checkoutDate;
    @ManyToOne
    @JoinColumn(name="emp_id",referencedColumnName="id",nullable=false,unique=true)
    private Employee employee;
    public Timesheet() {
    }

    public Long getId() {
        return id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCheckinDate() {
        return checkinDate;
    }

    public void setCheckinDate(Date checkinDate) {
        this.checkinDate = checkinDate;
    }

    public Date getCheckoutDate() {
        return checkoutDate;
    }

    public void setCheckoutDate(Date checkoutDate) {
        this.checkoutDate = checkoutDate;
    }
}

