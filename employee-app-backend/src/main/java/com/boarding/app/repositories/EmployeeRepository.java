package com.boarding.app.repositories;

import com.boarding.app.models.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findAllByOrderByLastNameAsc();
    List<Employee> findAllByOrderByLastNameDesc();
    Page<Employee> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String filter1, String filter2, Pageable pageable);

    Employee findByUUID(String UUID);
    void deleteByUUID(String UUID);
}
