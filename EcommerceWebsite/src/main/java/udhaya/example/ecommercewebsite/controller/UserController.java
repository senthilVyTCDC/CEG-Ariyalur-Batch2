package udhaya.example.ecommercewebsite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import udhaya.example.ecommercewebsite.Entity.User;
import udhaya.example.ecommercewebsite.Service.UserService;
import udhaya.example.ecommercewebsite.dto.RegisterRequest;
import udhaya.example.ecommercewebsite.dto.LoginRequest;
import udhaya.example.ecommercewebsite.dto.ApiResponse;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = userService.register(request);
            user.setPassword(null);
            return ResponseEntity.ok(ApiResponse.ok("Registration successful", user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = userService.login(request);
            user.setPassword(null);
            return ResponseEntity.ok(ApiResponse.ok("Login successful", user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            user.setPassword(null);
            return ResponseEntity.ok(ApiResponse.ok("User found", user));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}