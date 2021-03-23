package com.boarding.app.models;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EmployeeEditDTO {
    private String firstName;
    private String lastName;
    private String address;
    private String ssn;
    private String UUID;

    public EmployeeEditDTO(Employee employee){
        firstName = employee.getFirstName();
        lastName = employee.getLastName();
        address = employee.getAddress();
        ssn = employee.getSsn();
        UUID = employee.getUUID();
    }
}
