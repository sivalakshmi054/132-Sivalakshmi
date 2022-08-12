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
-- Table structure for table `periodmaster`
--

DROP TABLE IF EXISTS `periodmaster`;
CREATE TABLE IF NOT EXISTS `periodmaster` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `PeriodName` varchar(50) NOT NULL,
  `Description` varchar(250) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `periodmaster`
--

INSERT INTO `periodmaster` (`Id`, `PeriodName`, `Description`) VALUES
(1, '1', ''),
(2, '2', ''),
(3, 'Morning Break', ''),
(4, '3', ''),
(5, '4', ''),
(6, 'Lunch Hour', ''),
(7, '5', ''),
(8, '6', ''),
(9, 'Evening Break', ''),
(10, '7', ''),
(11, '8', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
