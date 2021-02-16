package com.boarding.employee_management.controller;

import com.boarding.employee_management.handler.TimesheetNotFoundException;
import com.boarding.employee_management.models.Timesheet;
import com.boarding.employee_management.repositories.TimesheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/timesheet")
public class TimesheetController {
    @Autowired
    private TimesheetRepository timesheetRepository;

    @GetMapping
    public List<Timesheet> list(){
        return timesheetRepository.findAll();
    }

    @GetMapping
    @RequestMapping("{id}")
    public Timesheet get(@PathVariable Long id){
        return timesheetRepository.findById(id).orElseThrow(() -> new TimesheetNotFoundException(id));
    }

    @PostMapping("{id}/checkin")
    @ResponseStatus(HttpStatus.CREATED)
    public Timesheet addCheckin_date(@RequestBody final Timesheet timesheet){
        return timesheetRepository.saveAndFlush(timesheet);
    }
    @PostMapping("{id}/checkout")
    @ResponseStatus(HttpStatus.CREATED)
    public Timesheet addCheckout_date(@RequestBody final Timesheet timesheet){
        return timesheetRepository.saveAndFlush(timesheet);
    }


}
