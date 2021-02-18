package com.boarding.app.controller;

import com.boarding.app.handler.EmployeeNotFoundException;
import com.boarding.app.models.Employee;
import com.boarding.app.repositories.EmployeeRepository;
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

    @GetMapping("firstname/{first}") // TODO Employee not found return
    public List<Employee> getEmployeeByFirstName(@PathVariable String first){
        return employeeRepository.findAllByFirstName(first);
    }

    @GetMapping("lastname/{last}")
    public List<Employee> getEmployeeByLastName(@PathVariable String last){
        return employeeRepository.findAllByLastName(last);
    }

    @GetMapping("ssn/{ssn}")
    public List<Employee> getEmployeeBySsn(@PathVariable String ssn){
        return employeeRepository.findAllBySsn(ssn);
    }

    @PostMapping
    public void createEmployee(@RequestBody Employee employee) {
        employeeRepository.saveAndFlush(employee);
    }

    @DeleteMapping("{id}")
    public void deleteEmployee(@PathVariable long id){
        employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
        employeeRepository.deleteById(id);
    }

    @PutMapping("{id}")
    public Employee updateEmployee(@RequestBody Employee employee, @PathVariable Long id){
        employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
        Employee existingEmployee = employeeRepository.getOne(id);
        BeanUtils.copyProperties(employee, existingEmployee, "id");
        return employeeRepository.saveAndFlush(existingEmployee);
    }

    /*@RequestMapping(value = "name/{firstName}", method = RequestMethod.GET)
    public List<Employee> getEmployeesByName(@PathVariable String firstName){
        return employeeRepository.findAllBySsn(firstName);
    }*/
}

