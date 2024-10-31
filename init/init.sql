CREATE DATABASE IF NOT EXISTS db_maria;

USE db_maria;

CREATE TABLE IF NOT EXISTS user_model (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS file_data_model (
    id INT AUTO_INCREMENT PRIMARY KEY,
    originalName VARCHAR(255) NOT NULL,
    size BIGINT NOT NULL,
    encoding VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_model(id) ON DELETE CASCADE
);