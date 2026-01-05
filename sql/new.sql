-- Create database
CREATE DATABASE IF NOT EXISTS eitech_db;
USE eitech_db;

-----------------------------------------------------
-- 1. USERS TABLE (For Admin Login)
-----------------------------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-----------------------------------------------------
-- 2. TESTIMONIALS TABLE (User submitted reviews)
-----------------------------------------------------
CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(150),
    message TEXT NOT NULL,
    rating INT DEFAULT 5,
    status ENUM('pending', 'approved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-----------------------------------------------------
-- 3. CONTACT MESSAGES TABLE (Contact Form)
-----------------------------------------------------
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-----------------------------------------------------
-- 4. SERVICES TABLE (For dynamic service listing)
-----------------------------------------------------
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(150),  
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-----------------------------------------------------
-- 5. PROJECTS TABLE (Portfolio Projects)
-----------------------------------------------------
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-----------------------------------------------------
-- 6. PROJECTS TABLE (case  studies)
-----------------------------------------------------
CREATE TABLE case_studies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    tag TEXT NOT NULL,
    description TEXT NOT NULL,
    image json ,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-----------------------------------------------------
-- 7. TEAM  TABLE ( team )
-----------------------------------------------------
CREATE TABLE team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    position VARCHAR(150) NOT NULL,
    image JSON NULL,
    links JSON NULL,    
     
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-----------------------------------------------------
-- 8. BLOG  TABLE ( blog )
-----------------------------------------------------
CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150) DEFAULT 'Admin',
    content LONGTEXT NOT NULL,
    tags JSON NULL,
    images JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-----------------------------------------------------
-- 9. BLOG COMMENT  TABLE ( blog comment )
-----------------------------------------------------
CREATE TABLE blog_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blog_id INT NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE
);


-----------------------------------------------------
-- 10. BLOG COMMENT  TABLE ( blog comment )
-----------------------------------------------------
CREATE TABLE blog_comment_replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    comment_id INT NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (comment_id) REFERENCES blog_comments(id) ON DELETE CASCADE
);

-----------------------------------------------------
-- 11. Faqs  TABLE ( FAQ )
-----------------------------------------------------
CREATE TABLE faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
