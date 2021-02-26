package com.boarding.app.handler;

public class TimesheetNotFoundException extends RuntimeException {
    public TimesheetNotFoundException(){
        super("Could not find timesheet for the requested employee.");
    }
}
