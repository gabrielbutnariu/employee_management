package com.boarding.app.services;

import com.boarding.app.models.Employee;
import com.boarding.app.models.EmployeeDTO;

import java.util.List;

public interface IEmployeeService {

    List<EmployeeDTO> list();
    //List all employees from database

    Employee findById(Long id);
    //Locate employee with provided id or throw EmployeeNotFoundException

    List<EmployeeDTO> findByFirstName(String firstName);
    //List all employee with provided first name or return an empty list

    List<EmployeeDTO> findByLastName(String lastName);
    //List all employee with provided first name or return an empty list

    List<EmployeeDTO> findBySsn(String Ssn);
    //List all employee with provided first name or return an empty list

    EmployeeDTO addOrUpdateEmployee(Employee employee);
    //Insert a new employee or update an already existing one from database

    void deleteById(Long id);
    //Delete employee with provided id or return EmployeeNotFoundException


}
