package com.boarding.employee_management.controller;

import com.boarding.employee_management.models.Employee;
import com.boarding.employee_management.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @GetMapping("/employees/{id}")
    public Employee getEmployee(@PathVariable long id){
        Optional<Employee> employee = employeeRepository.findById(id);

        if(employee.isEmpty()){
            //throw new EmployeeNotFoundException("Id: " + id); TODO
        }

        return employee.get();
    }


}
