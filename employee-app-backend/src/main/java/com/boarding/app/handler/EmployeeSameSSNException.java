package com.boarding.app.handler;

public class EmployeeSameSSNException extends RuntimeException{
    public EmployeeSameSSNException(){
        super("This SSN already belongs to an existing employee. Please try again");
    }
}
