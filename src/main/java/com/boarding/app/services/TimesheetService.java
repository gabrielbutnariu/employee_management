package com.boarding.app.services;

import com.boarding.app.handler.TimesheetNotFoundException;
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

    @Autowired
    public TimesheetService(TimesheetRepository timesheetRepository) {
        this.timesheetRepository = timesheetRepository;
    }
    //TODO
//    private TimesheetDTO toTimesheetDTO(Timesheet timesheet){
//        TimesheetDTO timesheetDTO= new TimesheetDTO();
//        timesheetDTO.setEmployeeDTO(timesheet.getEmployee());
//        timesheetDTO.setCheckinDate(timesheet.getCheckinDate());
//        timesheetDTO.setCheckoutDate(timesheet.getCheckoutDate());
//        return timesheetDTO;
//    }
    public List<Timesheet> list() {
        return timesheetRepository.findAll();
    }

    public List<Timesheet> getByEmpId(@PathVariable Long emp_id){
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