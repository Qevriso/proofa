-- MySQL dump 10.13  Distrib 8.0.43, for Linux (aarch64)
--
-- Host: localhost    Database: kimai
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `kimai2_access_token`
--

DROP TABLE IF EXISTS `kimai2_access_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_access_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_usage` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `expires_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_6FB0DB1E5F37A13B` (`token`),
  KEY `IDX_6FB0DB1EA76ED395` (`user_id`),
  CONSTRAINT `FK_6FB0DB1EA76ED395` FOREIGN KEY (`user_id`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_access_token`
--

LOCK TABLES `kimai2_access_token` WRITE;
/*!40000 ALTER TABLE `kimai2_access_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_access_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_activities`
--

DROP TABLE IF EXISTS `kimai2_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int DEFAULT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `visible` tinyint(1) NOT NULL,
  `color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_budget` int NOT NULL DEFAULT '0',
  `budget` double NOT NULL DEFAULT '0',
  `budget_type` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billable` tinyint(1) NOT NULL DEFAULT '1',
  `invoice_text` longtext COLLATE utf8mb4_unicode_ci,
  `number` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_8811FE1C166D1F9C` (`project_id`),
  KEY `IDX_8811FE1C7AB0E859166D1F9C` (`visible`,`project_id`),
  KEY `IDX_8811FE1C7AB0E859166D1F9C5E237E06` (`visible`,`project_id`,`name`),
  KEY `IDX_8811FE1C7AB0E8595E237E06` (`visible`,`name`),
  CONSTRAINT `FK_8811FE1C166D1F9C` FOREIGN KEY (`project_id`) REFERENCES `kimai2_projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_activities`
--

LOCK TABLES `kimai2_activities` WRITE;
/*!40000 ALTER TABLE `kimai2_activities` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_activities_meta`
--

DROP TABLE IF EXISTS `kimai2_activities_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_activities_meta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity_id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `visible` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_A7C0A43D81C060965E237E06` (`activity_id`,`name`),
  KEY `IDX_A7C0A43D81C06096` (`activity_id`),
  CONSTRAINT `FK_A7C0A43D81C06096` FOREIGN KEY (`activity_id`) REFERENCES `kimai2_activities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_activities_meta`
--

LOCK TABLES `kimai2_activities_meta` WRITE;
/*!40000 ALTER TABLE `kimai2_activities_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_activities_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_activities_rates`
--

DROP TABLE IF EXISTS `kimai2_activities_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_activities_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `activity_id` int DEFAULT NULL,
  `rate` double NOT NULL,
  `fixed` tinyint(1) NOT NULL,
  `internal_rate` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_4A7F11BEA76ED39581C06096` (`user_id`,`activity_id`),
  KEY `IDX_4A7F11BEA76ED395` (`user_id`),
  KEY `IDX_4A7F11BE81C06096` (`activity_id`),
  CONSTRAINT `FK_4A7F11BE81C06096` FOREIGN KEY (`activity_id`) REFERENCES `kimai2_activities` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_4A7F11BEA76ED395` FOREIGN KEY (`user_id`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_activities_rates`
--

LOCK TABLES `kimai2_activities_rates` WRITE;
/*!40000 ALTER TABLE `kimai2_activities_rates` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_activities_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_activities_teams`
--

DROP TABLE IF EXISTS `kimai2_activities_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_activities_teams` (
  `activity_id` int NOT NULL,
  `team_id` int NOT NULL,
  PRIMARY KEY (`activity_id`,`team_id`),
  KEY `IDX_986998DA81C06096` (`activity_id`),
  KEY `IDX_986998DA296CD8AE` (`team_id`),
  CONSTRAINT `FK_986998DA296CD8AE` FOREIGN KEY (`team_id`) REFERENCES `kimai2_teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_986998DA81C06096` FOREIGN KEY (`activity_id`) REFERENCES `kimai2_activities` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_activities_teams`
--

LOCK TABLES `kimai2_activities_teams` WRITE;
/*!40000 ALTER TABLE `kimai2_activities_teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_activities_teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_bookmarks`
--

DROP TABLE IF EXISTS `kimai2_bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_bookmarks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_4016EF25A76ED3955E237E06` (`user_id`,`name`),
  KEY `IDX_4016EF25A76ED395` (`user_id`),
  CONSTRAINT `FK_4016EF25A76ED395` FOREIGN KEY (`user_id`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_bookmarks`
--

LOCK TABLES `kimai2_bookmarks` WRITE;
/*!40000 ALTER TABLE `kimai2_bookmarks` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_configuration`
--

DROP TABLE IF EXISTS `kimai2_configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_configuration` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_1C5D63D85E237E06` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_configuration`
--

LOCK TABLES `kimai2_configuration` WRITE;
/*!40000 ALTER TABLE `kimai2_configuration` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_configuration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_customers`
--

DROP TABLE IF EXISTS `kimai2_customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `visible` tinyint(1) NOT NULL,
  `company` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `country` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(75) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `homepage` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timezone` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_budget` int NOT NULL DEFAULT '0',
  `budget` double NOT NULL DEFAULT '0',
  `vat_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget_type` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billable` tinyint(1) NOT NULL DEFAULT '1',
  `invoice_template_id` int DEFAULT NULL,
  `invoice_text` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_5A9760447AB0E859` (`visible`),
  KEY `IDX_5A97604412946D8B` (`invoice_template_id`),
  CONSTRAINT `FK_5A97604412946D8B` FOREIGN KEY (`invoice_template_id`) REFERENCES `kimai2_invoice_templates` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_customers`
--

LOCK TABLES `kimai2_customers` WRITE;
/*!40000 ALTER TABLE `kimai2_customers` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_customers_comments`
--

DROP TABLE IF EXISTS `kimai2_customers_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_customers_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `created_by_id` int NOT NULL,
  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `pinned` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `IDX_A5B142D99395C3F3` (`customer_id`),
  KEY `IDX_A5B142D9B03A8386` (`created_by_id`),
  CONSTRAINT `FK_A5B142D99395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `kimai2_customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_A5B142D9B03A8386` FOREIGN KEY (`created_by_id`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_customers_comments`
--

LOCK TABLES `kimai2_customers_comments` WRITE;
/*!40000 ALTER TABLE `kimai2_customers_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_customers_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_customers_meta`
--

DROP TABLE IF EXISTS `kimai2_customers_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_customers_meta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `visible` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_A48A760F9395C3F35E237E06` (`customer_id`,`name`),
  KEY `IDX_A48A760F9395C3F3` (`customer_id`),
  CONSTRAINT `FK_A48A760F9395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `kimai2_customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_customers_meta`
--

LOCK TABLES `kimai2_customers_meta` WRITE;
/*!40000 ALTER TABLE `kimai2_customers_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_customers_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_customers_rates`
--

DROP TABLE IF EXISTS `kimai2_customers_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_customers_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `rate` double NOT NULL,
  `fixed` tinyint(1) NOT NULL,
  `internal_rate` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_82AB0AECA76ED3959395C3F3` (`user_id`,`customer_id`),
  KEY `IDX_82AB0AECA76ED395` (`user_id`),
  KEY `IDX_82AB0AEC9395C3F3` (`customer_id`),
  CONSTRAINT `FK_82AB0AEC9395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `kimai2_customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_82AB0AECA76ED395` FOREIGN KEY (`user_id`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_customers_rates`
--

LOCK TABLES `kimai2_customers_rates` WRITE;
/*!40000 ALTER TABLE `kimai2_customers_rates` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_customers_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_customers_teams`
--

DROP TABLE IF EXISTS `kimai2_customers_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_customers_teams` (
  `customer_id` int NOT NULL,
  `team_id` int NOT NULL,
  PRIMARY KEY (`customer_id`,`team_id`),
  KEY `IDX_50BD83889395C3F3` (`customer_id`),
  KEY `IDX_50BD8388296CD8AE` (`team_id`),
  CONSTRAINT `FK_50BD8388296CD8AE` FOREIGN KEY (`team_id`) REFERENCES `kimai2_teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_50BD83889395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `kimai2_customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_customers_teams`
--

LOCK TABLES `kimai2_customers_teams` WRITE;
/*!40000 ALTER TABLE `kimai2_customers_teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_customers_teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_export_templates`
--

DROP TABLE IF EXISTS `kimai2_export_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_export_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `renderer` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `language` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `columns` json NOT NULL,
  `options` json NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_2F0CA26F2B36786B` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_export_templates`
--

LOCK TABLES `kimai2_export_templates` WRITE;
/*!40000 ALTER TABLE `kimai2_export_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_export_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_invoice_templates`
--

DROP TABLE IF EXISTS `kimai2_invoice_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_invoice_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `due_days` int NOT NULL,
  `vat` double DEFAULT '0',
  `calculator` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `number_generator` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `renderer` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_terms` text COLLATE utf8mb4_unicode_ci,
  `vat_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact` longtext COLLATE utf8mb4_unicode_ci,
  `payment_details` longtext COLLATE utf8mb4_unicode_ci,
  `language` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_1626CFE95E237E06` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_invoice_templates`
--

LOCK TABLES `kimai2_invoice_templates` WRITE;
/*!40000 ALTER TABLE `kimai2_invoice_templates` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_invoice_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_invoices`
--

DROP TABLE IF EXISTS `kimai2_invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_invoices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `user_id` int NOT NULL,
  `invoice_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `timezone` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` double NOT NULL,
  `tax` double NOT NULL,
  `currency` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_days` int NOT NULL,
  `vat` double NOT NULL,
  `invoice_filename` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_date` date DEFAULT NULL,
  `comment` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_76C38E372DA68207` (`invoice_number`),
  UNIQUE KEY `UNIQ_76C38E372323B33D` (`invoice_filename`),
  KEY `IDX_76C38E37A76ED395` (`user_id`),
  KEY `IDX_76C38E379395C3F3` (`customer_id`),
  CONSTRAINT `FK_76C38E379395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `kimai2_customers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_76C38E37A76ED395` FOREIGN KEY (`user_id`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_invoices`
--

LOCK TABLES `kimai2_invoices` WRITE;
/*!40000 ALTER TABLE `kimai2_invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_invoices_meta`
--

DROP TABLE IF EXISTS `kimai2_invoices_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_invoices_meta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `visible` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_7EDC37D92989F1FD5E237E06` (`invoice_id`,`name`),
  KEY `IDX_7EDC37D92989F1FD` (`invoice_id`),
  CONSTRAINT `FK_7EDC37D92989F1FD` FOREIGN KEY (`invoice_id`) REFERENCES `kimai2_invoices` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_invoices_meta`
--

LOCK TABLES `kimai2_invoices_meta` WRITE;
/*!40000 ALTER TABLE `kimai2_invoices_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_invoices_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_projects`
--

DROP TABLE IF EXISTS `kimai2_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_number` tinytext COLLATE utf8mb4_unicode_ci,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `visible` tinyint(1) NOT NULL,
  `budget` double NOT NULL DEFAULT '0',
  `color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_budget` int NOT NULL DEFAULT '0',
  `order_date` datetime DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `timezone` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `budget_type` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billable` tinyint(1) NOT NULL DEFAULT '1',
  `invoice_text` longtext COLLATE utf8mb4_unicode_ci,
  `global_activities` tinyint(1) NOT NULL DEFAULT '1',
  `number` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_407F12069395C3F3` (`customer_id`),
  KEY `IDX_407F12069395C3F37AB0E8595E237E06` (`customer_id`,`visible`,`name`),
  KEY `IDX_407F12069395C3F37AB0E859BF396750` (`customer_id`,`visible`,`id`),
  CONSTRAINT `FK_407F12069395C3F3` FOREIGN KEY (`customer_id`) REFERENCES `kimai2_customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_projects`
--

LOCK TABLES `kimai2_projects` WRITE;
/*!40000 ALTER TABLE `kimai2_projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_projects_comments`
--

DROP TABLE IF EXISTS `kimai2_projects_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_projects_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `created_by_id` int NOT NULL,
  `message` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `pinned` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `IDX_29A23638166D1F9C` (`project_id`),
  KEY `IDX_29A23638B03A8386` (`created_by_id`),
  CONSTRAINT `FK_29A23638166D1F9C` FOREIGN KEY (`project_id`) REFERENCES `kimai2_projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_29A23638B03A8386` FOREIGN KEY (`created_by_id`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_projects_comments`
--

LOCK TABLES `kimai2_projects_comments` WRITE;
/*!40000 ALTER TABLE `kimai2_projects_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_projects_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_projects_meta`
--

DROP TABLE IF EXISTS `kimai2_projects_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_projects_meta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `visible` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_50536EF2166D1F9C5E237E06` (`project_id`,`name`),
  KEY `IDX_50536EF2166D1F9C` (`project_id`),
  CONSTRAINT `FK_50536EF2166D1F9C` FOREIGN KEY (`project_id`) REFERENCES `kimai2_projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_projects_meta`
--

LOCK TABLES `kimai2_projects_meta` WRITE;
/*!40000 ALTER TABLE `kimai2_projects_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_projects_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_projects_rates`
--

DROP TABLE IF EXISTS `kimai2_projects_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_projects_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  `rate` double NOT NULL,
  `fixed` tinyint(1) NOT NULL,
  `internal_rate` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_41535D55A76ED395166D1F9C` (`user_id`,`project_id`),
  KEY `IDX_41535D55A76ED395` (`user_id`),
  KEY `IDX_41535D55166D1F9C` (`project_id`),
  CONSTRAINT `FK_41535D55166D1F9C` FOREIGN KEY (`project_id`) REFERENCES `kimai2_projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_41535D55A76ED395` FOREIGN KEY (`user_id`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_projects_rates`
--

LOCK TABLES `kimai2_projects_rates` WRITE;
/*!40000 ALTER TABLE `kimai2_projects_rates` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_projects_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_projects_teams`
--

DROP TABLE IF EXISTS `kimai2_projects_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_projects_teams` (
  `project_id` int NOT NULL,
  `team_id` int NOT NULL,
  PRIMARY KEY (`project_id`,`team_id`),
  KEY `IDX_9345D431166D1F9C` (`project_id`),
  KEY `IDX_9345D431296CD8AE` (`team_id`),
  CONSTRAINT `FK_9345D431166D1F9C` FOREIGN KEY (`project_id`) REFERENCES `kimai2_projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_9345D431296CD8AE` FOREIGN KEY (`team_id`) REFERENCES `kimai2_teams` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_projects_teams`
--

LOCK TABLES `kimai2_projects_teams` WRITE;
/*!40000 ALTER TABLE `kimai2_projects_teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_projects_teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_roles`
--

DROP TABLE IF EXISTS `kimai2_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_roles`
--

LOCK TABLES `kimai2_roles` WRITE;
/*!40000 ALTER TABLE `kimai2_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_roles_permissions`
--

DROP TABLE IF EXISTS `kimai2_roles_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_roles_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `permission` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `allowed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_permission` (`role_id`,`permission`),
  KEY `IDX_D263A3B8D60322AC` (`role_id`),
  CONSTRAINT `FK_D263A3B8D60322AC` FOREIGN KEY (`role_id`) REFERENCES `kimai2_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_roles_permissions`
--

LOCK TABLES `kimai2_roles_permissions` WRITE;
/*!40000 ALTER TABLE `kimai2_roles_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_roles_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_sessions`
--

DROP TABLE IF EXISTS `kimai2_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_sessions` (
  `id` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` blob NOT NULL,
  `time` int unsigned NOT NULL,
  `lifetime` int unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_sessions`
--

LOCK TABLES `kimai2_sessions` WRITE;
/*!40000 ALTER TABLE `kimai2_sessions` DISABLE KEYS */;
INSERT INTO `kimai2_sessions` VALUES ('f0pf36f8hv7qsjca7hdc72eeek',_binary '_sf2_attributes|a:1:{s:34:\"_security.secured_area.target_path\";s:33:\"http://localhost:8083/ru/homepage\";}_sf2_meta|a:3:{s:1:\"u\";i:1758046214;s:1:\"c\";i:1758046214;s:1:\"l\";i:0;}',1758046214,1758047654),('jaebqmpejo6trqbcbfjekce3ka',_binary '_sf2_attributes|a:6:{s:23:\"_security.last_username\";s:5:\"admin\";s:22:\"_security_secured_area\";s:419:\"O:74:\"Symfony\\Component\\Security\\Core\\Authentication\\Token\\UsernamePasswordToken\":3:{i:0;N;i:1;s:12:\"secured_area\";i:2;a:5:{i:0;O:15:\"App\\Entity\\User\":5:{s:2:\"id\";i:1;s:8:\"username\";s:5:\"admin\";s:7:\"enabled\";b:1;s:5:\"email\";s:19:\"admin@localhost.dev\";s:8:\"password\";s:60:\"$2y$13$3JU78/0yIdXrsSNWcAQExur68fpweYZhx89AMpAo1pLVqsaUyyhUK\";}i:1;b:1;i:2;N;i:3;a:0:{}i:4;a:2:{i:0;s:16:\"ROLE_SUPER_ADMIN\";i:1;s:9:\"ROLE_USER\";}}}\";s:10:\"_csrf/form\";s:43:\"P2Lq280jrxQUku_m13cByenbBO2jwQhSEl2gRlFFMFc\";s:12:\"_csrf/search\";s:43:\"1bl6GrlqIXhh7IFa0rZ8jcnn7zbQOPMQgFa7YBJqyUw\";s:22:\"_csrf/datatable_update\";s:43:\"mnZxCD-Mpmqu41tEiWUbmCuaQldHiv5zs_m4HKj_DC8\";s:26:\"_csrf/timesheet_quick_edit\";s:43:\"t5mUok9S5RUunbsOfDuxEnNYi9v_js9D1VV2h5H7jj8\";}_sf2_meta|a:3:{s:1:\"u\";i:1758046279;s:1:\"c\";i:1758046228;s:1:\"l\";i:0;}',1758046279,1758047719),('tmh1suufp7usab17n9c3qb19rk',_binary '_sf2_attributes|a:1:{s:18:\"_csrf/authenticate\";s:43:\"ofzxeXB5y5aIw3JTdccp7uqXili2HNjeTBfu_fKi5BA\";}_sf2_meta|a:3:{s:1:\"u\";i:1758046214;s:1:\"c\";i:1758046214;s:1:\"l\";i:0;}',1758046214,1758047654);
/*!40000 ALTER TABLE `kimai2_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_tags`
--

DROP TABLE IF EXISTS `kimai2_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `visible` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_27CAF54C5E237E06` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_tags`
--

LOCK TABLES `kimai2_tags` WRITE;
/*!40000 ALTER TABLE `kimai2_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_teams`
--

DROP TABLE IF EXISTS `kimai2_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_3BEDDC7F5E237E06` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_teams`
--

LOCK TABLES `kimai2_teams` WRITE;
/*!40000 ALTER TABLE `kimai2_teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_timesheet`
--

DROP TABLE IF EXISTS `kimai2_timesheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_timesheet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `activity_id` int NOT NULL,
  `project_id` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `rate` double NOT NULL,
  `fixed_rate` double DEFAULT NULL,
  `hourly_rate` double DEFAULT NULL,
  `exported` tinyint(1) NOT NULL DEFAULT '0',
  `timezone` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `internal_rate` double DEFAULT NULL,
  `billable` tinyint(1) DEFAULT '1',
  `category` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'work',
  `modified_at` datetime DEFAULT NULL,
  `date_tz` date NOT NULL,
  `break` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_4F60C6B18D93D649` (`user`),
  KEY `IDX_4F60C6B181C06096` (`activity_id`),
  KEY `IDX_4F60C6B1166D1F9C` (`project_id`),
  KEY `IDX_4F60C6B18D93D649502DF587` (`user`,`start_time`),
  KEY `IDX_4F60C6B1502DF587` (`start_time`),
  KEY `IDX_4F60C6B1502DF58741561401` (`start_time`,`end_time`),
  KEY `IDX_4F60C6B1502DF587415614018D93D649` (`start_time`,`end_time`,`user`),
  KEY `IDX_4F60C6B1BDF467148D93D649` (`date_tz`,`user`),
  KEY `IDX_4F60C6B1415614018D93D649` (`end_time`,`user`),
  KEY `IDX_TIMESHEET_TICKTAC` (`end_time`,`user`,`start_time`),
  KEY `IDX_TIMESHEET_RECENT_ACTIVITIES` (`user`,`project_id`,`activity_id`),
  KEY `IDX_TIMESHEET_RESULT_STATS` (`user`,`id`,`duration`),
  CONSTRAINT `FK_4F60C6B1166D1F9C` FOREIGN KEY (`project_id`) REFERENCES `kimai2_projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_4F60C6B181C06096` FOREIGN KEY (`activity_id`) REFERENCES `kimai2_activities` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_4F60C6B18D93D649` FOREIGN KEY (`user`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_timesheet`
--

LOCK TABLES `kimai2_timesheet` WRITE;
/*!40000 ALTER TABLE `kimai2_timesheet` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_timesheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_timesheet_meta`
--

DROP TABLE IF EXISTS `kimai2_timesheet_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_timesheet_meta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timesheet_id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `visible` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_CB606CBAABDD46BE5E237E06` (`timesheet_id`,`name`),
  KEY `IDX_CB606CBAABDD46BE` (`timesheet_id`),
  CONSTRAINT `FK_CB606CBAABDD46BE` FOREIGN KEY (`timesheet_id`) REFERENCES `kimai2_timesheet` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_timesheet_meta`
--

LOCK TABLES `kimai2_timesheet_meta` WRITE;
/*!40000 ALTER TABLE `kimai2_timesheet_meta` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_timesheet_meta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_timesheet_tags`
--

DROP TABLE IF EXISTS `kimai2_timesheet_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_timesheet_tags` (
  `timesheet_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`timesheet_id`,`tag_id`),
  KEY `IDX_E3284EFEABDD46BE` (`timesheet_id`),
  KEY `IDX_E3284EFEBAD26311` (`tag_id`),
  CONSTRAINT `FK_732EECA9ABDD46BE` FOREIGN KEY (`timesheet_id`) REFERENCES `kimai2_timesheet` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_732EECA9BAD26311` FOREIGN KEY (`tag_id`) REFERENCES `kimai2_tags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_timesheet_tags`
--

LOCK TABLES `kimai2_timesheet_tags` WRITE;
/*!40000 ALTER TABLE `kimai2_timesheet_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_timesheet_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_user_preferences`
--

DROP TABLE IF EXISTS `kimai2_user_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_user_preferences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D08F631A76ED3955E237E06` (`user_id`,`name`),
  KEY `IDX_8D08F631A76ED395` (`user_id`),
  CONSTRAINT `FK_8D08F631A76ED395` FOREIGN KEY (`user_id`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_user_preferences`
--

LOCK TABLES `kimai2_user_preferences` WRITE;
/*!40000 ALTER TABLE `kimai2_user_preferences` DISABLE KEYS */;
INSERT INTO `kimai2_user_preferences` VALUES (1,1,'timezone','UTC'),(2,1,'language','en'),(3,1,'skin','default'),(4,1,'hourly_rate','0'),(5,1,'internal_rate',NULL),(6,1,'locale','en'),(7,1,'first_weekday','monday'),(8,1,'update_browser_title','1'),(9,1,'calendar_initial_view','month'),(10,1,'login_initial_view','timesheet'),(11,1,'favorite_routes',''),(12,1,'daily_stats',''),(13,1,'export_decimal',''),(14,1,'__wizards__','intro,profile'),(15,1,'_latest_approval',NULL);
/*!40000 ALTER TABLE `kimai2_user_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_users`
--

DROP TABLE IF EXISTS `kimai2_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alias` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  `registration_date` datetime DEFAULT NULL,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `last_login` datetime DEFAULT NULL,
  `confirmation_token` varchar(180) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_requested_at` datetime DEFAULT NULL,
  `api_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `auth` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totp_secret` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `totp_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `system_account` tinyint(1) NOT NULL DEFAULT '0',
  `supervisor_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_B9AC5BCEF85E0677` (`username`),
  UNIQUE KEY `UNIQ_B9AC5BCEE7927C74` (`email`),
  UNIQUE KEY `UNIQ_B9AC5BCEC05FB297` (`confirmation_token`),
  KEY `IDX_B9AC5BCE19E9AC5F` (`supervisor_id`),
  CONSTRAINT `FK_B9AC5BCE19E9AC5F` FOREIGN KEY (`supervisor_id`) REFERENCES `kimai2_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_users`
--

LOCK TABLES `kimai2_users` WRITE;
/*!40000 ALTER TABLE `kimai2_users` DISABLE KEYS */;
INSERT INTO `kimai2_users` VALUES (1,'admin','admin@localhost.dev','$2y$13$3JU78/0yIdXrsSNWcAQExur68fpweYZhx89AMpAo1pLVqsaUyyhUK',NULL,1,'2025-09-16 18:09:02',NULL,NULL,'a:1:{i:0;s:16:\"ROLE_SUPER_ADMIN\";}','2025-09-16 18:10:28',NULL,NULL,NULL,'kimai',NULL,NULL,NULL,0,0,NULL);
/*!40000 ALTER TABLE `kimai2_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_users_teams`
--

DROP TABLE IF EXISTS `kimai2_users_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_users_teams` (
  `user_id` int NOT NULL,
  `team_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `teamlead` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_B5E92CF8A76ED395296CD8AE` (`user_id`,`team_id`),
  KEY `IDX_B5E92CF8A76ED395` (`user_id`),
  KEY `IDX_B5E92CF8296CD8AE` (`team_id`),
  CONSTRAINT `FK_B5E92CF8296CD8AE` FOREIGN KEY (`team_id`) REFERENCES `kimai2_teams` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_B5E92CF8A76ED395` FOREIGN KEY (`user_id`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_users_teams`
--

LOCK TABLES `kimai2_users_teams` WRITE;
/*!40000 ALTER TABLE `kimai2_users_teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_users_teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kimai2_working_times`
--

DROP TABLE IF EXISTS `kimai2_working_times`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kimai2_working_times` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `approved_by` int DEFAULT NULL,
  `date` date NOT NULL,
  `expected` int NOT NULL,
  `actual` int NOT NULL,
  `approved_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_F95E4933A76ED395AA9E377A` (`user_id`,`date`),
  KEY `IDX_F95E4933A76ED395` (`user_id`),
  KEY `IDX_F95E49334EA3CB3D` (`approved_by`),
  CONSTRAINT `FK_F95E49334EA3CB3D` FOREIGN KEY (`approved_by`) REFERENCES `kimai2_users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_F95E4933A76ED395` FOREIGN KEY (`user_id`) REFERENCES `kimai2_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kimai2_working_times`
--

LOCK TABLES `kimai2_working_times` WRITE;
/*!40000 ALTER TABLE `kimai2_working_times` DISABLE KEYS */;
/*!40000 ALTER TABLE `kimai2_working_times` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migration_versions`
--

DROP TABLE IF EXISTS `migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration_versions`
--

LOCK TABLES `migration_versions` WRITE;
/*!40000 ALTER TABLE `migration_versions` DISABLE KEYS */;
INSERT INTO `migration_versions` VALUES ('DoctrineMigrations\\Version20180701120000','2025-09-16 18:08:49',129),('DoctrineMigrations\\Version20180715160326','2025-09-16 18:08:49',104),('DoctrineMigrations\\Version20180730044139','2025-09-16 18:08:50',17),('DoctrineMigrations\\Version20180805183527','2025-09-16 18:08:50',24),('DoctrineMigrations\\Version20180903202256','2025-09-16 18:08:50',25),('DoctrineMigrations\\Version20180905190737','2025-09-16 18:08:50',104),('DoctrineMigrations\\Version20180924111853','2025-09-16 18:08:50',13),('DoctrineMigrations\\Version20181031220003','2025-09-16 18:08:50',127),('DoctrineMigrations\\Version20190124004014','2025-09-16 18:08:50',23),('DoctrineMigrations\\Version20190201150324','2025-09-16 18:08:50',16),('DoctrineMigrations\\Version20190219200020','2025-09-16 18:08:50',0),('DoctrineMigrations\\Version20190305152308','2025-09-16 18:08:50',64),('DoctrineMigrations\\Version20190321181243','2025-09-16 18:08:50',8),('DoctrineMigrations\\Version20190502161758','2025-09-16 18:08:50',63),('DoctrineMigrations\\Version20190510205245','2025-09-16 18:08:50',29),('DoctrineMigrations\\Version20190605171157','2025-09-16 18:08:50',67),('DoctrineMigrations\\Version20190617100845','2025-09-16 18:08:50',127),('DoctrineMigrations\\Version20190706224211','2025-09-16 18:08:50',75),('DoctrineMigrations\\Version20190706224219','2025-09-16 18:08:50',86),('DoctrineMigrations\\Version20190729162655','2025-09-16 18:08:50',232),('DoctrineMigrations\\Version20190730123324','2025-09-16 18:08:51',250),('DoctrineMigrations\\Version20190813162649','2025-09-16 18:08:51',37),('DoctrineMigrations\\Version20191024100951','2025-09-16 18:08:51',40),('DoctrineMigrations\\Version20191108151534','2025-09-16 18:08:51',53),('DoctrineMigrations\\Version20191113132640','2025-09-16 18:08:51',14),('DoctrineMigrations\\Version20191116110124','2025-09-16 18:08:51',45),('DoctrineMigrations\\Version20191204120823','2025-09-16 18:08:51',38),('DoctrineMigrations\\Version20200109102138','2025-09-16 18:08:51',119),('DoctrineMigrations\\Version20200125123942','2025-09-16 18:08:51',45),('DoctrineMigrations\\Version20200204124425','2025-09-16 18:08:51',31),('DoctrineMigrations\\Version20200205115243','2025-09-16 18:08:51',235),('DoctrineMigrations\\Version20200205115244','2025-09-16 18:08:52',89),('DoctrineMigrations\\Version20200308171950','2025-09-16 18:08:52',161),('DoctrineMigrations\\Version20200323163038','2025-09-16 18:08:52',92),('DoctrineMigrations\\Version20200323163039','2025-09-16 18:08:52',0),('DoctrineMigrations\\Version20200413133226','2025-09-16 18:08:52',28),('DoctrineMigrations\\Version20200524142042','2025-09-16 18:08:52',21),('DoctrineMigrations\\Version20200705152310','2025-09-16 18:08:52',43),('DoctrineMigrations\\Version20200725213424','2025-09-16 18:08:52',52),('DoctrineMigrations\\Version20210316224358','2025-09-16 18:08:52',41),('DoctrineMigrations\\Version20210320162820','2025-09-16 18:08:52',45),('DoctrineMigrations\\Version20210405105611','2025-09-16 18:08:52',16),('DoctrineMigrations\\Version20210605154245','2025-09-16 18:08:52',64),('DoctrineMigrations\\Version20210704111542','2025-09-16 18:08:52',51),('DoctrineMigrations\\Version20210717211144','2025-09-16 18:08:52',43),('DoctrineMigrations\\Version20210719123928','2025-09-16 18:08:52',106),('DoctrineMigrations\\Version20210727104955','2025-09-16 18:08:52',75),('DoctrineMigrations\\Version20210802152259','2025-09-16 18:08:52',54),('DoctrineMigrations\\Version20210802152814','2025-09-16 18:08:53',8),('DoctrineMigrations\\Version20210802160837','2025-09-16 18:08:53',54),('DoctrineMigrations\\Version20210802174318','2025-09-16 18:08:53',36),('DoctrineMigrations\\Version20210802174319','2025-09-16 18:08:53',0),('DoctrineMigrations\\Version20210802174320','2025-09-16 18:08:53',34),('DoctrineMigrations\\Version20211008092010','2025-09-16 18:08:53',14),('DoctrineMigrations\\Version20211230163612','2025-09-16 18:08:53',31),('DoctrineMigrations\\Version20220101204501','2025-09-16 18:08:53',39),('DoctrineMigrations\\Version20220315224645','2025-09-16 18:08:53',78),('DoctrineMigrations\\Version20220404150236','2025-09-16 18:08:53',35),('DoctrineMigrations\\Version20220531145920','2025-09-16 18:08:53',57),('DoctrineMigrations\\Version20220722125847','2025-09-16 18:08:53',63),('DoctrineMigrations\\Version20230126002049','2025-09-16 18:08:53',128),('DoctrineMigrations\\Version20230126002050','2025-09-16 18:08:53',36),('DoctrineMigrations\\Version20230327143628','2025-09-16 18:08:53',63),('DoctrineMigrations\\Version20230606125948','2025-09-16 18:08:53',30),('DoctrineMigrations\\Version20230819090536','2025-09-16 18:08:53',93),('DoctrineMigrations\\Version20231130000719','2025-09-16 18:08:53',1),('DoctrineMigrations\\Version20240214061246','2025-09-16 18:08:53',44),('DoctrineMigrations\\Version20240326125247','2025-09-16 18:08:53',39),('DoctrineMigrations\\Version20240920105524','2025-09-16 18:08:54',1),('DoctrineMigrations\\Version20240926111739','2025-09-16 18:08:54',91),('DoctrineMigrations\\Version20250608143244','2025-09-16 18:08:54',25);
/*!40000 ALTER TABLE `migration_versions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-16 18:21:07
