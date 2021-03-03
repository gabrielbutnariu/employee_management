package com.boarding.app.repositories;

import com.boarding.app.models.Employee;
import com.boarding.app.models.Timesheet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimesheetRepository extends JpaRepository<Timesheet,Long> {

    Page<Timesheet> findAllByEmployeeUUID(String UUID, Pageable pageable);
    Timesheet findByEmployeeUUIDAndCheckoutDateNull(String UUID);
    void deleteByEmployeeUUID(String UUID);
}
