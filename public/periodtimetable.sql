-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 09, 2018 at 07:27 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smsm23`
--

-- --------------------------------------------------------

--
-- Table structure for table `periodtimetable`
--

DROP TABLE IF EXISTS `periodtimetable`;
CREATE TABLE IF NOT EXISTS `periodtimetable` (
  `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `PeriodsId` int(10) UNSIGNED NOT NULL,
  `IsBreak` tinyint(1) DEFAULT NULL,
  `Starttiming` time NOT NULL,
  `Endtiming` time NOT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUser_Id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `periodtimetable_periodsid_foreign` (`PeriodsId`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `periodtimetable`
--

INSERT INTO `periodtimetable` (`Id`, `PeriodsId`, `IsBreak`, `Starttiming`, `Endtiming`, `IsActive`, `ModifiedUser_Id`, `created_at`, `updated_at`) VALUES
(1, 3, 1, '11:00:00', '11:15:00', 1, NULL, NULL, NULL),
(2, 1, NULL, '09:30:00', '10:15:00', 1, NULL, NULL, NULL),
(3, 2, NULL, '10:15:00', '11:00:00', 1, NULL, NULL, NULL),
(4, 4, NULL, '11:15:00', '12:00:00', 1, NULL, NULL, NULL),
(5, 5, NULL, '12:00:00', '12:45:00', 1, NULL, NULL, NULL),
(6, 6, 1, '12:45:00', '01:30:00', 1, NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
