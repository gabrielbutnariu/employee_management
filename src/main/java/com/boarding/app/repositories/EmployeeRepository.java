package com.boarding.app.repositories;

import com.boarding.app.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findAllByFirstName(String first);
    List<Employee> findAllByLastName(String last);
    List<Employee> findAllBySsn(String ssn);

    /*@Query("select e from employees e where e.first_name = :firstName")
    List<Employee> findByFirstName(@Param("firstName") String firstName);
*/
}
