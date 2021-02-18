package com.boarding.app.models;


import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter @Setter
public class TimesheetDTO {
    private Long id;
    private Date checkinDate;
    private Date checkoutDate;
    private EmployeeDTO employeeDTO;
}
