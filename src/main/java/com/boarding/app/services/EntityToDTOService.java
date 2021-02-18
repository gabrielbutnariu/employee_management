package com.boarding.app.services;

import com.boarding.app.models.Employee;
import com.boarding.app.models.EmployeeDTO;
import com.boarding.app.models.Timesheet;
import com.boarding.app.models.TimesheetDTO;
import org.springframework.stereotype.Service;

@Service
public class EntityToDTOService {

    public EmployeeDTO toEmployeeDTO(Employee employee){
        EmployeeDTO employeeDTO = new EmployeeDTO();
        employeeDTO.setId(employee.getId());
        employeeDTO.setFirstName(employee.getFirstName());
        employeeDTO.setLastName(employee.getLastName());
        employeeDTO.setAddress(employee.getAddress());
        return employeeDTO;
    }
    public TimesheetDTO toTimesheetDTO(Timesheet timesheet){
        TimesheetDTO timesheetDTO= new TimesheetDTO();
        timesheetDTO.setId(timesheet.getId());
        timesheetDTO.setCheckinDate(timesheet.getCheckinDate());
        timesheetDTO.setCheckoutDate(timesheet.getCheckoutDate());
        timesheetDTO.setEmployeeDTO(toEmployeeDTO(timesheet.getEmployee()));
        timesheetDTO.setWorkType(timesheet.getWorkType());
        return timesheetDTO;
    }
}
