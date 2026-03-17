package udhaya.example.ecommercewebsite.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import udhaya.example.ecommercewebsite.Entity.Product;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find products by category
    List<Product> findByCategory(String category);

    // Search products by name (case-insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);

    // Find products with stock greater than a value
    List<Product> findByStockGreaterThan(Integer stock);

    // Custom JPQL query
    @Query("SELECT p FROM Product p WHERE p.price <= :maxPrice ORDER BY p.price ASC")
    List<Product> findProductsUnderPrice(BigDecimal maxPrice);

}