package com.placementhub.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "app_users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String skills;
    private String resumeLink;

    public enum Role { STUDENT, ADMIN }

    @PrePersist
    public void prePersist() {
        if (role == null) role = Role.STUDENT;
    }
}
