package udhaya.example.ecommercewebsite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import udhaya.example.ecommercewebsite.Entity.Order;
import udhaya.example.ecommercewebsite.Service.OrderService;
import udhaya.example.ecommercewebsite.dto.OrderRequest;
import udhaya.example.ecommercewebsite.dto.ApiResponse;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/{userId}")
    public ResponseEntity<ApiResponse> placeOrder(
            @PathVariable Long userId,
            @RequestBody OrderRequest request) {

        try {
            Order order = orderService.placeOrder(userId, request);
            return ResponseEntity.ok(ApiResponse.ok("Order placed successfully!", order));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{userId}/history")
    public ResponseEntity<ApiResponse> getOrderHistory(@PathVariable Long userId) {
        try {
            List<Order> orders = orderService.getOrderHistory(userId);
            return ResponseEntity.ok(ApiResponse.ok("Order history retrieved", orders));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/detail/{orderId}")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable Long orderId) {
        try {
            Order order = orderService.getOrderById(orderId);
            return ResponseEntity.ok(ApiResponse.ok("Order found", order));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}