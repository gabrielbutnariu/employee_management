package com.boarding.app.services;

import com.boarding.app.models.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class EntityToDTOService {

    public EmployeeDTO toEmployeeDTO(Employee employee){
        return new EmployeeDTO(employee);
    }
    public EmployeeEditDTO toEmployeeEditDTO(Employee employee) {return new EmployeeEditDTO(employee);}
    public TimesheetDTO toTimesheetDTO(Timesheet timesheet){
        return new TimesheetDTO(timesheet);
    }


    public static void copyNonNullProperties(Object target,Object src) {
        BeanUtils.copyProperties(src, target, getNullPropertyNames(src));
    }

    public static String[] getNullPropertyNames (Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for(java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        emptyNames.add("id");
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }
}
