package com.boarding.app.handler;

public class TimesheetNotFoundException extends RuntimeException {
    public TimesheetNotFoundException(){
        super("Timesheet entry not found");
    }
}
