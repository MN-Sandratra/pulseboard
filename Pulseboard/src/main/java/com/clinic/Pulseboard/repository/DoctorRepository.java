package com.clinic.Pulseboard.repository;

import com.clinic.Pulseboard.model.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Page<Doctor> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(String q1,String q2, Pageable pageable);
}
