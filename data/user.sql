CREATE DATABASE ispring_practice;

USE ispring_practice;

CREATE TABLE user
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (username)
);