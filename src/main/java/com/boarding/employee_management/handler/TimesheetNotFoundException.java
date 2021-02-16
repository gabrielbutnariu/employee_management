package com.boarding.employee_management.handler;

public class TimesheetNotFoundException extends RuntimeException {
    public TimesheetNotFoundException(Long id){
        super("Could not find timesheet for this employee: " + id);
    }
}
