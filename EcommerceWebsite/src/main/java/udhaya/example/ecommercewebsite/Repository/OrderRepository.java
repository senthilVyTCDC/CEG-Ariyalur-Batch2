package udhaya.example.ecommercewebsite.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import udhaya.example.ecommercewebsite.Entity.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    // Get all orders for a specific user, newest first
    List<Order> findByUserIdOrderByOrderedAtDesc(Long userId);

    // Get orders by status
    List<Order> findByStatus(String status);

}