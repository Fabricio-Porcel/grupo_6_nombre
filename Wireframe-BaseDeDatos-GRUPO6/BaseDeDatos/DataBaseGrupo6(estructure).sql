-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS Grupo_6_DB DEFAULT CHARACTER SET utf8mb4;

-- Cambiamos al contexto de la base de datos creada
USE Grupo_6_DB;

-- Tabla categories
CREATE TABLE IF NOT EXISTS categories (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla colours
CREATE TABLE IF NOT EXISTS colours (
    id INT NOT NULL AUTO_INCREMENT,
    colour VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Tabla products
CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    image VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabla users
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    phoneNumber INT NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    UNIQUE INDEX email_UNIQUE (email),
    UNIQUE INDEX phoneNumber_UNIQUE (phoneNumber),
    PRIMARY KEY (id)
);

-- Tabla intermedia colour_product
CREATE TABLE IF NOT EXISTS colour_product (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    colour_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (colour_id) REFERENCES colours(id)
);
