package com.boarding.app.services;

import com.boarding.app.handler.EmployeeNotFoundException;
import com.boarding.app.handler.EmployeeSameSSNException;
import com.boarding.app.models.Employee;
import com.boarding.app.models.EmployeeDTO;
import com.boarding.app.models.EmployeeEditDTO;
import com.boarding.app.repositories.EmployeeRepository;
import com.boarding.app.repositories.TimesheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService implements IEmployeeService {

    EmployeeRepository employeeRepository;
    TimesheetService timesheetService;
    EntityToDTOService entityToDTOService;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository,EntityToDTOService entityToDTOService, TimesheetService timesheetService) {
        this.employeeRepository = employeeRepository;
        this.timesheetService = timesheetService;
        this.entityToDTOService = entityToDTOService;
    }

    public EmployeeDTO mapEntityToDTO(Employee employee){
        return entityToDTOService.toEmployeeDTO(employee);
    }

    public EmployeeEditDTO mapEntityToEmployeeEditDTO(Employee employee){
        return entityToDTOService.toEmployeeEditDTO(employee);
    }

    public Page<EmployeeDTO> employeesPageable(Pageable pageable) {
        return employeeRepository.findAll(pageable).map(EmployeeDTO::new);

    }

    public Page<EmployeeDTO> employeesPageableFilter(String filter, Pageable pageable) {
        return employeeRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(filter,filter,pageable).map(EmployeeDTO::new);
    }

    public List<EmployeeDTO> listAsc(){
       return employeeRepository.findAllByOrderByLastNameAsc().stream().map(this::mapEntityToDTO).collect(Collectors.toList());
    }

    public List<EmployeeDTO> listDesc(){
        return employeeRepository.findAllByOrderByLastNameDesc().stream().map(this::mapEntityToDTO).collect(Collectors.toList());
    }


    public Employee findByUUID(String UUID){
        Employee employee = employeeRepository.findByUUID(UUID);
        if(employee == null){
            throw new EmployeeNotFoundException();
        }
        else return employee;
    }

    public EmployeeDTO addEmployee(Employee employee){
        Employee savedEmployee = employeeRepository.findBySsn(employee.getSsn());
        if (savedEmployee == null) {
            savedEmployee = employeeRepository.saveAndFlush(employee);
            return mapEntityToDTO(savedEmployee);
        } else {
            throw new EmployeeSameSSNException();
        }
    }

    public EmployeeDTO updateEmployee(Employee existingEmployee, Employee employee){
        EntityToDTOService.copyNonNullProperties(existingEmployee,employee);
        employeeRepository.saveAndFlush(existingEmployee);
        return mapEntityToDTO(existingEmployee);
    }

    public void deleteByUUID(String UUID){
        Employee employee = employeeRepository.findByUUID(UUID);
        if(employee == null){
            throw new EmployeeNotFoundException();
        }
        else {
            timesheetService.deleteTimesheetByEmpUUID(UUID);
            employeeRepository.deleteByUUID(UUID);
        }
    }

}
