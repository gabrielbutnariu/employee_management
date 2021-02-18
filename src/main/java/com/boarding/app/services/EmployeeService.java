package com.boarding.app.services;

import com.boarding.app.handler.EmployeeNotFoundException;
import com.boarding.app.models.Employee;
import com.boarding.app.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService implements IEmployeeService {

    EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public List<Employee> list(){
       return employeeRepository.findAll();
    }

    public Employee findById(Long id){
        return employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    public List<Employee> findByFirstName(String firstName){
        return employeeRepository.findAllByFirstName(firstName);
    }

    public List<Employee> findByLastName(String lastName){
        return employeeRepository.findAllByLastName(lastName);
    }

    public List<Employee> findBySsn(String Ssn){
        return employeeRepository.findAllBySsn(Ssn);
    }

    public Employee addOrUpdateEmployee(Employee employee){
        return employeeRepository.saveAndFlush(employee);
    }

    public void deleteById(Long id){
        employeeRepository.deleteById(id);
    }

}
