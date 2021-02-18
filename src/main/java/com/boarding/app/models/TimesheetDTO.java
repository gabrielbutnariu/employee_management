package com.boarding.app.models;


import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter @Setter
public class TimesheetDTO {
    private Date checkoutDate;
    private Date checkinDate;
    private EmployeeDTO employeeDTO;

}
