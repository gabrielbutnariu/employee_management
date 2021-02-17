package com.boarding.employee_management.services;

import com.boarding.employee_management.handler.TimesheetNotFoundException;
import com.boarding.employee_management.models.Timesheet;
import com.boarding.employee_management.repositories.TimesheetRepository;
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

@Service
public class TimesheetService {

    private TimesheetRepository timesheetRepository;

    @Autowired
    public TimesheetService(TimesheetRepository timesheetRepository) {
        this.timesheetRepository = timesheetRepository;
    }

    public List<Timesheet> list() {
        return timesheetRepository.findAll();
    }

    public List<Timesheet> getByEmp_id(@PathVariable Long emp_id){
        return timesheetRepository.findAllByEmployeeId(emp_id);
    }

    public Timesheet addCheckinDate(@RequestBody final Timesheet timesheet){
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
