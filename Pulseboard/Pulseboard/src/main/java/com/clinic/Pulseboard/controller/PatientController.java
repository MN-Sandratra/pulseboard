package com.clinic.Pulseboard.controller;

import com.clinic.Pulseboard.model.Patient;
import com.clinic.Pulseboard.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    private final PatientService service;

    public PatientController(PatientService service){
        this.service =service;
    }

    @GetMapping
    public Page<Patient> list(
            @RequestParam(required = false) String q,
            @PageableDefault(size = 20, sort = "lastName") Pageable pageable
    ) {
        return service.list(q, pageable);
    }

    @GetMapping("/{id}")
    public Patient getPatient(@PathVariable Long id){
        return service.get(id).orElseThrow(()-> new NoSuchElementException("Patient not found"));
    }

    @PostMapping
    public Patient create(@Valid @RequestBody Patient p){
        return service.save(p);
    }

    @PutMapping("/{id}")
    public Patient updatePatient(@PathVariable Long id, @Valid @RequestBody Patient p){
        Patient existingPatient = getPatient(id);
        p.setId(existingPatient.getId());
        return service.save(p);
    }
}
