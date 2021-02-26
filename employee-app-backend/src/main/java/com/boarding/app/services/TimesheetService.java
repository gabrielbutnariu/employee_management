package com.boarding.app.services;

import com.boarding.app.handler.TimesheetNotFoundException;
import com.boarding.app.models.Employee;
import com.boarding.app.models.EmployeeDTO;
import com.boarding.app.models.Timesheet;
import com.boarding.app.models.TimesheetDTO;
import com.boarding.app.repositories.TimesheetRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TimesheetService implements ITimesheetService{

    private TimesheetRepository timesheetRepository;
    private EntityToDTOService entityToDTOService;

    @Autowired
    public TimesheetService(TimesheetRepository timesheetRepository, EntityToDTOService entityToDTOService) {
        this.timesheetRepository = timesheetRepository;
        this.entityToDTOService = entityToDTOService;
    }
    public TimesheetDTO mapEntityToDTO(Timesheet timesheet){
        return entityToDTOService.toTimesheetDTO(timesheet);
    }
    public List<TimesheetDTO> list() {
        return timesheetRepository.findAll().stream().map(this::mapEntityToDTO).collect(Collectors.toList());
    }

    public List<TimesheetDTO> getByEmpUUID(@PathVariable String UUID){
        return timesheetRepository.findAllByEmployeeUUID(UUID).stream().map(this::mapEntityToDTO).collect(Collectors.toList());
    }

    public Timesheet addCheckinDate(@RequestBody final Timesheet timesheet,@PathVariable String UUID){
        //Timesheet timesheetToUpdate = timesheetRepository.findByEmployeeIdAndEmployeeIsNull(emp_id);
        //if(timesheetToUpdate == null) throw new TimesheetNotFoundException(emp_id);
        timesheet.getEmployee().setUUID(UUID);
        return timesheetRepository.saveAndFlush(timesheet);
    }

    public Timesheet addCheckoutDate(@PathVariable String UUID,@RequestBody Timesheet timesheet){
        Timesheet timesheetToUpdate = timesheetRepository.findByEmployeeUUIDAndCheckoutDateNull(UUID);
        if(timesheetToUpdate == null) throw new TimesheetNotFoundException();
        entityToDTOService.copyNonNullProperties(timesheetToUpdate,timesheet);
        return timesheetRepository.saveAndFlush(timesheetToUpdate);
    }


    public void deleteTimesheetByEmpUUID(@PathVariable String UUID){
        timesheetRepository.deleteByEmployeeUUID(UUID);
    }

    public void deleteTimesheetById(@PathVariable Long id){
        timesheetRepository.deleteById(id);
    }


}
