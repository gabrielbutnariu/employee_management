package com.boarding.employee_management.controller;

import com.boarding.employee_management.handler.EmployeeNotFoundException;
import com.boarding.employee_management.models.Employee;
import com.boarding.employee_management.repositories.EmployeeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    @GetMapping("{id}")
    public Employee getEmployee(@PathVariable long id){
       return employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    @PostMapping
    public void createEmployee(@RequestBody Employee employee) {
        employeeRepository.saveAndFlush(employee);
    }

    @DeleteMapping("{id}")
    public void deleteEmployee(@PathVariable long id){
        employeeRepository.deleteById(id);
    }

    @PutMapping("{id}")
    public Employee updateEmployee(@RequestBody Employee employee, @PathVariable Long id){
        Employee existingEmployee = employeeRepository.getOne(id);
        BeanUtils.copyProperties(employee, existingEmployee, "id");
        return employeeRepository.saveAndFlush(existingEmployee);
    }

}
