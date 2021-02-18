package com.boarding.app.services;

import com.boarding.app.handler.EmployeeNotFoundException;
import com.boarding.app.models.Employee;
import com.boarding.app.models.EmployeeDTO;
import com.boarding.app.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService implements IEmployeeService {

    EmployeeRepository employeeRepository;
    EntityToDTOService entityToDTOService;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository,EntityToDTOService entityToDTOService) {
        this.employeeRepository = employeeRepository;
        this.entityToDTOService = entityToDTOService;
    }

    public EmployeeDTO mapEntityToDTO(Employee employee){
        return entityToDTOService.toEmployeeDTO(employee);
    }

    public List<EmployeeDTO> list(){
       return employeeRepository.findAll().stream().map(this::mapEntityToDTO).collect(Collectors.toList());
    }

    public Employee findById(Long id){
        return employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    public List<EmployeeDTO> findByFirstName(String firstName){
        return employeeRepository.findAllByFirstName(firstName).stream().map(this::mapEntityToDTO).collect(Collectors.toList());
    }

    public List<EmployeeDTO> findByLastName(String lastName){
        return employeeRepository.findAllByLastName(lastName).stream().map(this::mapEntityToDTO).collect(Collectors.toList());
    }

    public List<EmployeeDTO> findBySsn(String Ssn){
        return employeeRepository.findAllBySsn(Ssn).stream().map(this::mapEntityToDTO).collect(Collectors.toList());
    }

    public EmployeeDTO addOrUpdateEmployee(Employee employee){
        Employee savedEmployee = employeeRepository.saveAndFlush(employee);
        return mapEntityToDTO(savedEmployee);
    }

    public void deleteById(Long id){
        employeeRepository.deleteById(id);
    }

}
