package udhaya.example.ecommercewebsite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import udhaya.example.ecommercewebsite.Entity.User;
import udhaya.example.ecommercewebsite.Repository.UserRepository;
import udhaya.example.ecommercewebsite.dto.LoginRequest;
import udhaya.example.ecommercewebsite.dto.RegisterRequest;

@Service
public class UserService {

<<<<<<< HEAD

}
=======
    @Autowired
    private UserRepository userRepository;

    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        return userRepository.save(user);
    }

    public User login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
>>>>>>> 1ddf8e1ad526712cbb803fd3d66fbd82320f6358
