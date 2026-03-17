package udhaya.example.ecommercewebsite.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import udhaya.example.ecommercewebsite.Entity.Cart;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    // Get all cart items for a specific user
    List<Cart> findByUserId(Long userId);

    // Find a specific cart item by user and product
    Optional<Cart> findByUserIdAndProductId(Long userId, Long productId);

    // Delete all cart items for a user
    void deleteByUserId(Long userId);

}