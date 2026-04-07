-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: fsdintern
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `products_chk_1` CHECK ((`stock` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Footwear','2026-04-03 13:00:19.231599','Comfortable running shoes','https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400','Nike Air Max',2999.00,50),(2,'Footwear','2026-04-03 13:03:21.775484','High performance sports shoes','https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400','Adidas Ultraboost',4999.00,30),(3,'Clothing','2026-04-03 13:04:40.243310','Casual comfortable cotton wear','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400','Puma T-Shirt',1299.00,20),(4,'Clothing','2026-04-03 13:06:18.965437','Classic slim fit denim jeans','https://images.unsplash.com/photo-1542272604-787c3835535d?w=400','Levi\'s Jeans',3499.00,25),(5,'Electronics','2026-04-03 13:08:46.148063','Wireless noise cancelling earbuds','https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400','Sony Earbuds',3499.00,15),(6,'Accessories','2026-04-03 13:10:24.516863','UV protected trendy sunglasses','https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400','Fastrack Sunglasses',1499.00,20),(7,'Accessories','2026-04-03 13:10:40.780105','Stylish sports cap for all occasions','https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400','Adidas Cap',799.00,30),(8,'Accessories','2026-04-03 13:10:53.368120','Premium genuine leather wallet','https://images.unsplash.com/photo-1627123424574-724758594785?w=400','Leather Wallet',599.00,40),(9,'Electronics','2026-04-03 13:11:09.308719','Bass heavy over ear headphones','https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400','Boat Headphones',1999.00,35),(10,'Electronics','2026-04-03 13:11:25.461323','Smart watch with health tracking','https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400','Apple Watch Series 9',24999.00,10);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-07 11:36:36
