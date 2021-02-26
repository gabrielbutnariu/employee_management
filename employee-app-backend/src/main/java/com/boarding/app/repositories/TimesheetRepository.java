package com.boarding.app.repositories;

import com.boarding.app.models.Employee;
import com.boarding.app.models.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimesheetRepository extends JpaRepository<Timesheet,Long> {
    //custom queries
    List<Timesheet> findAllByEmployeeUUID(String UUID);
    Timesheet findByEmployeeUUIDAndCheckoutDateNull(String UUID);
    void deleteByEmployeeUUID(String UUID);
}
