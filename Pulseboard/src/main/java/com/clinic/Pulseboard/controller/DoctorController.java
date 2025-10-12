package com.clinic.Pulseboard.controller;

import com.clinic.Pulseboard.model.Doctor;
import com.clinic.Pulseboard.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:4200")
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping
    public Page<Doctor> list(@RequestParam(required=false) String q,
                             @PageableDefault(size=20, sort="lastName") Pageable pageable) {
        return doctorService.list(q, pageable);
    }

    @GetMapping("/{id}")
    public Doctor get(@PathVariable Long id){
        return doctorService.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Doctor create(@Valid @RequestBody Doctor d){ d.setId(null);
        return doctorService.save(d);
    }

    @PutMapping("/{id}")
    public Doctor update(@PathVariable Long id, @Valid @RequestBody Doctor d){
        var e=doctorService.get(id);
        d.setId(e.getId());
        return doctorService.save(d);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        doctorService.delete(id);
    }
}
