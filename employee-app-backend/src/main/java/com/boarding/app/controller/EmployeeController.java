package com.boarding.app.controller;

import com.boarding.app.models.EmployeeDTO;
import com.boarding.app.services.EmployeeService;
import com.boarding.app.models.Employee;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/asc")
    public List<EmployeeDTO> getAllEmployeesAsc(){
        return employeeService.listAsc();
    }

    @GetMapping("/desc")
    public List<EmployeeDTO> getAllEmployeesDesc(){
        return employeeService.listDesc();
    }

    @GetMapping("/filter/asc/{matchingPatttern}")
    public List<EmployeeDTO> getAllEmployeesByFilterAsc(@PathVariable String matchingPatttern){
        return employeeService.listFilterAsc(matchingPatttern);
    }

    @GetMapping("/filter/desc/{matchingPatttern}")
    public List<EmployeeDTO> getAllEmployeesByFilterDesc(@PathVariable String matchingPatttern){
        return employeeService.listFilterDesc(matchingPatttern);
    }

    @GetMapping("/uuid/{UUID}")
    public EmployeeDTO getEmployee(@PathVariable String UUID){
        return employeeService.mapEntityToDTO(employeeService.findByUUID(UUID));
    }

    @PostMapping
    public EmployeeDTO createEmployee(@RequestBody Employee employee) {
        UUID uuid = UUID.randomUUID();
        employee.setUUID(uuid.toString());
        return employeeService.addEmployee(employee);
    }

    @DeleteMapping("{UUID}")
    public void deleteEmployee(@PathVariable String UUID){
        employeeService.deleteByUUID(UUID);
    }

    @PutMapping("{UUID}")
    public EmployeeDTO updateEmployee(@RequestBody Employee employee, @PathVariable String UUID){
        Employee existingEmployee = employeeService.findByUUID(UUID);
        return employeeService.updateEmployee(existingEmployee, employee);
    }

    /*@RequestMapping(value = "name/{firstName}", method = RequestMethod.GET)
    public List<Employee> getEmployeesByName(@PathVariable String firstName){
        return employeeRepository.findAllBySsn(firstName);
    }*/
}

