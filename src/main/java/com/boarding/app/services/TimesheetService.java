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

    public List<TimesheetDTO> getByEmpId(@PathVariable Long emp_id){
        return timesheetRepository.findAllByEmployeeId(emp_id).stream().map(this::mapEntityToDTO).collect(Collectors.toList());
    }

    public Timesheet addCheckinDate(@RequestBody final Timesheet timesheet,@PathVariable Long emp_id){
        //Timesheet timesheetToUpdate = timesheetRepository.findByEmployeeIdAndEmployeeIsNull(emp_id);
        //if(timesheetToUpdate == null) throw new TimesheetNotFoundException(emp_id);
        timesheet.getEmployee().setId(emp_id);
        return timesheetRepository.saveAndFlush(timesheet);
    }

    public Timesheet addCheckoutDate(@PathVariable Long emp_id,@RequestBody Timesheet timesheet){
        Timesheet timesheetToUpdate = timesheetRepository.findByEmployeeIdAndCheckoutDateNull(emp_id);
        if(timesheetToUpdate == null) throw new TimesheetNotFoundException(emp_id);
        copyNonNullProperties(timesheetToUpdate,timesheet);
        return timesheetRepository.saveAndFlush(timesheetToUpdate);
    }

    public static void copyNonNullProperties(Object target,Object src) {
        BeanUtils.copyProperties(src, target, getNullPropertyNames(src));
    }

    public static String[] getNullPropertyNames (Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<String>();
        for(java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    public void deleteTimesheetByEmpId(@PathVariable Long emp_id){
        timesheetRepository.deleteByEmployeeId(emp_id);
    }

    public void deleteTimesheetById(@PathVariable Long id){
        timesheetRepository.deleteById(id);
    }


}
