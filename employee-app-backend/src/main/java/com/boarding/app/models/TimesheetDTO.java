package com.boarding.app.models;


import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter @Setter
public class TimesheetDTO {
    private long id;
    private Timestamp checkinDate;
    private Timestamp checkoutDate;
    private EmployeeDTO employeeDTO;

    public TimesheetDTO(Timesheet timesheet){
        id = timesheet.getId();
        checkinDate = timesheet.getCheckinDate();
        checkoutDate = timesheet.getCheckoutDate();
        employeeDTO = new EmployeeDTO(timesheet.getEmployee());
    }
}
