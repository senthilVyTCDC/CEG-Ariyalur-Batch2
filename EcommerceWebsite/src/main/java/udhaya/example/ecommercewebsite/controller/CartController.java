package udhaya.example.ecommercewebsite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

import udhaya.example.ecommercewebsite.Entity.Cart;
import udhaya.example.ecommercewebsite.Service.CartService;
import udhaya.example.ecommercewebsite.dto.CartRequest;
import udhaya.example.ecommercewebsite.dto.ApiResponse;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    // ✅ Get Cart Items
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getCart(@PathVariable Long userId) {
        List<Cart> cartItems = cartService.getCartItems(userId);
        return ResponseEntity.ok(ApiResponse.ok("Cart items retrieved", cartItems));
    }

    // ✅ Add to Cart (FIXED 🔥)
    @PostMapping("/{userId}/add")
    public ResponseEntity<ApiResponse> addToCart(
            @PathVariable Long userId,
            @Valid @RequestBody CartRequest request) {

        Cart cartItem = cartService.addToCart(userId, request);
        return ResponseEntity.ok(ApiResponse.ok("Item added to cart", cartItem));
    }

    // ✅ Remove item
    @DeleteMapping("/{userId}/item/{cartItemId}")
    public ResponseEntity<ApiResponse> removeFromCart(
            @PathVariable Long userId,
            @PathVariable Long cartItemId) {

        cartService.removeFromCart(userId, cartItemId);
        return ResponseEntity.ok(ApiResponse.ok("Item removed from cart", null));
    }
}