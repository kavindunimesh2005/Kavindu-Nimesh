-- ==========================================================
-- Database Schema for Kavindu Nimesh Portfolio & CMS
-- Aura Digital Developer Sri Lanka
-- ==========================================================

CREATE DATABASE IF NOT EXISTS `kavindu_portfolio` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `kavindu_portfolio`;

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(100) NOT NULL DEFAULT 'Kavindu Nimesh',
  `role` VARCHAR(50) NOT NULL DEFAULT 'superadmin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. About & Statistics Table
CREATE TABLE IF NOT EXISTS `about` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL DEFAULT 'Kavindu Nimesh',
  `title` VARCHAR(255) NOT NULL DEFAULT 'Software Engineer & Web Developer',
  `company` VARCHAR(255) NOT NULL DEFAULT 'Aura Digital Developer Sri Lanka',
  `bio` TEXT NOT NULL,
  `secondary_bio` TEXT,
  `years_experience` INT NOT NULL DEFAULT 3,
  `projects_count` INT NOT NULL DEFAULT 25,
  `clients_count` INT NOT NULL DEFAULT 20,
  `tech_count` INT NOT NULL DEFAULT 18,
  `portrait_url` VARCHAR(500) DEFAULT '/uploads/kavindu-portrait.jpg',
  `resume_url` VARCHAR(500) DEFAULT '/uploads/Kavindu_Nimesh_Resume.pdf',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL DEFAULT 'Web Application',
  `client` VARCHAR(150) DEFAULT 'Confidential Client',
  `industry` VARCHAR(150) DEFAULT 'Technology',
  `year` VARCHAR(20) DEFAULT '2025',
  `timeline` VARCHAR(100) DEFAULT '8 Weeks',
  `short_description` VARCHAR(500) NOT NULL,
  `full_description` LONGTEXT,
  `challenge` LONGTEXT,
  `solution` LONGTEXT,
  `features` JSON,
  `technologies` JSON,
  `live_url` VARCHAR(500),
  `github_url` VARCHAR(500),
  `image_url` VARCHAR(500) NOT NULL,
  `gallery` JSON,
  `results` VARCHAR(500),
  `client_feedback` TEXT,
  `is_featured` TINYINT(1) DEFAULT 1,
  `is_published` TINYINT(1) DEFAULT 1,
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Services Table
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `service_number` VARCHAR(10) NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `icon` VARCHAR(50) NOT NULL DEFAULT 'Code2',
  `description` TEXT NOT NULL,
  `technologies` JSON,
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Skills Table
CREATE TABLE IF NOT EXISTS `skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `category` ENUM('Frontend', 'Backend', 'Database', 'Tools', 'Design') NOT NULL,
  `icon` VARCHAR(50) DEFAULT 'Code',
  `proficiency` INT DEFAULT 90,
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Experience Timeline Table
CREATE TABLE IF NOT EXISTS `experiences` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `company` VARCHAR(200) NOT NULL,
  `position` VARCHAR(200) NOT NULL,
  `period` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `technologies` JSON,
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Testimonials Table
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `client_name` VARCHAR(150) NOT NULL,
  `position` VARCHAR(150),
  `company` VARCHAR(150),
  `avatar_url` VARCHAR(500),
  `rating` INT DEFAULT 5,
  `quote` TEXT NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `display_order` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Social Links Table
CREATE TABLE IF NOT EXISTS `social_links` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `platform` VARCHAR(50) NOT NULL UNIQUE,
  `title` VARCHAR(100) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `icon` VARCHAR(50) NOT NULL,
  `display_order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Contact Messages Table
CREATE TABLE IF NOT EXISTS `messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `phone` VARCHAR(50),
  `project_type` VARCHAR(100),
  `budget` VARCHAR(100),
  `message` TEXT NOT NULL,
  `is_read` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Site Settings Table
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(100) NOT NULL UNIQUE,
  `setting_value` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
