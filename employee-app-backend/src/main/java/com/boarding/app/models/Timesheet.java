package com.boarding.app.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity(name="timesheet")
@Getter @Setter
public class Timesheet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Timestamp checkinDate;
    private Timestamp checkoutDate;
    @ManyToOne
    @JoinColumn(name="emp_id",referencedColumnName="id",nullable=false,unique=true)
    private Employee employee;
    public Timesheet() {
    }

}

