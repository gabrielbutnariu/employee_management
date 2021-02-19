package com.boarding.app.services;

import com.boarding.app.models.Timesheet;
import com.boarding.app.models.TimesheetDTO;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ITimesheetService {
    //list all the timesheet
    List<TimesheetDTO> list();
    //list all the timesheet for a specified employee
    List<TimesheetDTO> getByEmpId(@PathVariable Long emp_id);
    //adding one entry in timesheet table, can be use to add checking or checking and checkout
    Timesheet addCheckinDate(@RequestBody final Timesheet timesheet,@PathVariable Long emp_id);
    //modifying a specific entry in table by adding a checkout date
    Timesheet addCheckoutDate(@PathVariable Long emp_id,@RequestBody Timesheet timesheet);
    //deleting all entry for a specified employee
    void deleteTimesheetByEmpId(@PathVariable Long emp_id);
    //deleting just one entry for a specified employee
    void deleteTimesheetById(@PathVariable Long id);
}
