package com.crowdfunding.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Wallet address is required")
    @Pattern(regexp = "^0x[a-fA-F0-9]{40}$", message = "Wallet address must be a valid Ethereum address")
    private String walletAddress;

    @Size(max = 100, message = "Username must be at most 100 characters")
    private String username;

    @Email(message = "Email must be valid")
    @Size(max = 320, message = "Email must be at most 320 characters")
    private String email;
}
