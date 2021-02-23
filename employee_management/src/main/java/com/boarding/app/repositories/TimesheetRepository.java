package com.boarding.app.repositories;

import com.boarding.app.models.Employee;
import com.boarding.app.models.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimesheetRepository extends JpaRepository<Timesheet,Long> {
    //custom queries
    List<Timesheet> findAllByEmployeeId(Long emp_id);
    Timesheet findByEmployeeIdAndCheckoutDateNull(Long id);
    //Timesheet findByEmployeeIdAndEmployeeIsNull(Long id);
    void deleteByEmployeeId(Long id);
}
