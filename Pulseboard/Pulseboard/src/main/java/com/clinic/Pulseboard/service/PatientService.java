package com.clinic.Pulseboard.service;

import com.clinic.Pulseboard.model.Patient;
import com.clinic.Pulseboard.repository.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;

    public Page<Patient> list(String q, Pageable pageable) {
        if (q == null || q.isBlank()) {
            return patientRepository.findAll(pageable);
        }

        return patientRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                q, q, pageable
        );
    }

    public Patient save(Patient p){
        return patientRepository.save(p);
    }

    public Optional<Patient> get(Long id){
        return patientRepository.findById(id);
    }

    public void delete(Long id){
        patientRepository.deleteById(id);
    }
}
