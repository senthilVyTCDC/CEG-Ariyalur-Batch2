package udhaya.example.ecommercewebsite.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User who placed the order
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Total order amount
    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    // Order status
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PENDING;

    // Shipping address
    @Column(name = "shipping_address", columnDefinition = "TEXT")
    private String shippingAddress;

    // Order creation time
    @Column(name = "ordered_at")
    private LocalDateTime orderedAt = LocalDateTime.now();

    // Order items
    @OneToMany(mappedBy = "order",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true)
    private List<OrderItem> orderItems;
}