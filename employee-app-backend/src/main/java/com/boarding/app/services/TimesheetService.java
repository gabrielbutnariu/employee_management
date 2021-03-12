package com.boarding.app.services;

import com.boarding.app.handler.EmployeeNotFoundException;
import com.boarding.app.handler.PendingTimesheetCheckoutException;
import com.boarding.app.handler.TimesheetNotFoundException;
import com.boarding.app.models.Employee;
import com.boarding.app.models.EmployeeDTO;
import com.boarding.app.models.Timesheet;
import com.boarding.app.models.TimesheetDTO;
import com.boarding.app.repositories.EmployeeRepository;
import com.boarding.app.repositories.TimesheetRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service("timesheetService")
public class TimesheetService implements ITimesheetService{

    private final TimesheetRepository timesheetRepository;
    private final EmployeeRepository employeeRepository;
    private final EntityToDTOService entityToDTOService;

    private final String foo = "foo";

    public String getFoo(){
        return  "foo";
    }

    @Autowired
    public TimesheetService(TimesheetRepository timesheetRepository, EmployeeRepository employeeRepository, EntityToDTOService entityToDTOService) {
        this.timesheetRepository = timesheetRepository;
        this.employeeRepository = employeeRepository;
        this.entityToDTOService = entityToDTOService;
    }
    public TimesheetDTO mapEntityToDTO(Timesheet timesheet){
        return entityToDTOService.toTimesheetDTO(timesheet);
    }

    public Page<TimesheetDTO> list(Pageable pageable) {
        return timesheetRepository.findAll(pageable).map(TimesheetDTO::new);
    }

    public Page<TimesheetDTO> getByEmpUUID(@PathVariable String UUID, Pageable pageable){
        return timesheetRepository.findAllByEmployeeUUID(UUID, pageable).map(TimesheetDTO::new);
    }

    public List<TimesheetDTO> getBetweenTimestamps(Timestamp todayTimestamp, Timestamp tomorrowTimestamp){
        return timesheetRepository.findAllByCheckinDateBetween(todayTimestamp, tomorrowTimestamp).stream().map(this::mapEntityToDTO).collect(Collectors.toList());
    }

    public Timesheet addCheckinDate(@RequestBody final Timesheet timesheet,@PathVariable String UUID){
        Employee savedEmployee = employeeRepository.findByUUID(UUID);
        if(savedEmployee != null){
            Timesheet savedTimesheet = timesheetRepository.findByEmployeeUUIDAndCheckoutDateNull(UUID);
            if(savedTimesheet == null){
                timesheet.setEmployee(savedEmployee);
                return timesheetRepository.saveAndFlush(timesheet);
            }
            else throw new PendingTimesheetCheckoutException();
        }
        else throw new EmployeeNotFoundException();
    }

    public Timesheet addCheckoutDate(@PathVariable String UUID,@RequestBody Timesheet timesheet){
        Timesheet timesheetToUpdate = timesheetRepository.findByEmployeeUUIDAndCheckoutDateNull(UUID);
        if(timesheetToUpdate != null){
            EntityToDTOService.copyNonNullProperties(timesheetToUpdate,timesheet);
            return timesheetRepository.saveAndFlush(timesheetToUpdate);
        }else throw new TimesheetNotFoundException();
    }

    public void deleteTimesheetByEmpUUID(@PathVariable String UUID){
        timesheetRepository.deleteByEmployeeUUID(UUID);
    }

    public void deleteTimesheetById(@PathVariable Long id){
        Optional<Timesheet> savedTimesheet = timesheetRepository.findById(id);
        if(savedTimesheet.isPresent()){
            timesheetRepository.deleteById(id);
        }
        else throw new TimesheetNotFoundException();
    }


}
