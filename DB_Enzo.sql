-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: selection_db
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'test',5,14,'2023-06-19 12:29:30','2023-06-19 12:29:30'),(2,'123',5,15,'2023-06-19 12:46:51','2023-06-19 12:46:51'),(3,'1',5,15,'2023-06-19 13:07:12','2023-06-19 13:07:12'),(4,'2',5,15,'2023-06-19 13:07:15','2023-06-19 13:07:15'),(5,'3',5,15,'2023-06-19 13:27:39','2023-06-19 13:27:39'),(6,'4',5,15,'2023-06-19 13:27:43','2023-06-19 13:27:43'),(7,'5',5,15,'2023-06-19 13:28:32','2023-06-19 13:28:32'),(8,'123',5,15,'2023-06-19 13:55:46','2023-06-19 13:55:46'),(9,'test',5,15,'2023-06-19 13:56:48','2023-06-19 13:56:48'),(10,'1',5,15,'2023-06-19 13:59:21','2023-06-19 13:59:21'),(11,'2',5,15,'2023-06-19 13:59:23','2023-06-19 13:59:23'),(12,'comment',6,15,'2023-06-19 14:10:28','2023-06-19 14:10:28'),(13,'comment\n',7,17,'2023-06-19 14:57:51','2023-06-19 14:57:51'),(14,'cool',9,19,'2023-06-19 15:17:50','2023-06-19 15:17:50'),(15,'cool castle',1,14,'2023-06-19 15:24:10','2023-06-19 15:24:10'),(16,'nice',1,13,'2023-06-19 15:24:18','2023-06-19 15:24:18');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (7,6,14,'2023-06-19 10:34:38','2023-06-19 10:34:38'),(8,6,13,'2023-06-19 10:34:39','2023-06-19 10:34:39'),(9,6,12,'2023-06-19 10:34:42','2023-06-19 10:34:42'),(12,5,12,'2023-06-19 10:57:15','2023-06-19 10:57:15'),(13,5,11,'2023-06-19 10:57:17','2023-06-19 10:57:17'),(15,5,1,'2023-06-19 10:57:21','2023-06-19 10:57:21'),(17,7,16,'2023-06-19 14:58:05','2023-06-19 14:58:05'),(19,9,18,'2023-06-19 15:17:42','2023-06-19 15:17:42'),(20,9,17,'2023-06-19 15:17:44','2023-06-19 15:17:44'),(21,1,15,'2023-06-19 15:23:40','2023-06-19 15:23:40'),(22,1,17,'2023-06-19 15:23:44','2023-06-19 15:23:44'),(24,1,1,'2023-06-19 15:24:43','2023-06-19 15:24:43');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,5,NULL,'my first post edit 1','2023-06-17 11:14:52','2023-06-18 19:07:06'),(2,5,NULL,'21341','2023-06-17 15:10:56','2023-06-17 15:10:56'),(3,5,NULL,'123','2023-06-17 15:35:44','2023-06-17 15:35:44'),(5,5,NULL,'123','2023-06-17 16:32:12','2023-06-17 16:32:12'),(6,5,NULL,'123','2023-06-17 16:35:31','2023-06-17 16:35:31'),(7,5,NULL,'123','2023-06-17 16:37:24','2023-06-17 16:37:24'),(8,5,NULL,'2321213312','2023-06-17 16:38:52','2023-06-16 16:38:52'),(10,5,'PIMG.1687020388046205507871.jpeg','2321213312','2023-06-17 16:46:28','2023-06-17 16:46:28'),(11,5,NULL,'wertwet','2023-06-18 11:06:20','2023-06-18 11:06:20'),(12,6,'PIMG.1687154881702952315387.jpeg','enzo oestanto tes post','2023-06-19 06:08:01','2023-06-19 06:08:01'),(13,6,'PIMG.1687154992766225082534.jpeg','beautiful','2023-06-19 06:09:52','2023-06-19 06:09:52'),(14,6,'PIMG.1687155766895761431340.jpeg','castle 1','2023-06-19 06:22:46','2023-06-19 07:56:24'),(15,5,NULL,'post this','2023-06-19 12:31:30','2023-06-19 12:31:30'),(16,7,NULL,'123','2023-06-19 14:56:52','2023-06-19 14:56:52'),(17,7,'PIMG.1687186634630329652483.jpeg','castle','2023-06-19 14:57:14','2023-06-19 14:57:14'),(19,9,'PIMG.1687187849406792097396.jpeg','night sky','2023-06-19 15:17:29','2023-06-19 15:17:29');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20230615061248-create-user.js'),('20230617070611-create-post.js'),('20230617071331-create-like.js'),('20230617071827-create-comment.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'enzo1','enzo1','oestanto@gmail.com','$2b$10$mTQo.hr0Eflk79zU2fflLuaFjh7dJ84rVgdTNvs42gYdO7Pq./kPK',NULL,1,'edit bio','2023-06-16 09:14:46','2023-06-19 15:23:23'),(2,'enzo2','enzo2','enzo482@gmail.com','$2b$10$FSKv6m3A4HWIuBIkjIIVmOHXscwjtaNmGUlObRwm2XJjt71byd4A6',NULL,0,NULL,'2023-06-16 09:20:10','2023-06-16 09:20:10'),(3,'enzo3','enzo3','enzo.oestao@gmail.com','$2b$10$3eBlq9S06RccaDPweFHpluJGN/uyiox3a2bhe/sSVfE8BqS9YaSdK',NULL,1,NULL,'2023-06-16 09:30:32','2023-06-16 17:53:41'),(4,'enzo4','enzo4','eo@gmail.com','$2b$10$2PtN/BO./EskuocL8.yYI.5PA6ICqe6dtmcktggPqvEH206Q2rwnm',NULL,0,NULL,'2023-06-17 05:03:39','2023-06-17 06:33:23'),(5,'enzo oestanto1','enzo05','enzo.oe@gmail.com','$2b$10$0VqnzVz7QCdBDGPQVLqwGu9U9iov8wiBjJFZDFlxCAE/5NO6o4Y4u','PIMG.1687092931098438142412.jpeg',1,'aaaa','2023-06-17 06:38:38','2023-06-18 16:22:02'),(6,'Enzo Oestanto','enzooestanto','enzo62@gmail.com','$2b$10$zZnyByw3mOmu.lXTAu9DmO/sLeccSnQYqlyXh2rtCrtof7SlIG7ES',NULL,1,NULL,'2023-06-19 05:58:28','2023-06-19 06:48:37'),(7,'enzoaja','enzo10','enzo.oestanto@gmail.com','$2b$10$UQ6qlhSqJK3R8NIRnQvBreIuPN4BzEWxGY3Jmw/JUwzBoRfOosQc.','PIMG.1687186721226316590322.jpeg',1,'ini bio ','2023-06-19 14:52:21','2023-06-19 14:58:41'),(8,'enzo 11','enzo11','en2@gmail.com','$2b$10$k8j9KRjrD.ionshLXxPN0egtT8zHo8Dg.auSNv.4eSEZiMp195k/W',NULL,0,NULL,'2023-06-19 14:59:59','2023-06-19 14:59:59'),(9,'enzo oestanto','enzo12','enzo4862@gmail.com','$2b$10$7mFRt298IrBwfHTMIDdhzOL2Oxtbi8xNBu1iJNCobJZogtkXBA63K','PIMG.1687188067182478156293.jpeg',1,'bio test','2023-06-19 15:14:01','2023-06-19 15:21:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-19 22:29:33
