package com.crowdfunding.backend.controller;

import com.crowdfunding.backend.entity.User;
import com.crowdfunding.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        if (userRepository.findByWalletAddress(user.getWalletAddress()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userRepository.save(user));
    }

    @GetMapping("/{walletAddress}")
    public ResponseEntity<User> getUser(@PathVariable String walletAddress) {
        return userRepository.findByWalletAddress(walletAddress)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
