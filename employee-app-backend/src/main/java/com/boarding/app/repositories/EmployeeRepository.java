package com.boarding.app.repositories;

import com.boarding.app.models.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findAllByOrderByLastNameAsc();
    List<Employee> findAllByOrderByLastNameDesc();

    @Query(
            value = "SELECT *FROM employees emp WHERE emp.first_name ILIKE %?1% OR emp.last_name ILIKE %?1%",
            countQuery = "SELECT COUNT(*) FROM employees e WHERE e.first_name ILIKE %?1% OR e.last_name ILIKE %?1%",
            nativeQuery = true)
    Page<Employee> findByFilter(@Param("filter") String filter, Pageable pageable);

    Employee findByUUID(String UUID);
    Employee deleteByUUID(String UUID);
}
