package com.crowdfunding.backend.controller;

import com.crowdfunding.backend.entity.User;
import com.crowdfunding.backend.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        if (userRepository.findByWalletAddress(user.getWalletAddress()).isPresent()) {
            return ResponseEntity.status(409).body(Map.of("message", "Wallet address is already registered"));
        }
        return ResponseEntity.status(201).body(userRepository.save(user));
    }

    @GetMapping("/{walletAddress}")
    public ResponseEntity<User> getUser(@PathVariable String walletAddress) {
        return userRepository.findByWalletAddress(walletAddress)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
