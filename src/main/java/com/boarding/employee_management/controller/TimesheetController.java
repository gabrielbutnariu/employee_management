package com.boarding.employee_management.controller;

import com.boarding.employee_management.handler.TimesheetNotFoundException;
import com.boarding.employee_management.models.Timesheet;
import com.boarding.employee_management.repositories.TimesheetRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    @RequestMapping("{emp_id}")
    public List<Timesheet> getByEmp_id(@PathVariable Long emp_id){
        return timesheetRepository.findAllByEmployeeId(emp_id);
    }

    @PostMapping("{emp_id}/checkin")
    @ResponseStatus(HttpStatus.CREATED)
    public Timesheet addCheckin_date(@RequestBody final Timesheet timesheet){
        return timesheetRepository.saveAndFlush(timesheet);
    }
    @RequestMapping(value = "{emp_id}/checkout",method = RequestMethod.PUT)
    public Timesheet addCheckout_date(@PathVariable Long emp_id,@RequestBody Timesheet timesheet){
        Timesheet timesheetToUpdate = timesheetRepository.findByEmployeeIdAndCheckoutDateNull(emp_id);
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
    //deleting all the entry for a specific employee
    @Transactional
    @RequestMapping(value = "{emp_id}/all",method = RequestMethod.DELETE)
    public void deleteTimesheetByEmpId(@PathVariable Long emp_id){
        timesheetRepository.deleteByEmployeeId(emp_id);
    }

    //deleting one entry for a employee
    @RequestMapping(value = "{id}",method = RequestMethod.DELETE)
    public void deleteTimesheetById(@PathVariable Long id){
        timesheetRepository.deleteById(id);
    }

}
