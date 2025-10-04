package com.clinic.Pulseboard.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private Gender gender = Gender.UNKNOWN;

    @Pattern(regexp = "^$|^[+0-9 .-]{6,20}$")
    private String phone;

    @Email
    private String email;
}
