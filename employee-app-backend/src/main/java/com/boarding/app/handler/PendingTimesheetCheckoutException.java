package com.boarding.app.handler;

public class PendingTimesheetCheckoutException extends RuntimeException {
    public PendingTimesheetCheckoutException(){
        super("This employee has a pending checkout. Please checkout before proceeding with another checkin.");
    }
}
