package com.boarding.app.services;

import com.boarding.app.models.Timesheet;
import com.boarding.app.models.TimesheetDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ITimesheetService {

    Page<TimesheetDTO> list(Pageable pageable);
    //List all timesheet
    Page<TimesheetDTO> getByEmpUUID(@PathVariable String UUID, Pageable pageable);
    //List all timesheet for a specified employee
    Timesheet addCheckinDate(@RequestBody final Timesheet timesheet,@PathVariable String UUID);
    //Add a checkin date for a specified employee in timesheet (checkouts can be null or not)
    Timesheet addCheckoutDate(@PathVariable String UUID,@RequestBody Timesheet timesheet);
    //Add a checkout date for a specified employee in timesheet where checkin date is null
    void deleteTimesheetByEmpUUID(@PathVariable String UUID);
    //Delete all entries for a specified Employee
    void deleteTimesheetById(@PathVariable Long id);
    //Delete a single timesheet entry by specifying its id in the table
}
