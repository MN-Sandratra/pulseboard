package com.clinic.Pulseboard.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email; // Import nécessaire
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max=80) @Column(nullable=false,length=80)
    private String firstName;

    @NotBlank
    @Size(max=80)
    @Column(nullable=false,length=80)
    private String lastName;

    @NotBlank
    @Size(max=80)
    @Column(nullable=false,length=80)
    private String speciality;

    @NotBlank
    @Size(max=100)
    @Column(nullable=false, length=100, unique=true)
    private String email;
}