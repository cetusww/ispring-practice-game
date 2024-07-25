CREATE DATABASE ispring_practice;

USE ispring_practice;

CREATE TABLE user
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    level int DEFAULT 0,
    score_1 int DEFAULT 0,
    score_2 int DEFAULT 0,
    score_3 int DEFAULT 0,
    multiplayer_all int DEFAULT 0,
    multiplayer_win int DEFAULT 0,
    time_1 float DEFAULT 0,
    time_2 float DEFAULT 0,
    time_3 float DEFAULT 0,
    UNIQUE (username)
);