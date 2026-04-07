package udhaya.example.ecommercewebsite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

import udhaya.example.ecommercewebsite.Entity.Product;
import udhaya.example.ecommercewebsite.Service.ProductService;
import udhaya.example.ecommercewebsite.dto.ApiResponse;
import udhaya.example.ecommercewebsite.dto.ProductRequest;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    // ✅ GET ALL
    @GetMapping
    public ResponseEntity<ApiResponse> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(ApiResponse.ok("Products retrieved", products));
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProductById(@PathVariable Long id) {
        try {
            Product product = productService.getProductById(id);
            return ResponseEntity.ok(ApiResponse.ok("Product found", product));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    // ✅ SEARCH
    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchProducts(@RequestParam String keyword) {
        List<Product> products = productService.searchProducts(keyword);
        return ResponseEntity.ok(ApiResponse.ok("Search results", products));
    }

    // ✅ CATEGORY
    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse> getByCategory(@PathVariable String category) {
        List<Product> products = productService.getByCategory(category);
        return ResponseEntity.ok(ApiResponse.ok("Products in category: " + category, products));
    }

    // ✅ ADD SINGLE PRODUCT
    @PostMapping
    public ResponseEntity<ApiResponse> addProduct(@Valid @RequestBody ProductRequest request) {
        try {
            Product product = productService.addProduct(request);
            return ResponseEntity.ok(ApiResponse.ok("Product added successfully", product));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error: " + e.getMessage()));
        }
    }

    // 🔥 ADD BULK PRODUCTS (MAIN FIX 💥)
    @PostMapping("/bulk")
    public ResponseEntity<ApiResponse> addProducts(@RequestBody List<@Valid ProductRequest> requests) {
        try {
            if (requests == null || requests.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Product list cannot be empty"));
            }

            List<Product> products = requests.stream()
                    .map(productService::addProduct)
                    .toList();

            return ResponseEntity.ok(
                    ApiResponse.ok("Bulk products added successfully", products)
            );

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Error: " + e.getMessage()));
        }
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable Long id,
                                                    @RequestBody ProductRequest request) {
        try {
            Product product = productService.updateProduct(id, request);
            return ResponseEntity.ok(ApiResponse.ok("Product updated successfully", product));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error: " + e.getMessage()));
        }
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok(ApiResponse.ok("Product deleted successfully", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Error: " + e.getMessage()));
        }
    }
}