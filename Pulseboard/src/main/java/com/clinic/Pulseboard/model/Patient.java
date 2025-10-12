package com.clinic.Pulseboard.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(
        name = "patients",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"email"}),
                @UniqueConstraint(columnNames = {"social_id"})
        }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must not exceed 50 characters")
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must not exceed 50 characters")
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Past(message = "Birth date must be in the past")
    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Pattern(
            regexp = "^\\+?[0-9. ()-]{7,25}$",
            message = "Invalid phone number format"
    )
    @Column(length = 25)
    private String phone;

    @Email(message = "Invalid email format")
    @Size(max = 100)
    @Column(unique = true, length = 100)
    private String email;

    @Size(max = 255)
    private String address;

    @Column(name = "social_id", unique = true, length = 50)
    @Size(max = 50, message = "Social ID must not exceed 50 characters")
    private String socialId;
}
