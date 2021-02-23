package com.boarding.app.models;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EmployeeDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String address;
}
