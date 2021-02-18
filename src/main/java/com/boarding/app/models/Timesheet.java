package com.boarding.app.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity(name="timesheet")
@Getter @Setter
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
}

