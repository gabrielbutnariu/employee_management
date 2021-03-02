package com.boarding.app.models;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EmployeeDTO {
    private String firstName;
    private String lastName;
    private String address;
    private String UUID;

    public EmployeeDTO(Employee employee){
        firstName = employee.getFirstName();
        lastName = employee.getLastName();
        address = employee.getAddress();
        UUID = employee.getUUID();
    }
}
