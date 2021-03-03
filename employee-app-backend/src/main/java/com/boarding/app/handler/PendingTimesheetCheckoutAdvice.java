package com.boarding.app.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice

public class PendingTimesheetCheckoutAdvice {

    @ResponseBody
    @ExceptionHandler(PendingTimesheetCheckoutException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String timesheetNotFoundHandler(PendingTimesheetCheckoutException ex) {
        return ex.getMessage();
    }
}
