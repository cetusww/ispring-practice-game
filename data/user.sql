CREATE DATABASE ispring_practice;

USE ispring_practice;

CREATE TABLE user
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    level int DEFAULT NULL,
    score_1 int DEFAULT NULL,
    score_2 int DEFAULT NULL,
    score_3 int DEFAULT NULL,
    UNIQUE (username)
);