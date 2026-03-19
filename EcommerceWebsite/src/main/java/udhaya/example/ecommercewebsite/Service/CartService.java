package udhaya.example.ecommercewebsite.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import udhaya.example.ecommercewebsite.Entity.Cart;
import udhaya.example.ecommercewebsite.Entity.Product;
import udhaya.example.ecommercewebsite.Entity.User;
import udhaya.example.ecommercewebsite.Repository.CartRepository;
import udhaya.example.ecommercewebsite.Repository.ProductRepository;
import udhaya.example.ecommercewebsite.Repository.UserRepository;
import udhaya.example.ecommercewebsite.dto.CartRequest;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    // Get all cart items for a user
    public List<Cart> getCartItems(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cartRepository.findByUserId(userId);
    }

    // Add item to cart (if already exists, update quantity)
    public Cart addToCart(Long userId, CartRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getStock() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock");
        }

        // If product already in cart, update quantity
        Optional<Cart> existing = cartRepository.findByUserIdAndProductId(userId, request.getProductId());
        if (existing.isPresent()) {
            Cart cart = existing.get();
            cart.setQuantity(cart.getQuantity() + request.getQuantity());
            return cartRepository.save(cart);
        }

        Cart cart = new Cart(user, product, request.getQuantity());
        return cartRepository.save(cart);
    }

    // Remove specific cart item
    public void removeFromCart(Long userId, Long cartItemId) {
        Cart cart = cartRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cart.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: This cart item does not belong to user");
        }
        cartRepository.deleteById(cartItemId);
    }
}
