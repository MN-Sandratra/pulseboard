package com.clinic.Pulseboard.service;

import com.clinic.Pulseboard.model.Doctor;
import com.clinic.Pulseboard.repository.DoctorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class DoctorService {
    private final DoctorRepository doctorRepository;

    public Page<Doctor> list(String q, Pageable p) {
        return (q == null || q.isBlank()) ? doctorRepository.findAll(p) : doctorRepository.findByLastNameContainingIgnoreCase(q, p);
    }

    public Doctor save(Doctor d) {
        return doctorRepository.save(d);
    }

    public Doctor get(Long id) {
        return doctorRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Doctor not found"));
    }

    public void delete(Long id) {
        doctorRepository.deleteById(id);
    }
}
