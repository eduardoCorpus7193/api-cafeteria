
# api-cafeteria

Final project of the courses Applied Data Structures and Service-Oriented Web Applications.

Generete Data Base
`
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cafeteria
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cafeteria
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cafeteria` DEFAULT CHARACTER SET utf8 ;
USE `cafeteria` ;

-- -----------------------------------------------------
-- Table `cafeteria`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`category` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(128) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `uodated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`menuItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`menuItems` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(128) NOT NULL,
  `price` INT UNSIGNED NOT NULL,
  `size` VARCHAR(45) NULL,
  `categoryId` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `item_category_id_idx` (`categoryId` ASC) VISIBLE,
  CONSTRAINT `item_category_id`
    FOREIGN KEY (`categoryId`)
    REFERENCES `cafeteria`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`orders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `totalAmount` INT UNSIGNED NOT NULL,
  `clientName` VARCHAR(45) NULL,
  `orderStatus` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`orderItems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`orderItems` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `orderId` INT UNSIGNED NULL,
  `itemId` INT UNSIGNED NULL,
  `quantity` INT UNSIGNED NULL,
  `subtotal` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `orderItems_orders_id_idx` (`orderId` ASC) VISIBLE,
  INDEX `orderItems_menuItems_id_idx` (`itemId` ASC) VISIBLE,
  CONSTRAINT `orderItems_orders_id`
    FOREIGN KEY (`orderId`)
    REFERENCES `cafeteria`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `orderItems_menuItems_id`
    FOREIGN KEY (`itemId`)
    REFERENCES `cafeteria`.`menuItems` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`employees` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `RFC` VARCHAR(13) NULL,
  `position` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`inventory` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `itemId` INT UNSIGNED NULL,
  `quantity` INT UNSIGNED NULL,
  `unit` VARCHAR(45) NULL,
  `expiryDate` DATE NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `inventory_menuItems_itemId_idx` (`itemId` ASC) VISIBLE,
  CONSTRAINT `inventory_menuItems_itemId`
    FOREIGN KEY (`itemId`)
    REFERENCES `cafeteria`.`menuItems` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cafeteria`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cafeteria`.`feedback` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `feedbackText` VARCHAR(128) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

`