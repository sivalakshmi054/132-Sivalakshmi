-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 09, 2018 at 07:33 AM
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
-- Database: `smsdb14`
--

-- --------------------------------------------------------

--
-- Table structure for table `examtimetable`
--

DROP TABLE IF EXISTS `examtimetable`;
CREATE TABLE IF NOT EXISTS `examtimetable` (
  `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `AcademicYearId` int(10) UNSIGNED NOT NULL,
  `CourseId` int(10) UNSIGNED NOT NULL,
  `ExaminationId` int(10) UNSIGNED NOT NULL,
  `SubjectId` int(10) UNSIGNED NOT NULL,
  `ExaminationDate` date NOT NULL,
  `Remarks` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `examtimetable_academicyearid_foreign` (`AcademicYearId`),
  KEY `examtimetable_courseid_foreign` (`CourseId`),
  KEY `examtimetable_examinationid_foreign` (`ExaminationId`),
  KEY `examtimetable_subjectid_foreign` (`SubjectId`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `examtimetable`
--

INSERT INTO `examtimetable` (`Id`, `AcademicYearId`, `CourseId`, `ExaminationId`, `SubjectId`, `ExaminationDate`, `Remarks`, `StartTime`, `EndTime`, `IsActive`, `created_at`, `updated_at`) VALUES
(1, 2, 2, 2, 1, '2018-04-11', 'fd', NULL, NULL, 1, NULL, NULL),
(2, 1, 2, 1, 2, '2018-04-25', 'rytgryt', '11:15:00', '12:00:00', 1, NULL, NULL),
(3, 5, 2, 1, 2, '2018-04-04', 'ghhgh', '11:05:00', '11:15:00', 1, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
