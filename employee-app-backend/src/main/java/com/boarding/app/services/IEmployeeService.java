package com.boarding.app.services;

import com.boarding.app.models.Employee;
import com.boarding.app.models.EmployeeDTO;

import java.util.List;

public interface IEmployeeService {

    List<EmployeeDTO> listAsc();
    //List all employees from database ordered by last name alphabetically
    List<EmployeeDTO> listDesc();
    //List all employees from database reverse ordered by last name alphabetically
    List<EmployeeDTO> listFilterAsc(String matchingPattern);
    //List all employees from database that match a filter ordered by last name alphabetically
    List<EmployeeDTO> listFilterDesc(String matchingPattern);
    //List all employees from database that match a filter reverse ordered by last name alphabetically
    Employee findByUUID(String UUID);
    //Locate employee with provided UUID or throw EmployeeNotFoundException
    EmployeeDTO addEmployee(Employee employee);
    //Insert a new employee into database
    EmployeeDTO updateEmployee(Employee employeeEmployee ,Employee employee);
    //Update an employee from database
    void deleteByUUID(String UUID);
    //Delete employee with provided UUID or return EmployeeNotFoundException


}
