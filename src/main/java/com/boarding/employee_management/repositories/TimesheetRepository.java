package com.boarding.employee_management.repositories;

import com.boarding.employee_management.models.Timesheet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimesheetRepository extends JpaRepository<Timesheet,Long> {
}
