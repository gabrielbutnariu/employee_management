package com.boarding.app.handler;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException() {
        super("Could not find requested employee.");
    }
}
