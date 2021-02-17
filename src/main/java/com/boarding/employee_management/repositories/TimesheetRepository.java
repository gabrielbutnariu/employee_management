package com.boarding.employee_management.repositories;

import com.boarding.employee_management.models.Employee;
import com.boarding.employee_management.models.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimesheetRepository extends JpaRepository<Timesheet,Long> {
    //custom queries
    List<Timesheet> findAllByEmployeeId(Long emp_id);
    Timesheet findByEmployeeIdAndCheckoutDateNull(Long id);
    void deleteByEmployeeId(Long id);
}
