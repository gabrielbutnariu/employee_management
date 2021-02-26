package com.boarding.app.services;

import com.boarding.app.models.Employee;
import com.boarding.app.models.EmployeeDTO;
import com.boarding.app.models.Timesheet;
import com.boarding.app.models.TimesheetDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class EntityToDTOService {

    public EmployeeDTO toEmployeeDTO(Employee employee){
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setFirstName(employee.getFirstName());
        employeeDTO.setLastName(employee.getLastName());
        employeeDTO.setAddress(employee.getAddress());
        employeeDTO.setUUID(employee.getUUID());
        return employeeDTO;
    }

    public TimesheetDTO toTimesheetDTO(Timesheet timesheet){
        TimesheetDTO timesheetDTO= new TimesheetDTO();
        timesheetDTO.setId(timesheet.getId());
        timesheetDTO.setCheckinDate(timesheet.getCheckinDate());
        timesheetDTO.setCheckoutDate(timesheet.getCheckoutDate());
        timesheetDTO.setEmployeeDTO(toEmployeeDTO(timesheet.getEmployee()));
        return timesheetDTO;
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
        emptyNames.add("id");
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }
}
