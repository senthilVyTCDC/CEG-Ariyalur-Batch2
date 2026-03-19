package udhaya.example.ecommercewebsite.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import udhaya.example.ecommercewebsite.Entity.Order;
import udhaya.example.ecommercewebsite.Entity.OrderStatus;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // Get all orders for a specific user, newest first
    List<Order> findByUserIdOrderByOrderedAtDesc(Long userId);

    // FIX: Use OrderStatus enum (not String) since Order.status is an enum field
    List<Order> findByStatus(OrderStatus status);
}
