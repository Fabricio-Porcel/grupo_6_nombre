-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: grupo_6_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Accesorios','/img/categories/accesorio.jpg'),(2,'Indumentaria','/img/categories/indumentaria.jpg'),(3,'Tecnología','/img/categories/tecnologia.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colour_product`
--

DROP TABLE IF EXISTS `colour_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colour_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `colour_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `colour_id` (`colour_id`),
  CONSTRAINT `colour_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `colour_product_ibfk_2` FOREIGN KEY (`colour_id`) REFERENCES `colours` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colour_product`
--

LOCK TABLES `colour_product` WRITE;
/*!40000 ALTER TABLE `colour_product` DISABLE KEYS */;
INSERT INTO `colour_product` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,4),(5,5,4),(6,6,5),(7,7,4),(8,8,4),(9,8,7),(10,9,5),(11,10,7),(12,10,8),(13,10,9),(14,10,4),(15,10,10),(16,10,5);
/*!40000 ALTER TABLE `colour_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colours`
--

DROP TABLE IF EXISTS `colours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colours` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `colour` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colours`
--

LOCK TABLES `colours` WRITE;
/*!40000 ALTER TABLE `colours` DISABLE KEYS */;
INSERT INTO `colours` VALUES (1,'celeste'),(2,'burdeos'),(3,'gris melange'),(4,'azul'),(5,'negro'),(6,'verde oliva'),(7,'rojo'),(8,'rosa coral'),(9,'verde agua'),(10,'blanco');
/*!40000 ALTER TABLE `colours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Audífonos Bluetooth','Excelente calidad de audio, compatible con video llamadas, llamadas, tiene micrófono incorporado en cada audífono, puedes usar 1 o los 2. La mejor calidad que vas a poder encontrar. (en audio, calidad de construcción, etc).Posee funciones touch en cada au','/img/products/audifonos-bluetooth-celestes.jfif',3,6299),(2,'Botella de Acero Inoxidable','Botella de acero inoxidable, apta para bebidas de cualquier tipo calientes, frías. No transmiten olor y sabor al líquido interior. Capacidad de 500ml','/img/products/botella-aceroinoxidable-burdeos.jpg',1,8990),(3,'Chomba Piqué','Chomba de punto ligero, poco ceñida y larga hasta la cintura, con mangas y cuello abierto','/img/products/chomba-gris.jpg',2,7330),(4,'Funda para Notebook','Funda notebook neoprene textil, cierre forzado con deslizador metálico','/img/products/funda-notebook-azul.jpg',1,18599),(5,'Gorra Bagaje','Incluye un bordado en frente, 100% poliester. Corte alto. Costuras al tono. Vicera curva preformada. Talles varios','/img/products/gorra-azul.png',2,23999),(6,'Kit para el mate de Jean y Cuero','Jean y cuero vacuno. Estuche cerrado. Medidas estuche cerrado 34cm x 23cm x 12 cm. Termo de litro forrado en cuero y bombilla niquelada. Lata yerbera y azucarera forrada. Mate tipo baqueta costura artesanal.','/img/products/kitmatero-jean&cuero.jpg',1,39999),(7,'Libreta de anillas con tapa de carton','Libreta de anillas con tapa de carton reciclado. 80 hojas con disposición a una raya y acabado kraft y distintivo reciclado. Medidas 14,5 x 21 x 1 | Ø | 190 gr','/img/products/libreta-tapacartonreciclado-verde.jpg',1,13200),(8,'Llavero de tela y metal','Medidas 28mm x 60mm x 6mm. Materiales metal y webbing. Personalizables, colores varios.','/img/products/llavero-tela&metal-azul.jpg',1,3450),(9,'Mini Parlante bluetooth','Parlante bluetooth. Tamaño ideal para llevar a todas partes. Posee una calidad de sonido y bajos reforzados que te van a sorprender. Incluye microfono para atender tus llamadas por sistema de manos libres. Personalizable y varios colores disponibles','/img/products/miniparlante-negro.jpg',3,17499),(10,'Taza de ceramica y base de corcho','Medidas 6cm ancho x 10,50cm de alto y peso de 310gr. Capacidad de 280ml. Colores Rojo, Marron, Blanco, Azul y Verde','/img/products/tazas-ceramica-varias.jpg',1,2350),(11,'Celular samsung','Memoria RAM: 8 GB Galaxy S23 con 256GB de almacenamiento interno y 8GB de RAM. Equipado con el último sistema operativo Android 13. Cuenta con una pantalla Dynamic AMOLED 2X de 6.1 pulgadas Full HD+. Triple cámara trasera de 50MP, 10MP y 12MP con funcione','/img/products/imagenProducto-1709238707241.jpg',3,100000),(12,'Jarros termicos','Vaso térmico con tapa de seguridad, de acero inoxidable 30de doble pared insulado. Mantiene la temperatura durante 6hs caliente y 12 hs frío,\ncapacidad de 475 litros.','/img/products/jarros-termicos.jpg',1,15000),(13,'Lapiceras','Un modelo clásico y minimalista con cuerpo y terminales de acero inoxidable. Lapicera personalizable','/img/products/lapiceras-tpuch.jpg',1,8520),(14,'Chaleco Corporativo','Chaleco tipo campera, ultraliviano, de pluma sintética, unisex. Varios talles','/img/products/chaleco-corporativo-azul.jpg',2,65000),(15,'Chaleco Corporativo','Chaleco tipo campera, ultraliviano, de pluma sintética, unisex. Varios talles','/img/products/chaleco-corporativo-rojo.jpg',2,65000),(16,'Chaleco Polar','Fabricado en polar de alta calidad, con tratamiento antipilling que mantiene por más tiempo el aspecto original de la prenda, evitando la formación de imperfecciones. \nCuenta con dos bolsillos laterales y cuello alzado que proporciona protección y comodid','/img/products/chaleco-polar-azul.jpg',2,39950),(17,'Chaleco Polar','Fabricado en polar de alta calidad, con tratamiento antipilling que mantiene por más tiempo el aspecto original de la prenda, evitando la formación de imperfecciones. \nCuenta con dos bolsillos laterales y cuello alzado que proporciona protección y comodid','/img/products/chaleco-polar-gris.jpg',2,39950),(18,'Chomba micro pique','Calidad Premium Garantizada, costuras Reforzadas.No se encoge, no destiñe. Modelo Unisex, varios talles.','/img/products/chomba-negra.jpg',2,10000),(19,'Gorra','Gorro de 5 paneles en Polyester. Parte trasera con tela red. Diámetro 56 cm. Ajuste con broche plástico. Modelo Unisex.','/img/products/gorra-trucker.jpg',2,23999),(20,'Auriculares inalambricos tipo vincha','Auriculares Inalámbricos Bluetooth 5.0., calidad de sonido superior que fusionan un diseño atractivo con un rendimiento avanzado. \nCon controles integrados, gestiona tu música y llamadas de manera sencilla sin necesidad de acceder a tu dispositivo, brindá','/img/products/auriculares-inalambricos.jpg',3,13799),(21,'Auriculares inalambricos inpods','Excelente calidad de audio, compatible con video llamadas, llamadas, tiene micrófono incorporado en cada\n audífono, puedes usar 1 o los 2. La mejor calidad que vas a poder encontrar. (en audio, calidad de construcción, etc),Posee funciones touch en cada a','/img/products/auriculares-inpods-bluetooth.jpg',3,6299),(22,'Tablet','Memoria RAM: 4 GB. Tamaño de la pantalla: 10. Capacidad: 64 GB Sistema operativo: Android 11. Con lector micro-SD. Cuenta con GPS','/img/products/tablet-oscura.jpg',3,6299);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `phoneNumber` int(11) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `phoneNumber_UNIQUE` (`phoneNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'danielasantini15@hotmail.com','123456D*','Daniela','Santini','Argentina','San Nicolas',336433116,'/img/users/avatar-1708999371442.jpg'),(2,'caro.gonzalezp@hotmail.com','123456C*','Carolina','Gonzalez Portiglia','Argentina','Cordoba',1168266106,'/img/users/avatar-1710261030884.jpg'),(3,'roman.ullua55@gmail.com','123456R*','Roman','Ullua','Argentina','Santa Fe',231231,'/img/users/avatar-1710545745983.jpg'),(4,'matigonzalez@hotmail.com','$2a$10$YLsVjnCqBgJ0X5of3dY4s.oP5duQoorAuyOYgwnVsUhwsebtmsMWm','matias','gonzalez','Argentina','Buenos Aires',12345678,'avatar-1711918932933.jpg');
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

-- Dump completed on 2024-04-07 20:38:18
