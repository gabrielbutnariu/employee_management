package com.boarding.app.controller;

import com.boarding.app.services.EmployeeService;
import com.boarding.app.models.Employee;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAllEmployees(){
        return employeeService.list();
    }

    @GetMapping("{id}")
    public Employee getEmployee(@PathVariable long id){
        return employeeService.findById(id);
    }

    @GetMapping("firstname/{firstName}") // TODO Employee not found return
    public List<Employee> getEmployeeByFirstName(@PathVariable String firstName){
        return employeeService.findByFirstName(firstName);
    }

    @GetMapping("lastname/{lastName}")
    public List<Employee> getEmployeeByLastName(@PathVariable String lastName){
        return employeeService.findByLastName(lastName);
    }

    @GetMapping("ssn/{ssn}")
    public List<Employee> getEmployeeBySsn(@PathVariable String ssn){
        return employeeService.findBySsn(ssn);
    }

    @PostMapping
    public void createEmployee(@RequestBody Employee employee) {
        employeeService.addOrUpdateEmployee(employee);
    }

    @DeleteMapping("{id}")
    public void deleteEmployee(@PathVariable long id){
        employeeService.findById(id);
        employeeService.deleteById(id);
    }

    @PutMapping("{id}")
    public Employee updateEmployee(@RequestBody Employee employee, @PathVariable Long id){
        Employee existingEmployee = employeeService.findById(id);
        BeanUtils.copyProperties(employee, existingEmployee, "id");
        return employeeService.addOrUpdateEmployee(existingEmployee);
    }

    /*@RequestMapping(value = "name/{firstName}", method = RequestMethod.GET)
    public List<Employee> getEmployeesByName(@PathVariable String firstName){
        return employeeRepository.findAllBySsn(firstName);
    }*/
}

