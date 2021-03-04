package com.boarding.app.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class EmployeeSameSSNAdvice {

    @ResponseBody
    @ExceptionHandler(EmployeeSameSSNException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String employeeNotFoundHandler(EmployeeSameSSNException e){
        return e.getMessage();
    }
}
