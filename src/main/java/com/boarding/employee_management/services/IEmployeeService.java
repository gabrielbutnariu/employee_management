package com.boarding.employee_management.services;

import com.boarding.employee_management.models.Employee;

import java.util.List;

public interface IEmployeeService {

    List<Employee> list();
    //List all employees from database

    Employee findById(Long id);
    //Locate employee with provided id or throw EmployeeNotFoundException

    List<Employee> findByFirstName(String firstName);
    //List all employee with provided first name or return an empty list

    List<Employee> findByLastName(String lastName);
    //List all employee with provided first name or return an empty list

    List<Employee> findBySsn(String Ssn);
    //List all employee with provided first name or return an empty list

    Employee addOrUpdateEmployee(Employee employee);
    //Insert a new employee or update an already existing one from database

    void deleteById(Long id);
    //Delete employee with provided id or return EmployeeNotFoundException


}
