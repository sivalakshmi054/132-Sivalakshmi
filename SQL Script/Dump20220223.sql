-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: oems
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `academicyearmaster`
--

DROP TABLE IF EXISTS `academicyearmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academicyearmaster` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(20) DEFAULT NULL,
  `AcademicYear` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `FromYearId` int(10) unsigned NOT NULL,
  `ToYearId` int(10) unsigned NOT NULL,
  `FromMonthId` int(10) DEFAULT NULL,
  `ToMonthId` int(10) DEFAULT NULL,
  `FromDate` date DEFAULT NULL,
  `ToDate` date DEFAULT NULL,
  `Description` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Status` tinyint(1) DEFAULT NULL,
  `AcademicFlag` int(11) DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUser_Id` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `academicyear_fromyearid_foreign` (`FromYearId`),
  KEY `academicyear_toyearid_foreign` (`ToYearId`),
  KEY `fk_l_id` (`FromMonthId`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academicyearmaster`
--

LOCK TABLES `academicyearmaster` WRITE;
/*!40000 ALTER TABLE `academicyearmaster` DISABLE KEYS */;
INSERT INTO `academicyearmaster` VALUES (15,1,'2019-2020',1,2,NULL,NULL,NULL,NULL,'academic year',0,1,1,1,NULL,NULL);
/*!40000 ALTER TABLE `academicyearmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appconfiguration`
--

DROP TABLE IF EXISTS `appconfiguration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appconfiguration` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `value` varchar(10) NOT NULL,
  `Remarks` varchar(250) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appconfiguration`
--

LOCK TABLES `appconfiguration` WRITE;
/*!40000 ALTER TABLE `appconfiguration` DISABLE KEYS */;
INSERT INTO `appconfiguration` VALUES (1,'SuperAdminCheck','1',' 0 - Required(Login Time Restrictions applicable for Super Admin), 1 - Not Required(No Login Time Restrictions for Super Admin)'),(2,'LeaveRequest_Session','2','value is 2 (Required first session and second session), value is 4 (Required first session, second session ,Third session and Fourth session) ');
/*!40000 ALTER TABLE `appconfiguration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bankmaster`
--

DROP TABLE IF EXISTS `bankmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bankmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `BankName` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `BankName` (`BankName`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bankmaster`
--

LOCK TABLES `bankmaster` WRITE;
/*!40000 ALTER TABLE `bankmaster` DISABLE KEYS */;
INSERT INTO `bankmaster` VALUES (1,2,'Karur Vysya Bank',NULL,1,1,'2018-11-27 09:08:58'),(2,2,'State Bank Of India',NULL,1,1,'2018-11-27 09:09:16'),(3,2,'Indian Bank',NULL,1,1,'2018-11-27 09:09:30'),(4,2,'Canara Bank',NULL,1,1,'2018-11-27 09:09:40'),(5,2,'IDBI Bank',NULL,0,1,'2018-11-27 09:10:16'),(6,2,'IDBI','sdasd',1,1,'2019-03-16 13:15:46'),(7,1,'654678798',NULL,1,1,'2019-08-05 11:52:36'),(8,1,'sadsadsada',NULL,1,1,'2019-08-05 13:54:14'),(9,1,'KVB',NULL,1,1,'2019-08-06 11:01:02'),(10,1,'0',NULL,1,1,'2019-08-08 12:55:54'),(11,1,'',NULL,1,1,'2019-08-22 13:11:37');
/*!40000 ALTER TABLE `bankmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bloodgroupmaster`
--

DROP TABLE IF EXISTS `bloodgroupmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bloodgroupmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `BloodGroup` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `BloodGroup` (`BloodGroup`),
  KEY `School_Id` (`School_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bloodgroupmaster`
--

LOCK TABLES `bloodgroupmaster` WRITE;
/*!40000 ALTER TABLE `bloodgroupmaster` DISABLE KEYS */;
INSERT INTO `bloodgroupmaster` VALUES (1,2,'A+',NULL,1,1,'2018-11-26 10:27:57'),(2,2,'A-',NULL,1,1,'2018-11-26 10:28:09'),(3,2,'B+',NULL,1,1,'2018-11-26 10:28:32'),(4,2,'B-',NULL,1,1,'2018-11-26 10:28:40'),(5,2,'O+',NULL,1,1,'2018-11-26 10:28:51'),(6,2,'O-',NULL,1,1,'2018-11-26 10:29:02'),(7,2,'AB+',NULL,1,1,'2018-11-26 10:30:19'),(8,2,'AB-',NULL,0,1,'2018-11-26 10:30:26'),(9,1,'Telungu',NULL,1,1,'2019-08-02 11:10:38'),(10,1,'B',NULL,1,1,'2019-08-05 11:26:19'),(11,1,'0',NULL,1,1,'2019-08-08 12:40:59'),(12,1,'',NULL,1,1,'2019-08-22 13:11:37');
/*!40000 ALTER TABLE `bloodgroupmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branchmaster`
--

DROP TABLE IF EXISTS `branchmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branchmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `BranchName` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `BranchName` (`BranchName`),
  KEY `School_Id` (`School_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchmaster`
--

LOCK TABLES `branchmaster` WRITE;
/*!40000 ALTER TABLE `branchmaster` DISABLE KEYS */;
INSERT INTO `branchmaster` VALUES (1,2,'Udumalpet',NULL,1,1,'2018-11-27 09:10:40'),(2,2,'100 Feet Road, Coimbatore',NULL,1,1,'2018-11-27 09:10:48'),(3,2,'Karur',NULL,1,1,'2018-11-27 09:11:09'),(4,2,'Gandhi Puram, Coimbatore',NULL,1,1,'2018-11-27 09:11:21'),(5,2,'Ramaswamy Nagar, Udumalpet',NULL,0,1,'2018-11-27 09:12:12'),(6,1,'sadsadsada',NULL,1,1,'2019-08-05 11:52:36'),(7,1,'sdfsdfsdf',NULL,1,1,'2019-08-05 13:54:14'),(8,1,'0',NULL,1,1,'2019-08-08 12:55:55'),(9,1,'',NULL,1,1,'2019-08-22 13:11:37');
/*!40000 ALTER TABLE `branchmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `castemaster`
--

DROP TABLE IF EXISTS `castemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `castemaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `CasteName` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `CasteName` (`CasteName`),
  KEY `School_Id` (`School_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `castemaster`
--

LOCK TABLES `castemaster` WRITE;
/*!40000 ALTER TABLE `castemaster` DISABLE KEYS */;
INSERT INTO `castemaster` VALUES (1,1,'Caste A',NULL,1,1,'2018-11-26 10:31:42'),(2,1,'Caste B',NULL,1,1,'2018-11-26 10:31:54'),(3,1,'Caste C',NULL,1,1,'2018-11-26 10:32:04'),(4,1,'Caste D',NULL,1,1,'2018-11-26 10:32:13'),(5,1,'Caste F',NULL,0,1,'2018-11-26 10:32:24'),(6,1,'caste E',NULL,1,1,'2019-07-22 13:38:42'),(7,2,'Hindu',NULL,1,1,'2019-08-02 11:10:38'),(8,2,'Naicker',NULL,1,1,'2019-08-02 11:13:29'),(9,2,'mbc',NULL,1,1,'2019-08-05 19:05:28'),(10,1,'Caste 0',NULL,1,1,'2019-08-08 12:17:20'),(11,1,'empty caste',NULL,1,1,'2019-08-22 13:11:36');
/*!40000 ALTER TABLE `castemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(50) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Student',NULL,1,1,'2018-11-27 09:13:16'),(2,'Staff',NULL,1,1,'2018-11-27 09:13:26'),(3,'Staff Admin',NULL,1,1,'2018-11-27 09:13:36'),(4,'Office Staff',NULL,1,1,'2018-11-27 09:13:49'),(5,'Head Master',NULL,1,1,'2018-11-27 09:14:06');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorymaster`
--

DROP TABLE IF EXISTS `categorymaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorymaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `CategoryName` (`CategoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorymaster`
--

LOCK TABLES `categorymaster` WRITE;
/*!40000 ALTER TABLE `categorymaster` DISABLE KEYS */;
INSERT INTO `categorymaster` VALUES (1,'UR',NULL,1,1,'2018-11-26 10:31:42'),(2,'R',NULL,1,1,'2018-11-26 10:31:54');
/*!40000 ALTER TABLE `categorymaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classtimetablechild`
--

DROP TABLE IF EXISTS `classtimetablechild`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classtimetablechild` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(20) DEFAULT NULL,
  `ClassTimeTableId` int(11) DEFAULT NULL,
  `PeriodId` int(10) unsigned DEFAULT NULL,
  `DayId` int(10) DEFAULT NULL,
  `SubjectId` int(11) DEFAULT NULL,
  `StaffId` int(11) DEFAULT NULL,
  `IsActive` int(10) NOT NULL DEFAULT '1',
  `ModifiedUser_Id` int(10) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `classtimetablechild_periodid_foreign` (`PeriodId`),
  KEY `classtimetablechild_subjectid_foreign` (`SubjectId`),
  KEY `classtimetablechild_staffid_foreign` (`StaffId`),
  KEY `InstitutionId` (`InstitutionId`)
) ENGINE=MyISAM AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classtimetablechild`
--

LOCK TABLES `classtimetablechild` WRITE;
/*!40000 ALTER TABLE `classtimetablechild` DISABLE KEYS */;
/*!40000 ALTER TABLE `classtimetablechild` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commontable`
--

DROP TABLE IF EXISTS `commontable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commontable` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `InsitutionId` int(11) DEFAULT NULL,
  `DBTableName` varchar(100) NOT NULL,
  `UITableName` varchar(100) NOT NULL,
  `Active` int(11) DEFAULT '1',
  `ActiveColumn` varchar(100) DEFAULT 'IsActive',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `DBTableName` (`DBTableName`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commontable`
--

LOCK TABLES `commontable` WRITE;
/*!40000 ALTER TABLE `commontable` DISABLE KEYS */;
INSERT INTO `commontable` VALUES (1,0,'CountryMaster','Country Details',1,'IsActive'),(2,0,'StateMaster','State Details',1,'IsActive'),(3,0,'LocationMaster','Location Details',1,'IsActive'),(4,0,'SourceMaster','Source Details',1,'IsActive'),(9,0,'GenderMaster','Gender Details',1,'IsActive'),(10,0,'CourseMaster','Course Details',1,'IsActive'),(11,0,'MediumMasters','Medium Details',1,'IsActive'),(12,0,'Category','Category Details',1,'IsActive'),(14,0,'TransactionMaster','Transaction Details',1,'IsActive'),(15,0,'DepartmentMaster','Department Details',1,'IsActive'),(16,0,'EmployeeGrade','Grade Details',1,'IsActive'),(17,0,'DesignationMaster','Designation',1,'IsActive'),(18,0,'SpecificationMaster','Specification',1,'IsActive'),(19,0,'StatusMaster','Status',1,'IsActive'),(21,0,'EmployeeTypeMaster','EmployeeType',1,'IsActive'),(22,0,'MaritalStatusMaster','Marital Status',1,'IsActive'),(23,0,'ReligionMaster','Religion',1,'IsActive'),(24,0,'BloodGroupMaster','BloodGroup',1,'IsActive'),(25,0,'BankMaster','Bank Details',1,'IsActive'),(26,0,'BranchMaster','Branch Details',1,'IsActive'),(27,0,'AttendanceMaster','Attendance',1,'IsActive'),(28,0,'CommunityMaster','Community',1,'IsActive'),(31,0,'CasteMaster','Caste',1,'IsActive'),(32,0,'MotherTongueMaster','Mother Tongue',1,'IsActive'),(33,0,'SectionMaster','Section Details',1,'IsActive'),(34,0,'DocumentTypeMaster','Document Type',1,'IsActive'),(35,0,'AuthorizedBy','Authorized By',1,'IsActive'),(37,0,'QuestionPaperSectionMaster','Question Paper Details',1,'IsActive'),(38,0,'PaperTypeMaster','Paper Type',1,'IsActive'),(39,0,'EmailTypeMaster','Email Type',1,'IsActive'),(41,0,'SubjectType','Subject Type',1,'IsActive'),(43,0,'CommonSeparator','Separator',1,'IsActive'),(45,0,'SubjectMaster','Subject Details',1,'IsActive'),(46,0,'scholarshipmaster','Scholarship Details',1,'IsActive'),(47,0,'ScholarshipTypeMaster','Scholarship Type Details',1,'IsActive'),(54,0,'seatingcapacity','Seating Capacity Details',1,'IsActive'),(55,0,'TitleMaster','Title Details',1,'IsActive'),(56,0,'qualificationmaster','Qualification Details',1,'IsActive');
/*!40000 ALTER TABLE `commontable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commontablecolumns`
--

DROP TABLE IF EXISTS `commontablecolumns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commontablecolumns` (
  `InsitutionId` int(11) DEFAULT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CommonTable_Id` int(11) NOT NULL,
  `DBColumnName` varchar(100) NOT NULL,
  `UIColumnName` varchar(100) NOT NULL,
  `UIMaxLength` int(11) DEFAULT NULL,
  `UIMandatory` int(11) DEFAULT '0',
  `FieldType` int(11) DEFAULT '0',
  `ValidationType` int(11) DEFAULT '1',
  `ListSql` varchar(1000) DEFAULT NULL,
  `DDSql` varchar(1000) DEFAULT NULL,
  `IsPk` int(11) DEFAULT '0',
  `IsDefault` int(11) DEFAULT '0',
  `DisplayOrder` int(11) DEFAULT '0',
  `ListRequired` int(11) DEFAULT '1',
  `ListWidth` int(11) DEFAULT NULL,
  `SortingRequired` int(11) DEFAULT '1',
  `SearchColumn` int(11) DEFAULT '0',
  `IsUnique` int(11) DEFAULT NULL,
  `UniqueColumn` varchar(100) DEFAULT NULL,
  `FilterColumn` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CommonTable_Id` (`CommonTable_Id`),
  CONSTRAINT `commontablecolumns_ibfk_1` FOREIGN KEY (`CommonTable_Id`) REFERENCES `commontable` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commontablecolumns`
--

LOCK TABLES `commontablecolumns` WRITE;
/*!40000 ALTER TABLE `commontablecolumns` DISABLE KEYS */;
INSERT INTO `commontablecolumns` VALUES (0,1,1,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,2,1,'CountryName','Country Name',40,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'2',NULL),(0,3,1,'CountryCode','Country Code',20,1,1,1,NULL,NULL,0,0,3,1,30,1,0,1,'3',NULL),(0,4,2,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,5,2,'CountryId','Country',NULL,1,3,1,'select CountryName Name from CountryMaster I where I.Id = M.CountryId','select Id, CountryName Name,IsActive Active, 0 FilterId from CountryMaster order by countryname',0,0,2,1,25,1,0,NULL,NULL,NULL),(0,6,2,'StateName','State Name',100,1,1,1,NULL,NULL,0,0,3,1,25,1,0,1,'5,6',NULL),(0,7,2,'StateCode','State Code',100,1,1,1,NULL,NULL,0,0,4,1,25,1,0,1,'5,7',NULL),(0,8,3,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,9,3,'CountryId','Country',NULL,1,3,1,'select CountryName name from CountryMaster I where I.Id = M.CountryId','select Id, CountryName Name,IsActive Active, 0 FilterId from CountryMaster order by countryname',0,0,2,1,20,1,0,NULL,NULL,NULL),(0,10,3,'StateId','State',NULL,1,3,1,'select StateName name from StateMaster I where I.Id = M.StateId','select Id, StateName Name, IsActive Active, CountryId FilterId from StateMaster order by StateName',0,0,3,1,20,1,0,NULL,NULL,'CountryId'),(0,11,3,'LocationName','Location Name',100,1,1,1,NULL,NULL,0,0,4,1,20,1,0,1,'9,10,11',NULL),(0,12,3,'LocationCode','Location Code',100,1,1,1,NULL,NULL,0,0,5,1,20,1,0,1,'9,10,12',NULL),(0,13,4,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,14,4,'SourceName','Source Name',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'14',NULL),(0,15,4,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,34,9,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,35,9,'Gender','Gender',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'35',NULL),(0,36,9,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,37,10,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,38,10,'Course','Course',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'38',NULL),(0,39,10,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,40,11,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,41,11,'MediumName','Medium Name',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'41',NULL),(0,42,11,'ShortName','Short Name',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,NULL,NULL),(0,43,11,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,44,12,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,45,12,'CategoryName','Category Name',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'45',NULL),(0,46,12,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,50,14,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,51,14,'Transaction','Transaction',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'51',NULL),(0,52,14,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,53,15,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,54,15,'DepartmentName','Department',100,1,1,1,NULL,NULL,0,0,2,1,30,1,0,1,'54',NULL),(0,55,15,'DepartmentCode','Department Code',100,1,1,1,NULL,NULL,0,0,2,1,20,1,0,1,'55',NULL),(0,56,15,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,57,16,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,58,16,'GradeName','Grade',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'58',NULL),(0,59,16,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,60,17,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,61,17,'Designation','Designation',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'61',NULL),(0,62,17,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,63,18,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,64,18,'Specification','Specification',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'64',NULL),(0,65,18,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,69,19,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,70,19,'Status','Status',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'70',NULL),(0,71,19,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,75,21,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,76,21,'EmployeeType','Employee Type',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'76',NULL),(0,77,21,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,78,22,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,79,22,'MaritalStatus','Marital Status',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'79',NULL),(0,80,22,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,81,23,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,82,23,'Religion','Religion',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'82',NULL),(0,83,23,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,84,24,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,85,24,'BloodGroup','BloodGroup',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'85',NULL),(0,86,24,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,87,25,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,88,25,'BankName','Bank Name',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'88',NULL),(0,89,25,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,90,26,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,91,26,'BranchName','Branch Name',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'91',NULL),(0,93,27,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,94,27,'Attendance','Attendance',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'94',NULL),(0,95,27,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,96,28,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,97,28,'Community','Community',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'97',NULL),(0,98,28,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,105,31,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,106,31,'CasteName','Caste',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'106',NULL),(0,107,31,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,108,32,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,109,32,'MotherTongue','Mother Tongue',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'109',NULL),(0,110,32,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,111,33,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,112,33,'SectionName','Section Name',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'112',NULL),(0,113,33,'ShortName','Short Name',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,NULL,NULL),(0,114,33,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,115,34,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,116,34,'Document','Document',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'116',NULL),(0,117,34,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,118,35,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,119,35,'Name','Authorized Name',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'119',NULL),(0,120,35,'AuthorizedCode','Authorized Code',100,1,1,1,NULL,NULL,0,0,2,1,30,1,0,1,'120',NULL),(0,121,35,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,129,37,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,130,37,'QuestionpaperSection','Question paper Section',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'130',NULL),(0,131,37,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,132,38,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,133,38,'PaperType','Paper Type',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'133',NULL),(0,134,38,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,135,39,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,136,39,'EmailType','Email Type',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'136',NULL),(0,137,39,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,142,41,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,143,41,'SubjectType','Subject Type',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'143',NULL),(0,144,41,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,148,43,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,149,43,'Separator','Separator',100,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'149',NULL),(0,150,43,'Description','Description',200,0,2,1,NULL,NULL,0,0,3,1,30,1,0,0,NULL,NULL),(0,154,45,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,155,45,'SubjectName','Subject Name',40,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'155',NULL),(0,156,45,'ShortName','Short Name',40,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,NULL,NULL),(0,157,45,'Description','Description',20,0,1,1,NULL,NULL,0,0,3,1,40,1,0,1,NULL,NULL),(0,158,46,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,159,46,'ScholarshipName','Scholarship Name',40,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'159',NULL),(0,160,46,'Description','Description',250,0,1,1,NULL,NULL,0,0,3,1,30,1,0,1,NULL,NULL),(0,161,47,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,162,47,'ScholarshipType','Scholarship Type',40,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'162',NULL),(0,163,47,'Description','Description',250,0,1,1,NULL,NULL,0,0,3,1,30,1,0,1,NULL,NULL),(0,182,54,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,183,54,'SeatingCapacity','Seating Capacity',40,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'183',NULL),(0,184,54,'Description','Description',250,0,1,1,NULL,NULL,0,0,3,1,30,1,0,1,NULL,NULL),(0,185,55,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,186,55,'Title','Title',40,1,1,1,NULL,NULL,0,0,2,1,40,1,0,1,'186',NULL),(0,187,55,'Description','Description',250,0,1,1,NULL,NULL,0,0,3,1,30,1,0,1,NULL,NULL),(0,188,56,'Id','Id',NULL,1,1,0,NULL,NULL,1,1,1,0,5,1,0,NULL,NULL,NULL),(0,189,56,'Qualification','Qualification',100,1,1,1,NULL,NULL,0,0,2,1,30,1,0,1,'189',NULL),(0,190,56,'Code','Qualification Code',50,1,1,1,NULL,NULL,0,0,2,1,25,1,0,1,'190',NULL),(0,191,56,'Description','Description',250,0,1,1,NULL,NULL,0,0,3,1,30,1,0,1,NULL,NULL);
/*!40000 ALTER TABLE `commontablecolumns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `communitymaster`
--

DROP TABLE IF EXISTS `communitymaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `communitymaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `Community` varchar(50) NOT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `School_Id` (`School_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `communitymaster`
--

LOCK TABLES `communitymaster` WRITE;
/*!40000 ALTER TABLE `communitymaster` DISABLE KEYS */;
INSERT INTO `communitymaster` VALUES (1,2,'OC',NULL,1,NULL,'2018-11-26 10:32:38'),(2,2,'BC',NULL,1,NULL,'2018-11-26 10:32:46'),(3,2,'MBC',NULL,1,NULL,'2018-11-26 10:32:55'),(4,2,'General',NULL,1,NULL,'2018-11-26 10:33:07'),(5,1,'Multi','asdas',0,NULL,'2018-12-28 11:18:20'),(6,2,'Naicker',NULL,1,NULL,'2019-08-02 11:10:38'),(7,1,'nill',NULL,1,NULL,'2019-08-05 19:05:28'),(8,1,'Gounder',NULL,1,NULL,'2019-08-22 13:11:36');
/*!40000 ALTER TABLE `communitymaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countrymaster`
--

DROP TABLE IF EXISTS `countrymaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countrymaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `InsitutionId` int(11) DEFAULT NULL,
  `CountryName` varchar(100) NOT NULL,
  `CountryCode` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `CountryName` (`CountryName`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countrymaster`
--

LOCK TABLES `countrymaster` WRITE;
/*!40000 ALTER TABLE `countrymaster` DISABLE KEYS */;
INSERT INTO `countrymaster` VALUES (5,NULL,'india','india2',1,1,'2022-02-12 12:55:51'),(6,NULL,'Australia','Australia1',1,1,'2022-02-12 13:08:07');
/*!40000 ALTER TABLE `countrymaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_temp`
--

DROP TABLE IF EXISTS `course_temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_temp` (
  `txt` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_temp`
--

LOCK TABLES `course_temp` WRITE;
/*!40000 ALTER TABLE `course_temp` DISABLE KEYS */;
INSERT INTO `course_temp` VALUES ('2,3,4');
/*!40000 ALTER TABLE `course_temp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coursemaster`
--

DROP TABLE IF EXISTS `coursemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursemaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(11) NOT NULL,
  `Course` varchar(50) NOT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `InstitutionId` (`InstitutionId`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursemaster`
--

LOCK TABLES `coursemaster` WRITE;
/*!40000 ALTER TABLE `coursemaster` DISABLE KEYS */;
INSERT INTO `coursemaster` VALUES (1,1,'Course Ist Year','yes',1,NULL,'2018-11-26 09:31:36'),(2,1,'Course 2 Year',NULL,1,NULL,'2018-11-26 09:31:50'),(3,1,'Course 3 Year',NULL,1,NULL,'2018-11-26 09:32:03'),(4,1,'Course 4 Year',NULL,1,NULL,'2018-11-26 09:32:14'),(5,1,'BA',NULL,1,NULL,'2018-11-26 09:32:26'),(6,1,'Nursing 2 year',NULL,1,NULL,'2018-11-26 09:32:34'),(7,1,'Nursing 3 year',NULL,1,NULL,'2018-11-26 09:32:42'),(8,1,'Nursing 3 year',NULL,1,NULL,'2018-11-26 09:32:52'),(9,1,'Nursing 4 year',NULL,1,NULL,'2018-11-26 09:33:04'),(10,1,'IX',NULL,1,NULL,'2018-11-26 09:33:16');
/*!40000 ALTER TABLE `coursemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coursesection`
--

DROP TABLE IF EXISTS `coursesection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursesection` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(20) DEFAULT NULL,
  `AcademicYearId` int(10) unsigned NOT NULL,
  `CourseId` int(10) unsigned DEFAULT NULL,
  `SectionId` int(10) unsigned DEFAULT NULL,
  `StaffId` int(20) DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUser_Id` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `coursesection_academicyearid_foreign` (`AcademicYearId`),
  KEY `coursesection_courseid_foreign` (`CourseId`),
  KEY `coursesection_sectionid_foreign` (`SectionId`),
  KEY `fk_l_id` (`StaffId`),
  KEY `InstitutionId` (`InstitutionId`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursesection`
--

LOCK TABLES `coursesection` WRITE;
/*!40000 ALTER TABLE `coursesection` DISABLE KEYS */;
INSERT INTO `coursesection` VALUES (39,1,15,2,5,NULL,1,1,NULL,NULL),(44,1,15,2,1,NULL,1,1,NULL,NULL),(45,1,15,3,1,NULL,1,1,NULL,NULL),(46,1,15,2,2,NULL,1,1,NULL,NULL),(47,1,15,3,2,NULL,1,1,NULL,NULL),(48,1,15,3,3,NULL,1,1,NULL,NULL),(49,1,15,2,3,NULL,1,1,NULL,NULL),(50,1,15,2,4,NULL,1,1,NULL,NULL),(51,1,15,3,3,NULL,1,1,NULL,NULL),(52,1,15,3,4,NULL,1,1,NULL,NULL),(53,1,15,4,3,NULL,1,1,NULL,NULL),(54,1,15,4,4,NULL,1,1,NULL,NULL);
/*!40000 ALTER TABLE `coursesection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departmentmaster`
--

DROP TABLE IF EXISTS `departmentmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departmentmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `DepartmentName` varchar(100) NOT NULL,
  `DepartmentCode` varchar(20) DEFAULT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `DepartmentName` (`DepartmentName`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departmentmaster`
--

LOCK TABLES `departmentmaster` WRITE;
/*!40000 ALTER TABLE `departmentmaster` DISABLE KEYS */;
INSERT INTO `departmentmaster` VALUES (1,'hr','121',NULL,1,1,'2018-11-26 10:33:52'),(2,'Academicians','212',NULL,1,1,'2018-11-26 10:34:10'),(3,'English Literature','3232',NULL,1,1,'2018-11-26 10:34:44'),(4,'Tamil Literature','2121',NULL,1,1,'2018-11-26 10:35:04'),(5,'Mathematics','2112',NULL,1,1,'2018-11-26 10:35:16'),(6,'Economics','4323','sasdsa',1,1,'2018-11-26 10:35:31'),(7,'Computer Science','323211',NULL,1,1,'2018-11-26 10:35:46');
/*!40000 ALTER TABLE `departmentmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designationmaster`
--

DROP TABLE IF EXISTS `designationmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designationmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Designation` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Designation` (`Designation`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designationmaster`
--

LOCK TABLES `designationmaster` WRITE;
/*!40000 ALTER TABLE `designationmaster` DISABLE KEYS */;
INSERT INTO `designationmaster` VALUES (1,'Staff',NULL,1,1,'2018-11-27 09:15:06'),(2,'Head Master',NULL,1,1,'2018-11-27 09:15:18'),(3,'Employee',NULL,1,1,'2018-11-27 09:15:32'),(4,'Admin',NULL,1,1,'2018-11-27 09:15:44'),(5,'Driver',NULL,1,1,'2018-11-27 09:15:58'),(6,'a',NULL,1,1,'2018-11-27 09:16:08');
/*!40000 ALTER TABLE `designationmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documenttypemaster`
--

DROP TABLE IF EXISTS `documenttypemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documenttypemaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Document` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Document` (`Document`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documenttypemaster`
--

LOCK TABLES `documenttypemaster` WRITE;
/*!40000 ALTER TABLE `documenttypemaster` DISABLE KEYS */;
INSERT INTO `documenttypemaster` VALUES (1,'TC Certificate',NULL,1,1,'2018-11-27 09:19:15'),(2,'X Marksheet',NULL,1,1,'2018-11-27 09:20:45'),(3,'XII Marksheet',NULL,1,1,'2018-11-27 09:21:01'),(4,'Community Certificate','Community Certificate',1,1,'2018-11-27 09:21:14'),(5,'Aadhar','Aadhar',1,1,'2022-02-18 19:11:13');
/*!40000 ALTER TABLE `documenttypemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `educationaldetails`
--

DROP TABLE IF EXISTS `educationaldetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educationaldetails` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeId` int(11) DEFAULT NULL,
  `QualificationId` int(11) DEFAULT NULL,
  `YearOfPassedOut` int(11) DEFAULT NULL,
  `CollegedUnivercity` varchar(100) DEFAULT NULL,
  `Percentage` decimal(12,2) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUser_Id` int(11) DEFAULT '1',
  `CreatedDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educationaldetails`
--

LOCK TABLES `educationaldetails` WRITE;
/*!40000 ALTER TABLE `educationaldetails` DISABLE KEYS */;
INSERT INTO `educationaldetails` VALUES (1,2,3,567,'567',567.00,1,1,NULL),(2,2,1,1,'dssss',NULL,0,1,NULL),(3,5,2,57,'y6',85.00,1,1,NULL),(4,6,NULL,NULL,NULL,0.00,1,1,NULL),(5,7,NULL,NULL,NULL,0.00,1,1,NULL),(6,8,NULL,NULL,NULL,0.00,1,1,NULL),(7,8,NULL,NULL,NULL,0.00,1,1,NULL),(8,7,NULL,NULL,NULL,0.00,1,1,NULL),(9,6,NULL,NULL,NULL,0.00,1,1,NULL),(10,1,NULL,NULL,NULL,0.00,1,1,NULL),(11,1,NULL,NULL,NULL,0.00,1,1,NULL),(12,1,NULL,NULL,NULL,0.00,1,1,NULL),(13,1,NULL,NULL,NULL,0.00,1,1,NULL),(14,1,NULL,NULL,NULL,0.00,1,1,NULL),(15,1,NULL,NULL,NULL,NULL,1,1,NULL),(16,9,NULL,NULL,NULL,0.00,1,1,NULL),(17,10,NULL,NULL,NULL,0.00,1,1,NULL),(18,11,NULL,NULL,NULL,0.00,1,1,NULL);
/*!40000 ALTER TABLE `educationaldetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_previousexperience`
--

DROP TABLE IF EXISTS `employee_previousexperience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_previousexperience` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeId` int(11) NOT NULL,
  `CompanyName` varchar(150) DEFAULT NULL,
  `CompanyAddress` varchar(250) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Skills_Utilized` varchar(150) DEFAULT NULL,
  `PrimaryResponsibility` varchar(150) DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUser_Id` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_previousexperience`
--

LOCK TABLES `employee_previousexperience` WRITE;
/*!40000 ALTER TABLE `employee_previousexperience` DISABLE KEYS */;
INSERT INTO `employee_previousexperience` VALUES (1,2,'dgdf','gerte','2019-01-24','2019-01-24','e','er',1,1),(2,9,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(3,10,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(4,11,NULL,NULL,NULL,NULL,NULL,NULL,1,1),(5,12,NULL,NULL,NULL,NULL,NULL,NULL,1,1);
/*!40000 ALTER TABLE `employee_previousexperience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeegrade`
--

DROP TABLE IF EXISTS `employeegrade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeegrade` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `GradeName` varchar(20) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(10) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeegrade`
--

LOCK TABLES `employeegrade` WRITE;
/*!40000 ALTER TABLE `employeegrade` DISABLE KEYS */;
INSERT INTO `employeegrade` VALUES (1,'A',NULL,1,1,NULL,NULL),(2,'B',NULL,1,1,NULL,NULL),(3,'C',NULL,1,1,NULL,NULL),(4,'D',NULL,1,1,NULL,NULL);
/*!40000 ALTER TABLE `employeegrade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeelogin`
--

DROP TABLE IF EXISTS `employeelogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeelogin` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeId` int(11) DEFAULT NULL,
  `LogInTime` datetime DEFAULT NULL,
  `LogOutTime` datetime DEFAULT NULL,
  `CountVal` int(11) DEFAULT NULL,
  `Flag` int(11) DEFAULT NULL,
  `ModifiedUser_Id` int(11) NOT NULL DEFAULT '1',
  `Balance` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeelogin`
--

LOCK TABLES `employeelogin` WRITE;
/*!40000 ALTER TABLE `employeelogin` DISABLE KEYS */;
INSERT INTO `employeelogin` VALUES (145,-1,'2022-02-18 13:03:23','2022-02-18 13:20:20',1,1,1,NULL),(146,10,'2022-02-18 13:32:54','2022-02-18 13:33:13',1,1,1,NULL),(147,-1,'2022-02-18 13:33:20',NULL,1,1,1,NULL),(148,-1,'2022-02-18 13:43:34',NULL,1,1,1,NULL),(149,-1,'2022-02-18 16:28:31','2022-02-18 20:03:23',1,1,1,NULL),(150,-1,'2022-02-18 20:03:50',NULL,1,1,1,NULL),(151,-1,'2022-02-19 09:11:49',NULL,1,1,1,NULL),(152,-1,'2022-02-19 10:23:28',NULL,1,1,1,NULL),(153,-1,'2022-02-20 07:05:44','2022-02-20 08:17:55',1,1,1,NULL),(154,-1,'2022-02-20 11:03:47','2022-02-20 11:03:51',1,1,1,NULL),(155,-1,'2022-02-20 11:04:02','2022-02-20 11:04:32',1,1,1,NULL),(156,-1,'2022-02-20 11:05:45','2022-02-20 11:06:15',1,1,1,NULL),(157,-1,'2022-02-20 11:06:41',NULL,1,1,1,NULL),(158,-1,'2022-02-20 11:06:59','2022-02-20 11:07:14',1,1,1,NULL),(159,-1,'2022-02-20 11:07:39',NULL,1,0,1,NULL),(160,-1,'2022-02-20 11:07:42','2022-02-20 11:07:46',1,1,1,NULL),(161,-1,'2022-02-20 11:08:52',NULL,1,0,1,NULL),(162,-1,'2022-02-20 11:08:56','2022-02-20 11:09:10',1,1,1,NULL),(163,-1,'2022-02-20 11:34:41','2022-02-20 11:37:02',1,1,1,NULL),(164,-1,'2022-02-20 11:37:15',NULL,1,1,1,NULL),(165,-1,'2022-02-20 11:45:16',NULL,1,1,1,NULL),(166,-1,'2022-02-20 21:52:27','2022-02-21 00:00:52',1,1,1,NULL),(167,-1,'2022-02-21 05:43:30',NULL,1,1,1,NULL),(168,-1,'2022-02-21 06:04:18',NULL,1,0,1,NULL),(169,-1,'2022-02-21 06:04:22',NULL,1,1,1,NULL),(170,-1,'2022-02-21 06:05:21','2022-02-21 06:39:36',1,1,1,NULL),(171,-1,'2022-02-21 06:39:42','2022-02-21 06:39:48',1,1,1,NULL),(172,-1,'2022-02-21 06:39:58','2022-02-21 06:40:22',1,1,1,NULL),(173,-1,'2022-02-21 06:42:15','2022-02-21 07:45:08',1,1,1,NULL),(174,-1,'2022-02-21 07:55:23',NULL,1,1,1,NULL),(175,-1,'2022-02-21 14:30:07',NULL,1,1,1,NULL),(176,-1,'2022-02-23 12:31:24',NULL,1,1,1,NULL);
/*!40000 ALTER TABLE `employeelogin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employeetypemaster`
--

DROP TABLE IF EXISTS `employeetypemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employeetypemaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `EmployeeType` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `EmployeeType` (`EmployeeType`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employeetypemaster`
--

LOCK TABLES `employeetypemaster` WRITE;
/*!40000 ALTER TABLE `employeetypemaster` DISABLE KEYS */;
INSERT INTO `employeetypemaster` VALUES (1,'Office Staff',NULL,1,1,'2018-11-27 10:44:33'),(2,'Admin',NULL,1,1,'2018-11-27 10:44:42'),(3,'Employee',NULL,1,1,'2018-11-27 10:44:50'),(4,'Accountant',NULL,1,1,'2018-11-27 10:48:30'),(5,'Cashier',NULL,1,1,'2018-11-27 10:48:43'),(6,'Staff',NULL,1,1,'2018-11-27 10:48:54');
/*!40000 ALTER TABLE `employeetypemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enquiryformmaster`
--

DROP TABLE IF EXISTS `enquiryformmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enquiryformmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(20) NOT NULL,
  `ApplicationNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `EnquiryDate` date NOT NULL,
  `Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `DOB` date DEFAULT NULL,
  `Age` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `GenderId` int(10) unsigned NOT NULL,
  `FatherName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MotherName` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CommunityId` int(10) unsigned DEFAULT NULL,
  `SpecificationId` int(10) unsigned DEFAULT NULL,
  `StatusId` int(11) DEFAULT NULL,
  `Address` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `PinCode` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `MediumId` int(10) unsigned NOT NULL,
  `CourseId` int(10) unsigned NOT NULL,
  `LastCourse` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Result` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `AnotherContactNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ReferenceTypeId` int(10) unsigned DEFAULT NULL,
  `Remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `Relation` tinyint(4) DEFAULT NULL,
  `RelationType` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `AcademicYearId` int(11) DEFAULT NULL,
  `StateId` int(11) DEFAULT NULL,
  `CountryId` int(11) DEFAULT NULL,
  `CityId` int(11) DEFAULT NULL,
  `Emp_Id` smallint(5) unsigned DEFAULT NULL,
  `Stu_Id` int(11) DEFAULT NULL,
  `Others` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `enquiryformmaster_email_unique` (`Email`),
  KEY `enquiryformmaster_genderid_foreign` (`GenderId`),
  KEY `enquiryformmaster_communityid_foreign` (`CommunityId`),
  KEY `enquiryformmaster_specificationid_foreign` (`SpecificationId`),
  KEY `enquiryformmaster_mediumid_foreign` (`MediumId`),
  KEY `enquiryformmaster_courseid_foreign` (`CourseId`),
  KEY `enquiryformmaster_referencetypeid_foreign` (`ReferenceTypeId`),
  KEY `AcademicYearId` (`AcademicYearId`),
  KEY `StateId` (`StateId`),
  KEY `CountryId` (`CountryId`),
  KEY `CityId` (`CityId`),
  KEY `StatusId` (`StatusId`),
  KEY `InstitutionId` (`InstitutionId`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enquiryformmaster`
--

LOCK TABLES `enquiryformmaster` WRITE;
/*!40000 ALTER TABLE `enquiryformmaster` DISABLE KEYS */;
/*!40000 ALTER TABLE `enquiryformmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exammaster`
--

DROP TABLE IF EXISTS `exammaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exammaster` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(20) DEFAULT NULL,
  `ExamName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ExamCode` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Duration_Hour` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Duration_Minutes` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Description` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `Grade` tinyint(1) DEFAULT NULL,
  `GradeT` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `InstitutionId` (`InstitutionId`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exammaster`
--

LOCK TABLES `exammaster` WRITE;
/*!40000 ALTER TABLE `exammaster` DISABLE KEYS */;
INSERT INTO `exammaster` VALUES (16,1,'test1','test01','1','50','test',NULL,NULL,1,1),(17,1,'annual','annual','3','00','test s',NULL,NULL,1,1),(18,1,'Semester 1','Sem1','3','00','Semester 1 exam',NULL,NULL,1,1);
/*!40000 ALTER TABLE `exammaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examsubject`
--

DROP TABLE IF EXISTS `examsubject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examsubject` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(20) DEFAULT NULL,
  `AcademicYearId` int(10) unsigned DEFAULT NULL,
  `CourseId` int(10) unsigned NOT NULL,
  `ExamNameId` int(10) unsigned NOT NULL,
  `SubjectNameId` int(10) unsigned DEFAULT NULL,
  `Pass` decimal(4,1) DEFAULT NULL,
  `Total` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `examsubject_academicyearid_foreign` (`AcademicYearId`),
  KEY `examsubject_courseid_foreign` (`CourseId`),
  KEY `examsubject_examnameid_foreign` (`ExamNameId`),
  KEY `examsubject_subjectnameid_foreign` (`SubjectNameId`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examsubject`
--

LOCK TABLES `examsubject` WRITE;
/*!40000 ALTER TABLE `examsubject` DISABLE KEYS */;
INSERT INTO `examsubject` VALUES (14,1,15,2,16,NULL,NULL,NULL,NULL,1,1,NULL,NULL),(15,1,15,3,17,NULL,NULL,NULL,NULL,1,1,NULL,NULL),(16,1,15,2,17,NULL,NULL,NULL,NULL,1,1,NULL,NULL),(17,1,15,2,18,NULL,NULL,NULL,NULL,1,1,NULL,NULL);
/*!40000 ALTER TABLE `examsubject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examtimetable`
--

DROP TABLE IF EXISTS `examtimetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examtimetable` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `AcademicYearId` int(10) unsigned NOT NULL,
  `CourseId` int(10) unsigned NOT NULL,
  `ExaminationId` int(10) unsigned NOT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `examtimetable_academicyearid_foreign` (`AcademicYearId`),
  KEY `examtimetable_courseid_foreign` (`CourseId`),
  KEY `examtimetable_examinationid_foreign` (`ExaminationId`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examtimetable`
--

LOCK TABLES `examtimetable` WRITE;
/*!40000 ALTER TABLE `examtimetable` DISABLE KEYS */;
/*!40000 ALTER TABLE `examtimetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examtimetablechild`
--

DROP TABLE IF EXISTS `examtimetablechild`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examtimetablechild` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ExamtimetableId` int(10) unsigned NOT NULL,
  `SubjectId` int(11) DEFAULT NULL,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `ExamDate` date DEFAULT NULL,
  `Remarks` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUser_Id` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `examtimetablechild_examtimetableid_foreign` (`ExamtimetableId`),
  KEY `examtimetablechild_subjectid_foreign` (`SubjectId`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examtimetablechild`
--

LOCK TABLES `examtimetablechild` WRITE;
/*!40000 ALTER TABLE `examtimetablechild` DISABLE KEYS */;
/*!40000 ALTER TABLE `examtimetablechild` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gendermaster`
--

DROP TABLE IF EXISTS `gendermaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gendermaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `Gender` varchar(20) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Gender` (`Gender`),
  KEY `School_Id` (`School_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gendermaster`
--

LOCK TABLES `gendermaster` WRITE;
/*!40000 ALTER TABLE `gendermaster` DISABLE KEYS */;
INSERT INTO `gendermaster` VALUES (1,2,'Female',NULL,1,1,'2018-11-26 10:36:04'),(2,2,'Male','Description Testing',1,1,'2018-11-26 10:36:10'),(3,2,'Both',NULL,1,1,'2018-11-26 10:36:21'),(6,1,'asdgahsd',NULL,1,1,'2019-08-02 11:10:38'),(7,1,'xcvxc',NULL,1,1,'2019-08-05 12:21:44'),(8,1,'Femal',NULL,1,1,'2019-08-07 13:24:26'),(9,1,'Mal',NULL,1,1,'2019-08-22 13:11:36');
/*!40000 ALTER TABLE `gendermaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generatehallticket`
--

DROP TABLE IF EXISTS `generatehallticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generatehallticket` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `StudentId` int(11) DEFAULT NULL,
  `AcademicYearId` int(11) DEFAULT NULL,
  `CourseId` int(11) DEFAULT NULL,
  `ExamNameId` int(11) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUser_Id` int(11) DEFAULT '1',
  `GeneratedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generatehallticket`
--

LOCK TABLES `generatehallticket` WRITE;
/*!40000 ALTER TABLE `generatehallticket` DISABLE KEYS */;
INSERT INTO `generatehallticket` VALUES (3,32,15,2,17,1,1,'2022-02-18 11:56:28');
/*!40000 ALTER TABLE `generatehallticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gradesettings`
--

DROP TABLE IF EXISTS `gradesettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gradesettings` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(20) DEFAULT NULL,
  `GradeName` varchar(50) DEFAULT NULL,
  `GradePoint` varchar(50) DEFAULT NULL,
  `GradeCategory` varchar(30) DEFAULT NULL,
  `MarksFrom` int(11) DEFAULT NULL,
  `MarksUpto` int(11) DEFAULT NULL,
  `Remarks` varchar(250) DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gradesettings`
--

LOCK TABLES `gradesettings` WRITE;
/*!40000 ALTER TABLE `gradesettings` DISABLE KEYS */;
INSERT INTO `gradesettings` VALUES (3,1,'A','80','1',80,90,'grade',1,1),(4,1,'B','2','80',70,80,'grade 1',1,1),(5,1,'C','70','a',60,70,'grade2',1,1),(6,1,'D','60','c',60,70,NULL,1,1),(7,1,'E','50','e',40,50,'grade e',0,1),(8,1,'A','100','8',80,90,NULL,1,1),(9,1,'test','test','1',30,NULL,NULL,1,1),(10,1,'exam1','exam001','2',20,NULL,NULL,1,1),(11,1,'First Class','5','Merit',80,100,NULL,1,1);
/*!40000 ALTER TABLE `gradesettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institution`
--

DROP TABLE IF EXISTS `institution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institution` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `institutionName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `institutionPrintName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CountryId` int(11) DEFAULT NULL,
  `StateId` int(11) DEFAULT NULL,
  `CityId` int(11) DEFAULT NULL,
  `Pincode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ContactNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MobileNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FaxNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Website` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SchoolLogo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhotoName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhotoFullPath` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `FromMonthId` int(11) DEFAULT NULL,
  `ToMonthId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `institution_countryid_foreign` (`CountryId`),
  KEY `institution_stateid_foreign` (`StateId`),
  KEY `institution_cityid_foreign` (`CityId`),
  KEY `FromMonthId` (`FromMonthId`),
  KEY `ToMonthId` (`ToMonthId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institution`
--

LOCK TABLES `institution` WRITE;
/*!40000 ALTER TABLE `institution` DISABLE KEYS */;
INSERT INTO `institution` VALUES (1,'KVK','KVK','2./12','Anna Nagar',1,6,12,'642126','12365789965545','6598745252','012458596','KVK@gmail.com','asdasdasdasd.com',NULL,'a11.jpg',NULL,NULL,NULL,6,5);
/*!40000 ALTER TABLE `institution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languagemaster`
--

DROP TABLE IF EXISTS `languagemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `languagemaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `Language` varchar(50) NOT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `School_Id` (`School_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languagemaster`
--

LOCK TABLES `languagemaster` WRITE;
/*!40000 ALTER TABLE `languagemaster` DISABLE KEYS */;
INSERT INTO `languagemaster` VALUES (1,2,'Tamil',1,1,NULL,NULL),(2,2,'English',1,1,NULL,NULL),(3,2,'Malayalam',1,1,NULL,NULL),(4,1,'Tamil',1,1,NULL,NULL);
/*!40000 ALTER TABLE `languagemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locationmaster`
--

DROP TABLE IF EXISTS `locationmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locationmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `InsitutionId` int(11) DEFAULT NULL,
  `StateId` int(11) NOT NULL,
  `LocationName` varchar(100) NOT NULL,
  `LocationCode` varchar(50) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `CountryId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CountryId` (`CountryId`),
  KEY `LocationCode` (`LocationCode`) USING BTREE,
  KEY `LocationName` (`LocationName`) USING BTREE,
  KEY `StateId` (`StateId`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locationmaster`
--

LOCK TABLES `locationmaster` WRITE;
/*!40000 ALTER TABLE `locationmaster` DISABLE KEYS */;
INSERT INTO `locationmaster` VALUES (8,NULL,8,'Coimbatore','CBE',NULL,1,1,'2022-02-12 15:33:18',5);
/*!40000 ALTER TABLE `locationmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manageemployee`
--

DROP TABLE IF EXISTS `manageemployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manageemployee` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `TitleId` int(11) NOT NULL,
  `FirstName` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MiddleName` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastName` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmployeeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `EmployeeNumber` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EmployeePhoto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhotoName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhotoFullPath` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FatherName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MotherName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GenderId` int(10) unsigned NOT NULL,
  `DOB` date NOT NULL,
  `DOJ` date NOT NULL,
  `Reporting_To` int(11) DEFAULT NULL,
  `QualificationId` int(11) DEFAULT NULL,
  `EmployeeTypeId` int(10) unsigned NOT NULL,
  `Experience_Years` int(11) DEFAULT NULL,
  `Experience_Months` int(10) DEFAULT NULL,
  `DesignationId` int(10) unsigned NOT NULL,
  `SpecificationId` int(10) unsigned DEFAULT NULL,
  `DepartmentId` int(10) unsigned NOT NULL,
  `GradeId` int(11) DEFAULT NULL,
  `MaritalStatusId` int(10) unsigned NOT NULL,
  `ReligionId` int(10) unsigned DEFAULT NULL,
  `BloodGroupId` int(10) unsigned DEFAULT NULL,
  `SSN_UID_No` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastOrganization` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `OthersDesignation` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `OthersQualification` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `YearOfPassedOut` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CollegedUniv` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Percentage` decimal(5,2) DEFAULT NULL,
  `HouseNo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `District` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `StateId` int(10) unsigned NOT NULL,
  `PinCode` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `CountryId` int(10) unsigned NOT NULL,
  `Town` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LocationNameId` int(11) NOT NULL,
  `PAN_No` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BankACCNo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PF_ACCNo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ESI_ACCNo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BankNameId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BranchNameId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DrivingLicenseNo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IFSC_Code` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PassportNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AadharNo` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MICR_No` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RelieveResonTypeId` int(11) DEFAULT NULL,
  `ResignationDate` date DEFAULT NULL,
  `NoitcePeriod` int(11) DEFAULT NULL,
  `LeavingReason` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastWorkingDay` date DEFAULT NULL,
  `PaymentDate` date DEFAULT NULL,
  `Remarks` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FB_AC` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Linked_In` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Googleplus` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GTalk` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Whatsapp` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Twitter` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Others1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Others2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address1` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Address2` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `Emp_EmployeeNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Present_Address1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Present_Address2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Present_Country` int(11) DEFAULT NULL,
  `Present_State` int(11) DEFAULT NULL,
  `Present_City` int(11) DEFAULT NULL,
  `Present_PinCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `manageemployee_genderid_foreign` (`GenderId`),
  KEY `manageemployee_employeetypeid_foreign` (`EmployeeTypeId`),
  KEY `manageemployee_designationid_foreign` (`DesignationId`),
  KEY `manageemployee_specificationid_foreign` (`SpecificationId`),
  KEY `manageemployee_departmentid_foreign` (`DepartmentId`),
  KEY `manageemployee_maritalstatusid_foreign` (`MaritalStatusId`),
  KEY `manageemployee_religionid_foreign` (`ReligionId`),
  KEY `manageemployee_bloodgroupid_foreign` (`BloodGroupId`),
  KEY `manageemployee_stateid_foreign` (`StateId`),
  KEY `manageemployee_countryid_foreign` (`CountryId`),
  KEY `RelieveResonTypeId` (`RelieveResonTypeId`),
  KEY `QualificationId` (`QualificationId`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manageemployee`
--

LOCK TABLES `manageemployee` WRITE;
/*!40000 ALTER TABLE `manageemployee` DISABLE KEYS */;
INSERT INTO `manageemployee` VALUES (-1,1,'SMS',NULL,'Demo','SMS Demo','Demo344',NULL,NULL,NULL,NULL,NULL,1,'1997-12-22','2018-11-14',NULL,NULL,4,NULL,NULL,2,1,7,1,1,1,2,NULL,NULL,'6565656565',NULL,NULL,NULL,NULL,NULL,NULL,'palani',NULL,1,'565545',1,'Chennai',3,NULL,'65656565',NULL,NULL,'1','1',NULL,NULL,NULL,NULL,NULL,1,'2019-01-23',12,NULL,'2019-02-04','1970-01-01',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'palani','Chennai',0,1,NULL,NULL,'DM34',NULL,NULL,NULL,NULL,NULL,NULL),(11,1,'Bharathi',NULL,'Vb','Bharathi Vb','Enq 1','Images/DcWvU2GfsnwExQbas6BjFMNAFWFfUFB301HMjDFe.png','deleteNewIcon.png','D:\\SMS Latest\\school\\public\\Uploads\\Images/DcWvU2GfsnwExQbas6BjFMNAFWFfUFB301HMjDFe.png',NULL,NULL,2,'1995-12-11','2018-06-13',NULL,NULL,3,NULL,NULL,6,3,7,2,2,1,3,NULL,NULL,'369712542',NULL,NULL,NULL,NULL,NULL,0.00,'1111',NULL,9,'123456',2,'345',1,NULL,'5445636456',NULL,NULL,'4','Udt',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1111','345',1,1,NULL,NULL,'002',NULL,NULL,NULL,NULL,NULL,NULL),(10,1,'Vaishnavi',NULL,'Masilamani','Vaishnavi Masilamani','231',NULL,NULL,NULL,'Mani','Selvi',1,'1996-10-31','2018-01-03',NULL,NULL,2,2,3,5,6,5,1,1,1,1,NULL,NULL,'12345678952',NULL,NULL,NULL,NULL,NULL,0.00,'12',NULL,8,'642112',6,'23',8,NULL,'12345678',NULL,NULL,'4','uDUMALPET',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'12','23',1,1,NULL,NULL,'001',NULL,NULL,NULL,NULL,NULL,NULL),(12,1,'Prem',NULL,'Kumar','Prem Kumar',NULL,NULL,NULL,NULL,NULL,NULL,2,'1995-07-20','2020-02-04',NULL,NULL,4,NULL,NULL,4,6,5,1,2,1,2,NULL,NULL,'988559152',NULL,NULL,NULL,NULL,NULL,0.00,NULL,NULL,8,'6410256',5,NULL,8,NULL,'234234234',NULL,NULL,'4','cob',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'address street','address lane',1,1,NULL,NULL,'100',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `manageemployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managelogins`
--

DROP TABLE IF EXISTS `managelogins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managelogins` (
  `Id` int(10) unsigned NOT NULL,
  `LogintypeId` int(11) DEFAULT NULL,
  `ReferenceId` int(11) NOT NULL,
  `UserName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managelogins`
--

LOCK TABLES `managelogins` WRITE;
/*!40000 ALTER TABLE `managelogins` DISABLE KEYS */;
INSERT INTO `managelogins` VALUES (1,3,11,'Bharathi','Bhas',1,1,'2018-12-22 02:30:20',NULL),(3,2,10,'Vaishu','Vb37',1,1,'2019-02-08 02:34:39',NULL),(2,2,-1,'Admin','Admin1',1,1,'2019-02-08 02:22:04',NULL);
/*!40000 ALTER TABLE `managelogins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maritalstatusmaster`
--

DROP TABLE IF EXISTS `maritalstatusmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `maritalstatusmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `MaritalStatus` varchar(20) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `MaritalStatus` (`MaritalStatus`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maritalstatusmaster`
--

LOCK TABLES `maritalstatusmaster` WRITE;
/*!40000 ALTER TABLE `maritalstatusmaster` DISABLE KEYS */;
INSERT INTO `maritalstatusmaster` VALUES (1,'Single',NULL,1,1,'2018-11-26 10:41:02'),(2,'Married',NULL,0,1,'2018-11-26 10:41:09'),(3,'A',NULL,1,1,'2019-01-12 13:06:58');
/*!40000 ALTER TABLE `maritalstatusmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mediummasters`
--

DROP TABLE IF EXISTS `mediummasters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mediummasters` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `MediumName` varchar(150) DEFAULT NULL,
  `ShortName` varchar(50) DEFAULT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUser_Id` int(11) DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `School_Id` (`School_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mediummasters`
--

LOCK TABLES `mediummasters` WRITE;
/*!40000 ALTER TABLE `mediummasters` DISABLE KEYS */;
INSERT INTO `mediummasters` VALUES (1,2,'Tamil','Tam',NULL,1,1),(2,2,'English','Eng',NULL,1,1),(3,1,'2018',NULL,NULL,1,1),(4,1,'skjdf',NULL,NULL,1,1),(68,1,'0',NULL,NULL,1,1);
/*!40000 ALTER TABLE `mediummasters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mothertonguemaster`
--

DROP TABLE IF EXISTS `mothertonguemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mothertonguemaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `MotherTongue` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `MotherTongue` (`MotherTongue`),
  KEY `School_Id` (`School_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mothertonguemaster`
--

LOCK TABLES `mothertonguemaster` WRITE;
/*!40000 ALTER TABLE `mothertonguemaster` DISABLE KEYS */;
INSERT INTO `mothertonguemaster` VALUES (1,2,'Tamil',NULL,1,1,'2018-11-26 11:05:28'),(2,2,'English',NULL,1,1,'2018-11-26 11:05:38'),(3,2,'Hindi',NULL,1,1,'2018-11-26 11:05:51'),(4,2,'Sanskrit',NULL,0,1,'2018-11-26 11:06:06'),(5,1,'MBC',NULL,1,1,'2019-08-02 11:10:38'),(6,2,'Telungu',NULL,1,1,'2019-08-02 11:13:29'),(7,2,'Marati',NULL,1,1,'2019-08-22 13:11:36');
/*!40000 ALTER TABLE `mothertonguemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paperpatteren`
--

DROP TABLE IF EXISTS `paperpatteren`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paperpatteren` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `AcademicYearId` int(10) unsigned DEFAULT NULL,
  `CourseId` int(10) unsigned NOT NULL,
  `MediumId` int(10) unsigned NOT NULL,
  `ExamNameId` int(10) unsigned NOT NULL,
  `SubjectId` int(10) unsigned NOT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `paperpatteren_academicyearid_foreign` (`AcademicYearId`),
  KEY `paperpatteren_courseid_foreign` (`CourseId`),
  KEY `paperpatteren_mediumid_foreign` (`MediumId`),
  KEY `paperpatteren_examnameid_foreign` (`ExamNameId`),
  KEY `paperpatteren_subjectid_foreign` (`SubjectId`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paperpatteren`
--

LOCK TABLES `paperpatteren` WRITE;
/*!40000 ALTER TABLE `paperpatteren` DISABLE KEYS */;
INSERT INTO `paperpatteren` VALUES (1,5,2,2,10,59,1,1,NULL,NULL),(2,5,2,2,10,59,1,1,NULL,NULL),(3,5,2,1,3,60,1,1,NULL,NULL),(4,1,4,2,3,1,0,1,NULL,NULL),(5,5,2,2,10,59,1,1,NULL,NULL),(6,5,2,1,10,59,1,1,NULL,NULL),(7,5,2,1,10,59,1,1,NULL,NULL),(8,1,12,1,4,9,1,1,NULL,NULL),(9,1,6,1,14,29,1,1,NULL,NULL),(10,3,11,1,1,2,1,1,NULL,NULL),(11,3,11,2,1,3,1,1,NULL,NULL),(12,3,11,2,1,3,1,1,NULL,NULL),(13,3,11,2,1,4,1,1,NULL,NULL),(14,3,13,2,1,8,1,1,NULL,NULL),(15,1,1,1,3,1,1,1,NULL,NULL),(16,15,2,2,17,1,1,1,NULL,NULL),(17,15,2,2,17,2,1,1,NULL,NULL);
/*!40000 ALTER TABLE `paperpatteren` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paperpatternchild`
--

DROP TABLE IF EXISTS `paperpatternchild`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paperpatternchild` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `paperpatterenId` int(10) unsigned NOT NULL,
  `QuestionpaperSectionId` int(10) unsigned NOT NULL,
  `NumberofQuestions` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Answers` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Marks` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `Remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `ModifiedUser_Id` int(11) NOT NULL DEFAULT '1',
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `paperpatternchild_paperpatterenid_foreign` (`paperpatterenId`),
  KEY `paperpatternchild_questionpapersectionid_foreign` (`QuestionpaperSectionId`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paperpatternchild`
--

LOCK TABLES `paperpatternchild` WRITE;
/*!40000 ALTER TABLE `paperpatternchild` DISABLE KEYS */;
INSERT INTO `paperpatternchild` VALUES (1,1,1,'1','1','1','1',1,1,NULL,NULL),(2,2,2,'2','1','100',NULL,1,1,NULL,NULL),(3,3,1,'4','3','100',NULL,1,1,NULL,NULL),(4,4,2,'2','1','4',NULL,1,1,NULL,NULL),(5,5,1,'12','2','4',NULL,1,1,NULL,NULL),(6,6,1,'11','10','100',NULL,1,1,NULL,NULL),(7,7,1,'11','10','110',NULL,1,1,NULL,NULL),(8,8,1,'12','10','10',NULL,1,1,NULL,NULL),(9,8,2,'20','20','30',NULL,1,1,NULL,NULL),(10,9,1,'12','10','10',NULL,1,1,NULL,NULL),(11,9,2,'10','10','12',NULL,1,1,NULL,NULL),(12,10,1,'10','3','2',NULL,1,1,NULL,NULL),(13,11,1,'12','1','200',NULL,1,1,NULL,NULL),(14,10,2,'8','4','3',NULL,1,1,NULL,NULL),(15,10,3,'7','2','2',NULL,1,1,NULL,NULL),(16,12,1,'5','4','2',NULL,1,1,NULL,NULL),(17,11,2,'45','2','2',NULL,1,1,NULL,NULL),(18,13,1,'12','2','2',NULL,1,1,NULL,NULL),(19,13,2,'2','1','3',NULL,1,1,NULL,NULL),(20,14,1,'23','3','21',NULL,1,1,NULL,NULL),(21,15,1,'12','2','5',NULL,1,1,NULL,NULL),(22,17,1,'10','10','1','One Mark',1,1,NULL,NULL),(23,17,2,'10','10','2','Two Mark',1,1,NULL,NULL),(24,17,3,'14','5','5','Five Mark',1,1,NULL,NULL);
/*!40000 ALTER TABLE `paperpatternchild` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `papertypemaster`
--

DROP TABLE IF EXISTS `papertypemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `papertypemaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `PaperType` varchar(100) NOT NULL,
  `Description` varchar(200) DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `papertypemaster`
--

LOCK TABLES `papertypemaster` WRITE;
/*!40000 ALTER TABLE `papertypemaster` DISABLE KEYS */;
INSERT INTO `papertypemaster` VALUES (1,'Theoretical',NULL,1,1),(2,'Practical',NULL,1,1),(3,'Objective',NULL,1,1);
/*!40000 ALTER TABLE `papertypemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qualificationmaster`
--

DROP TABLE IF EXISTS `qualificationmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qualificationmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `Qualification` varchar(100) NOT NULL,
  `Code` varchar(50) NOT NULL,
  `Description` int(250) DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `School_Id` (`School_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qualificationmaster`
--

LOCK TABLES `qualificationmaster` WRITE;
/*!40000 ALTER TABLE `qualificationmaster` DISABLE KEYS */;
INSERT INTO `qualificationmaster` VALUES (1,2,'B.Sc(Maths)','M101',NULL,1,'2018-06-19 12:22:30',1),(2,2,'B.E(ECE)','EC101',NULL,1,'2018-06-19 12:22:30',1),(3,2,'MSC','MSC07',NULL,0,'2018-12-31 09:35:06',1),(4,2,'M.E-CSE','a101',NULL,1,'2019-01-12 13:52:35',1),(5,2,'NILL','NILL',NULL,1,'2019-08-05 12:37:58',1),(6,1,'ME-ECE','ME-E',NULL,1,'2019-08-05 12:46:44',1),(7,1,'HJGjhg','HJGjhg',NULL,1,'2019-08-05 12:48:20',1),(8,1,'Labour','Labour',NULL,1,'2019-08-05 12:48:20',1),(9,1,'sdf','sdf',NULL,1,'2019-08-05 13:54:13',1),(10,1,'BE','BE',NULL,1,'2019-08-05 19:07:51',1),(11,1,'erwer','erwer',NULL,1,'2019-08-05 19:10:45',1),(12,1,'0','0',NULL,1,'2019-08-08 12:52:10',1),(13,1,'','',NULL,1,'2019-08-22 13:11:37',1);
/*!40000 ALTER TABLE `qualificationmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questionbank`
--

DROP TABLE IF EXISTS `questionbank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionbank` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `AcademicYearId` int(10) unsigned DEFAULT NULL,
  `CourseId` int(10) unsigned NOT NULL,
  `MediumId` int(10) unsigned NOT NULL,
  `SubjectId` int(10) unsigned NOT NULL,
  `QuestionpaperSectionId` int(10) unsigned DEFAULT NULL,
  `PaperTypeId` int(10) unsigned NOT NULL,
  `ExamNameId` int(10) unsigned NOT NULL,
  `Questions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `questionbank_academicyearid_foreign` (`AcademicYearId`),
  KEY `questionbank_courseid_foreign` (`CourseId`),
  KEY `questionbank_mediumid_foreign` (`MediumId`),
  KEY `questionbank_subjectid_foreign` (`SubjectId`),
  KEY `questionbank_questionpapersectionid_foreign` (`QuestionpaperSectionId`),
  KEY `questionbank_papertypeid_foreign` (`PaperTypeId`),
  KEY `questionbank_examnameid_foreign` (`ExamNameId`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionbank`
--

LOCK TABLES `questionbank` WRITE;
/*!40000 ALTER TABLE `questionbank` DISABLE KEYS */;
INSERT INTO `questionbank` VALUES (1,1,4,1,2,1,1,3,'<p>1. Write about photosynthesis.</p>\n\n<p>2. Write about Cherry tree, Saruli has.</p>\n\n<p>3. Write about Raisins and Rubbers</p>\n\n<p>4. Grammar</p>\n\n<p>(i)Identify Subject in the following Sentence</p>\n\n<p>1. Sheela is a teacher</p>',1,1,NULL,NULL),(2,1,4,1,1,2,3,3,'<p style=\"margin-left:40px\"><u>1)&nbsp;</u>பதுடில்லி:காவிரி மேலாண்மை ஆணையத் துக்கு, சுதந்திரமான, முழு நேர தலைவரை நியமிக்கும்படி, உச்ச நீதிமன்றத்தில், தமிழக அரசு மனு தாக்கல் செய்துள்ளது. &#39;ஆணையத் துக்கு, நிரந்தர உறுப்பினர்களை நியமிக்கும்படி, மத்திய நீர்வளத் துறைக்கு, நீதிமன்றம் உத்தரவிட வேண்டும்&#39; என, அந்த மனுவில் கோரப்பட்டுள்ளது.பதுடில்லி:காவிரி மேலாண்மை ஆணையத் துக்கு, சுதந்திரமான, முழு நேர தலைவரை நியமிக்கும்படி, உச்ச நீதிமன்றத்தில், தமிழக அரசு மனு தாக்கல் செய்துள்ளது. &#39;ஆணையத் துக்கு, நிரந்தர உறுப்பினர்களை நியமிக்கும்படி, மத்திய நீர்வளத் துறைக்கு, நீதிமன்றம் உத்தரவிட வேண்டும்&#39; என, அந்த மனுவில் கோரப்பட்டுள்ளது.பதுடில்லி:காவிரி மேலாண்மை ஆணையத் துக்கு, சுதந்திரமான, முழு நேர தலைவரை நியமிக்கும்படி, உச்ச நீதிமன்றத்தில், தமிழக அரசு மனு தாக்கல் செய்துள்ளது. &#39;ஆணையத் துக்கு, நிரந்தர உறுப்பினர்களை நியமிக்கும்படி, மத்திய நீர்வளத் துறைக்கு, நீதிமன்றம் உத்தரவிட வேண்டும்&#39; என, அந்த மனுவில் கோரப்பட்டுள்ளது.</p>',1,1,NULL,NULL),(3,1,12,1,12,1,3,4,'<p>பதுடில்லி:காவிரி மேலாண்மை ஆணையத் துக்கு, சுதந்திரமான, முழு நேர தலைவரை நியமிக்கும்படி, உச்ச நீதிமன்றத்தில், தமிழக அரசு மனு தாக்கல் செய்துள்ளது. &#39;ஆணையத் துக்கு, நிரந்தர உறுப்பினர்களை நியமிக்கும்படி, மத்திய நீர்வளத் துறைக்கு, நீதிமன்றம் உத்தரவிட வேண்டும்&#39; என, அந்த மனுவில் கோரப்பட்டுள்ளது.Done</p>',1,1,NULL,NULL),(4,3,11,1,41,2,1,3,'<p>what is photosyntesis???????</p>\n\n<p>convert active voice into passive voice</p>\n\n<p>what are the tpye of verbs</p>\n\n<p>jgsdgadshgadgshkdgsk</p>\n\n<p>hdadhdhdladalsdkjakda</p>\n\n<p>dsadsdjahdajlsdasdjadkjkdjskdjs</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>dxhgdsdsgdghhdgfdghfdf</p>\n\n<p>sdajkdhjkshdakjdhajkhksjhkdjhdjhdjdhdkj</p>\n\n<p>adskd;ad;kjdjqieuqirerquqerrquerierqieuqieuieuewq</p>\n\n<p>qeieroreuqoiwueeuoqeqwhuqehuwehhqeueheuwe</p>\n\n<p>eqejiqweqoieqwioeqwioeqiweqeqwioeqwioeqwieqoeeq</p>\n\n<p>qkjkewewkqkwijqwejwkejwkewjekwjeqwk</p>\n\n<p>dadsldkjakddaldjkrueopidpqeecjdlfjldkjadda</p>\n\n<p>hdajldhalkdjaldikjakdjsadkajsdksajdkdjaksdjsdksadjsad</p>\n\n<p>dsjdjs;kajd;sdal;dsa;leuqeiuqiuiweuqieuwqjiqueiweuiqweuqwieuiqweuwq</p>\n\n<p>eqeyuuweyqweuqyweuwyewquyecnajdhjhqeuyqoyqoeyqoeyqw</p>\n\n<p>eyweqieuewqweeuyqeuyeeyquweyqeiuehyiueyeuqwyewquyewuqeyqwueyqweuqwyequweywe</p>\n\n<p>ewlejlqejqwkejqwkejwkejwekjekjwkejwkejwkjekqwejwkejqwkejwqkejwqkejqwke</p>',1,1,NULL,NULL),(5,2,4,1,37,1,1,3,'<p>asaasdasdasdasdasdasd</p>\n\n<p>adknasdjkandk</p>\n\n<p>djhasdkljsahk</p>\n\n<p>dhadsajdhlkjadsl</p>\n\n<p>djhasdjhsajlkd</p>\n\n<p>daajjdaklsjdlaks</p>\n\n<p>djsdajdlsjadklas</p>\n\n<p>djaljdahgakhdlrtiqe[wew</p>',1,1,NULL,NULL),(6,2,4,1,37,1,1,3,'<p>ffdsfdfafdadds</p>',1,1,NULL,NULL),(7,2,4,1,37,1,2,3,'<p>what is photosynthesis</p>\n\n<p>convert&nbsp; passive voice into active voice</p>',1,1,NULL,NULL),(8,2,4,1,37,1,2,3,'<p>what is photosynthesis</p>\n\n<p>convert active voice into passive voice</p>',1,1,NULL,NULL),(9,2,4,1,37,1,3,3,'<p>what is photosynthesis??</p>\n\n<p>convert active voice into passive voice</p>\n\n<p>&nbsp;</p>',1,1,NULL,NULL),(10,2,4,1,37,2,2,3,'<p>Expalin about Neutron???</p>\n\n<p>what is photosynthesis</p>',1,1,NULL,NULL),(11,4,4,1,56,2,1,3,'<p>sddasdasdasdds</p>\n\n<p>ytfgsfdfda</p>',1,1,NULL,NULL),(12,4,2,1,52,1,2,1,'<p>RTYRTY</p>',1,1,NULL,NULL),(13,4,2,2,53,2,1,1,'<p>FGHFGH</p>',1,1,NULL,NULL),(14,4,4,1,57,3,1,3,'<p>ERTTRETETETETERTEERT</p>',1,1,NULL,NULL),(15,5,2,1,59,1,1,4,'<p>Section A&nbsp;</p>\n\n<p>1. hi ?</p>\n\n<p><u><strong>2. hello ?</strong></u></p>\n\n<p>3. test ?</p>\n\n<table align=\"left\" border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:100%\">\n	<tbody>\n		<tr>\n			<td>45</td>\n			<td>45</td>\n		</tr>\n		<tr>\n			<td>5</td>\n			<td>&nbsp;</td>\n		</tr>\n		<tr>\n			<td>&nbsp;</td>\n			<td>&nbsp;</td>\n		</tr>\n	</tbody>\n</table>\n\n<p>&nbsp;</p>',1,1,NULL,NULL),(16,1,4,1,2,1,1,3,'<p>dasdasdasdasd</p>',1,1,NULL,NULL),(17,1,4,1,1,1,1,5,'<p>What is photosynthesis</p>',1,1,NULL,NULL),(18,1,12,1,10,1,2,4,'<p>Convert&nbsp; Active voice into passive voice</p>\n\n<p>1. She boought a new scooty</p>',1,1,NULL,NULL),(19,1,6,1,29,1,1,14,'<p>convert actib=ve voice into passive voice</p>',1,1,NULL,NULL),(20,15,2,2,2,1,1,17,'<p>Question 1:</p>\n\n<p>Type you Question here?</p>',1,1,NULL,NULL);
/*!40000 ALTER TABLE `questionbank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questionpapersectionmaster`
--

DROP TABLE IF EXISTS `questionpapersectionmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionpapersectionmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `QuestionpaperSection` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionpapersectionmaster`
--

LOCK TABLES `questionpapersectionmaster` WRITE;
/*!40000 ALTER TABLE `questionpapersectionmaster` DISABLE KEYS */;
INSERT INTO `questionpapersectionmaster` VALUES (1,'Section A(1 Marks)',NULL,1,1,'2018-11-28 04:50:35'),(2,'Section B(2 Marks)',NULL,1,1,'2018-11-28 04:50:53'),(3,'Section C(5 Marks)',NULL,1,1,'2018-11-28 04:51:08');
/*!40000 ALTER TABLE `questionpapersectionmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `referencetypemaster`
--

DROP TABLE IF EXISTS `referencetypemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referencetypemaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `ReferenceType` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifieduserId` int(10) DEFAULT NULL,
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `School_Id` (`School_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `referencetypemaster`
--

LOCK TABLES `referencetypemaster` WRITE;
/*!40000 ALTER TABLE `referencetypemaster` DISABLE KEYS */;
INSERT INTO `referencetypemaster` VALUES (1,2,'Self',NULL,1,NULL,'2018-11-27 09:47:35'),(2,2,'Employee',NULL,1,NULL,'2018-11-27 09:47:50'),(3,2,'Student',NULL,1,NULL,'2018-11-27 09:48:47'),(4,2,'Paper Advertisement',NULL,1,NULL,'2018-12-18 12:03:27'),(5,2,'Media Advertisement',NULL,1,NULL,'2018-12-18 12:12:12'),(6,2,'Others','ss',0,NULL,'2018-12-18 12:27:01'),(7,1,'dsfs',NULL,1,NULL,'2019-08-05 11:54:44'),(8,1,'sadfa',NULL,1,NULL,'2019-08-05 13:54:14'),(9,1,'Paper',NULL,1,NULL,'2019-08-06 11:02:28'),(10,1,'0',NULL,1,NULL,'2019-08-08 12:58:07'),(11,0,'',NULL,1,NULL,'2019-08-22 13:11:37');
/*!40000 ALTER TABLE `referencetypemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `religionmaster`
--

DROP TABLE IF EXISTS `religionmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `religionmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `Religion` varchar(20) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Religion` (`Religion`),
  KEY `School_Id` (`School_Id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `religionmaster`
--

LOCK TABLES `religionmaster` WRITE;
/*!40000 ALTER TABLE `religionmaster` DISABLE KEYS */;
INSERT INTO `religionmaster` VALUES (1,2,'Hindu',NULL,1,1,'2018-11-26 10:41:37'),(2,2,'Christian',NULL,1,1,'2018-11-26 10:41:50'),(3,2,'Muslim',NULL,1,1,'2018-11-26 10:42:00'),(4,1,'Others',NULL,1,1,'2018-11-26 10:42:11'),(5,1,'sdf','dsdfsdf',0,1,'2018-12-30 13:11:16'),(6,1,'Female',NULL,1,1,'2019-08-02 11:10:38'),(7,1,'0',NULL,1,1,'2019-08-08 12:16:43'),(8,1,'',NULL,1,1,'2019-08-22 13:11:36');
/*!40000 ALTER TABLE `religionmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schoolmaster`
--

DROP TABLE IF EXISTS `schoolmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schoolmaster` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `SchoolName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `SchoolPrintName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Address2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CountryId` int(11) DEFAULT NULL,
  `StateId` int(11) DEFAULT NULL,
  `CityId` int(11) DEFAULT NULL,
  `Pincode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ContactNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MobileNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FaxNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Website` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SchoolLogo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhotoName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhotoFullPath` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `FromMonthId` int(11) DEFAULT NULL,
  `ToMonthId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `schoolmaster_countryid_foreign` (`CountryId`),
  KEY `schoolmaster_stateid_foreign` (`StateId`),
  KEY `schoolmaster_cityid_foreign` (`CityId`),
  KEY `FromMonthId` (`FromMonthId`),
  KEY `ToMonthId` (`ToMonthId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schoolmaster`
--

LOCK TABLES `schoolmaster` WRITE;
/*!40000 ALTER TABLE `schoolmaster` DISABLE KEYS */;
INSERT INTO `schoolmaster` VALUES (1,'RKR Hr Sec School','RKR','No 15, Anna nagar','ChinnaveeramPatti',1,1,1,'642112','323123123','23131232','313232312','skp@gmail.com','www.skp.com','Images/1UWXesBld2pScmumGXkQqlkuSuPHqZ0S0pWpBpMu.jpeg','stock-vector-vector-logo-school-427910128.jpg','D:\\SMS Latest\\school\\public\\Uploads\\Images/1UWXesBld2pScmumGXkQqlkuSuPHqZ0S0pWpBpMu.jpeg',NULL,NULL,6,5);
/*!40000 ALTER TABLE `schoolmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section_temp`
--

DROP TABLE IF EXISTS `section_temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `section_temp` (
  `txt` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section_temp`
--

LOCK TABLES `section_temp` WRITE;
/*!40000 ALTER TABLE `section_temp` DISABLE KEYS */;
INSERT INTO `section_temp` VALUES ('3,4');
/*!40000 ALTER TABLE `section_temp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sectionmaster`
--

DROP TABLE IF EXISTS `sectionmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sectionmaster` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(11) NOT NULL,
  `SectionName` varchar(100) NOT NULL,
  `ShortName` varchar(50) DEFAULT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(10) DEFAULT '1',
  `CreatedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `InstitutionId` (`InstitutionId`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sectionmaster`
--

LOCK TABLES `sectionmaster` WRITE;
/*!40000 ALTER TABLE `sectionmaster` DISABLE KEYS */;
INSERT INTO `sectionmaster` VALUES (1,1,'A','',NULL,1,1,NULL),(2,1,'B','','A section',1,1,NULL),(3,1,'C','','b section',1,1,NULL),(4,1,'D','sec','d section',1,1,NULL),(5,1,'0',NULL,NULL,1,1,NULL),(6,1,'',NULL,NULL,1,1,NULL);
/*!40000 ALTER TABLE `sectionmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specificationmaster`
--

DROP TABLE IF EXISTS `specificationmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specificationmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Specification` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Specification` (`Specification`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specificationmaster`
--

LOCK TABLES `specificationmaster` WRITE;
/*!40000 ALTER TABLE `specificationmaster` DISABLE KEYS */;
INSERT INTO `specificationmaster` VALUES (1,'English',NULL,1,1,'2018-11-27 09:40:35'),(2,'Tamil',NULL,1,1,'2018-11-27 09:40:44'),(3,'aa',NULL,1,1,'2018-11-27 09:40:55'),(4,'Co-ordinator',NULL,1,1,'2018-11-27 09:41:12'),(5,'Staff',NULL,1,1,'2018-11-27 09:41:49'),(6,'Admin',NULL,1,1,'2018-11-27 09:42:21');
/*!40000 ALTER TABLE `specificationmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staffsubject`
--

DROP TABLE IF EXISTS `staffsubject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staffsubject` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(20) DEFAULT NULL,
  `StaffId` int(11) NOT NULL,
  `SubjectId` int(11) NOT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUser_Id` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `InstitutionId` (`InstitutionId`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staffsubject`
--

LOCK TABLES `staffsubject` WRITE;
/*!40000 ALTER TABLE `staffsubject` DISABLE KEYS */;
/*!40000 ALTER TABLE `staffsubject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statemaster`
--

DROP TABLE IF EXISTS `statemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statemaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `InsitutionId` int(11) DEFAULT NULL,
  `CountryId` int(11) NOT NULL,
  `StateName` varchar(100) NOT NULL,
  `StateCode` varchar(20) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `CountryId` (`CountryId`),
  KEY `StateName` (`StateName`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statemaster`
--

LOCK TABLES `statemaster` WRITE;
/*!40000 ALTER TABLE `statemaster` DISABLE KEYS */;
INSERT INTO `statemaster` VALUES (8,NULL,5,'tamil nadu','code01',1,1,'2022-02-12 13:29:51'),(9,NULL,5,'Kerala','KL01',1,1,'2022-02-12 15:01:41');
/*!40000 ALTER TABLE `statemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statusmaster`
--

DROP TABLE IF EXISTS `statusmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statusmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `School_Id` int(11) NOT NULL,
  `Status` varchar(10) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Status` (`Status`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statusmaster`
--

LOCK TABLES `statusmaster` WRITE;
/*!40000 ALTER TABLE `statusmaster` DISABLE KEYS */;
INSERT INTO `statusmaster` VALUES (1,2,'Open',NULL,1,1,'2018-11-26 11:00:48'),(2,2,'Closed',NULL,1,1,'2018-11-26 11:00:54'),(3,2,'Submitted',NULL,1,1,'2018-11-28 09:29:51'),(4,2,'Approved',NULL,1,1,'2018-11-28 09:30:02'),(5,2,'Draft',NULL,1,1,'2018-11-28 09:30:15'),(6,2,'Processed',NULL,1,1,'2018-11-28 09:30:26'),(7,2,'Cancelled',NULL,1,1,'2018-11-28 09:30:43'),(8,2,'Rejected',NULL,1,1,'2018-11-28 09:30:57'),(9,1,'Paid',NULL,1,1,'2019-04-01 17:39:22');
/*!40000 ALTER TABLE `statusmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentchildtable`
--

DROP TABLE IF EXISTS `studentchildtable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentchildtable` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `StudentId` int(11) DEFAULT NULL,
  `CourseId` int(11) DEFAULT NULL,
  `SectionId` int(11) DEFAULT NULL,
  `AcademicYearId` int(11) DEFAULT NULL,
  `RollNumber` varchar(100) DEFAULT NULL,
  `FirstLanguageId` int(10) DEFAULT NULL,
  `SecondLanguageId` int(10) DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `CourseId` (`CourseId`),
  KEY `SectionId` (`SectionId`),
  KEY `AcademicYearId` (`AcademicYearId`),
  KEY `StudentId` (`StudentId`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentchildtable`
--

LOCK TABLES `studentchildtable` WRITE;
/*!40000 ALTER TABLE `studentchildtable` DISABLE KEYS */;
INSERT INTO `studentchildtable` VALUES (1,1,13,2,3,NULL,NULL,NULL,1,1),(2,2,13,2,3,NULL,NULL,NULL,1,1),(3,3,11,2,3,NULL,NULL,NULL,1,1),(4,4,0,1,3,NULL,NULL,NULL,1,1),(5,4,13,2,1,NULL,NULL,NULL,1,1),(6,5,11,1,7,'123',NULL,NULL,1,1),(7,6,13,2,7,'258',NULL,NULL,1,1),(8,7,13,2,7,'589',NULL,NULL,1,1),(9,8,12,1,8,NULL,NULL,NULL,1,1),(10,9,11,1,1,NULL,NULL,NULL,1,1),(11,10,11,1,1,NULL,NULL,NULL,1,1),(12,11,11,1,1,NULL,NULL,NULL,1,1),(13,12,11,0,1,NULL,NULL,NULL,1,1),(14,13,11,1,1,NULL,NULL,NULL,1,1),(15,14,11,1,1,NULL,NULL,NULL,1,1),(16,15,11,1,1,NULL,NULL,NULL,1,1),(17,16,11,1,1,NULL,NULL,NULL,1,1),(18,17,11,1,1,NULL,NULL,NULL,1,1),(19,18,11,2,1,NULL,NULL,NULL,1,1),(20,19,12,0,1,NULL,NULL,NULL,1,1),(21,20,11,0,1,NULL,NULL,NULL,1,1),(22,21,11,0,1,NULL,NULL,NULL,1,1),(23,22,11,0,1,NULL,NULL,NULL,1,1),(24,23,11,2,1,NULL,NULL,NULL,1,1),(25,24,11,0,1,NULL,NULL,NULL,1,1),(26,25,12,1,1,NULL,NULL,NULL,1,1),(27,26,11,3,1,NULL,NULL,NULL,1,1),(28,27,11,2,1,NULL,NULL,NULL,1,1),(29,28,11,2,1,NULL,NULL,NULL,1,1),(30,29,11,3,1,NULL,NULL,NULL,1,1),(31,30,11,1,1,NULL,NULL,NULL,1,1),(32,32,2,0,15,'232',NULL,NULL,1,1),(33,33,5,2,15,NULL,NULL,NULL,1,1),(34,34,6,0,15,NULL,NULL,NULL,1,1),(35,35,4,1,15,NULL,NULL,NULL,1,1),(36,36,5,1,15,NULL,NULL,NULL,1,1),(37,37,6,0,15,NULL,NULL,NULL,1,1),(38,38,7,0,15,NULL,NULL,NULL,1,1),(39,39,6,2,15,NULL,NULL,NULL,1,1),(40,40,5,0,15,NULL,NULL,NULL,1,1),(41,41,4,0,15,NULL,NULL,NULL,1,1),(42,42,6,0,15,NULL,NULL,NULL,1,1);
/*!40000 ALTER TABLE `studentchildtable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentdetailshistory`
--

DROP TABLE IF EXISTS `studentdetailshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentdetailshistory` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `StudentId` int(10) unsigned DEFAULT NULL,
  `RollNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FirstLanguage` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SecondLanguage` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Medium` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Course` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Section` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AcademicYearId` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `studentdetailshistory_studentnoid_foreign` (`StudentId`),
  KEY `studentdetailshistory_academicyearid_foreign` (`AcademicYearId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentdetailshistory`
--

LOCK TABLES `studentdetailshistory` WRITE;
/*!40000 ALTER TABLE `studentdetailshistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `studentdetailshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentdetailsmaster`
--

DROP TABLE IF EXISTS `studentdetailsmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentdetailsmaster` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `StudentId` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `AdmissionNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `AdmissionDate` date NOT NULL,
  `FirstName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `MiddleName` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `StudentName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `StudentPhoto` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FileName` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhotoFullPath` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhotoLocation` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhotoName` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DOB` date NOT NULL,
  `FatherName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MotherName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GuardianName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GenderId` int(10) unsigned NOT NULL,
  `ReligionId` int(10) unsigned NOT NULL,
  `CasteId` int(10) unsigned NOT NULL,
  `CommunityId` int(10) unsigned NOT NULL,
  `MotherTongueId` int(10) unsigned NOT NULL,
  `BloodGroupId` int(10) unsigned DEFAULT NULL,
  `IdentityMark` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `RegisterNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SSN_UID_Number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SMobileNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `SEmail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AadharNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AcademicYearId` int(10) unsigned NOT NULL,
  `MediumId` int(10) unsigned NOT NULL,
  `CourseId` int(11) NOT NULL,
  `SectionId` int(11) DEFAULT NULL,
  `Father_QualificationId` int(11) DEFAULT NULL,
  `FOccupation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FSSN_UID_Number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FMobileNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FEmail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MOccupation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mother_QualificationId` int(11) DEFAULT NULL,
  `MSSN_UID_Number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MMobileNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MEmail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GOccupation` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Guardian_QualificationId` int(11) DEFAULT NULL,
  `GSSN_UID_Number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GMobileNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GEmail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RAddress1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RAddress2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RAddress3` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LocationId` int(10) unsigned DEFAULT NULL,
  `RDistrict` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RLandmark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RPinCode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `StateId` int(10) unsigned DEFAULT NULL,
  `CountryId` int(10) unsigned DEFAULT NULL,
  `Communicationaddress` tinyint(4) DEFAULT NULL,
  `DifferentAddress` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PAddress1` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PAddress2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PAddress3` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PDistrict` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PLandmark` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PPinCode` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PermanentStateName` int(10) DEFAULT NULL,
  `PermanentCountryName` int(10) DEFAULT NULL,
  `PermanentCityName` int(10) DEFAULT NULL,
  `AnnualIncome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AccountName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AccountNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BankNameId` int(10) unsigned DEFAULT NULL,
  `BranchNameId` int(10) unsigned DEFAULT NULL,
  `IFSC_Code` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MICR_Number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `InstituteName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `YearId` int(10) unsigned DEFAULT NULL,
  `MediumPreviousId` int(10) DEFAULT NULL,
  `CoursePreviousId` int(10) DEFAULT NULL,
  `TC_Number` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MarksObtained` decimal(4,2) DEFAULT NULL,
  `Address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `Remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `Eligibility` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Eligible` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `ReferenceTypeId` int(10) unsigned DEFAULT NULL,
  `Emp_Id` int(11) DEFAULT NULL,
  `Stu_Id` int(11) DEFAULT NULL,
  `Others` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `OthersId` int(11) DEFAULT NULL,
  `DocumentId` int(10) unsigned DEFAULT NULL,
  `LoginName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SecondLanguage` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FirstLanguage` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RollNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `FamilyDoctorName` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FamilyDoctorNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FamilyDoctorAddress` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Father_CommunicationNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Father_CommunicationEmail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Father_OrganisationName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Father_OrganisationNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Father_OrganisationAddress` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mother_CommunicationNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mother_CommunicationEmail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mother_OrganisationName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mother_OrganisationNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mother_OrganisationAddress` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Guardian_CommunicationNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Guardian_CommunicationEmail` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Guardian_OrganisationName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Guardian_OrganisationNumber` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Guardian_OrganisationAddress` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HealthIssue` tinyint(4) DEFAULT NULL,
  `HealthIssueType` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IdentityMark2` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Remarks2` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SchoolId` int(11) DEFAULT NULL,
  `ApplicationNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `StudentCategoryId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `studentdetailsmaster_memail_unique` (`MEmail`),
  UNIQUE KEY `studentdetailsmaster_gemail_unique` (`GEmail`),
  UNIQUE KEY `studentdetailsmaster_femail_unique` (`FEmail`),
  UNIQUE KEY `studentdetailsmaster_semail_unique` (`SEmail`),
  KEY `studentdetailsmaster_genderid_foreign` (`GenderId`),
  KEY `studentdetailsmaster_religionid_foreign` (`ReligionId`),
  KEY `studentdetailsmaster_casteid_foreign` (`CasteId`),
  KEY `studentdetailsmaster_communityid_foreign` (`CommunityId`),
  KEY `studentdetailsmaster_mothertongueid_foreign` (`MotherTongueId`),
  KEY `studentdetailsmaster_bloodgroupid_foreign` (`BloodGroupId`),
  KEY `studentdetailsmaster_academicyearid_foreign` (`AcademicYearId`),
  KEY `studentdetailsmaster_mediumid_foreign` (`MediumId`),
  KEY `studentdetailsmaster_locationid_foreign` (`LocationId`),
  KEY `studentdetailsmaster_stateid_foreign` (`StateId`),
  KEY `studentdetailsmaster_countryid_foreign` (`CountryId`),
  KEY `studentdetailsmaster_banknameid_foreign` (`BankNameId`),
  KEY `studentdetailsmaster_branchnameid_foreign` (`BranchNameId`),
  KEY `studentdetailsmaster_yearid_foreign` (`YearId`),
  KEY `studentdetailsmaster_referencetypeid_foreign` (`ReferenceTypeId`),
  KEY `studentdetailsmaster_documentid_foreign` (`DocumentId`),
  KEY `Father_QualificationId` (`Father_QualificationId`),
  KEY `Mother_QualificationId` (`Mother_QualificationId`),
  KEY `Guardian_QualificationId` (`Guardian_QualificationId`),
  KEY `CourseId` (`CourseId`),
  KEY `SectionId` (`SectionId`),
  KEY `MediumPreviousId` (`MediumPreviousId`),
  KEY `CoursePreviousId` (`CoursePreviousId`),
  KEY `StudentCategoryId` (`StudentCategoryId`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentdetailsmaster`
--

LOCK TABLES `studentdetailsmaster` WRITE;
/*!40000 ALTER TABLE `studentdetailsmaster` DISABLE KEYS */;
INSERT INTO `studentdetailsmaster` VALUES (1,'vb37','12','2019-01-24','Vaishnavi',NULL,'M','Vaishnavi  M',NULL,NULL,NULL,NULL,NULL,'1996-10-30',NULL,NULL,NULL,1,0,0,2,1,0,'xxx',NULL,NULL,'9852148',NULL,NULL,3,2,13,2,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(2,'vb73','345','2019-01-24','Bharathi',NULL,'T','Bharathi  T',NULL,NULL,NULL,NULL,NULL,'1995-12-24',NULL,NULL,NULL,2,0,0,2,1,0,'yyy',NULL,NULL,'85059784',NULL,NULL,3,2,13,2,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(3,'dd01','1245','2019-01-24','Dharani',NULL,'Dharan','Dharani  Dharan',NULL,NULL,NULL,NULL,NULL,'1998-01-27',NULL,NULL,NULL,2,0,0,2,1,0,'xxx',NULL,NULL,'2235656',NULL,NULL,3,1,11,2,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(4,'hsdgf','56454','2019-01-24','Test',NULL,'TT','Test  TT','Images/0pGujcsB5MS91RyIJafrD4V9qa7x6VgNf259HFmz.jpeg',NULL,'D:\\SMS Latest\\school\\public\\Uploads\\Images/0pGujcsB5MS91RyIJafrD4V9qa7x6VgNf259HFmz.jpeg',NULL,'page_1_thumb_large.jpg','2012-01-20',NULL,NULL,NULL,5,0,0,4,2,0,'23443',NULL,NULL,'2355',NULL,NULL,1,2,13,2,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,0,'1',NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'1',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1),(5,'123456','544254412','2019-01-26','Prema',NULL,'Mahendran','Prema  Mahendran',NULL,NULL,NULL,NULL,NULL,'2014-01-23',NULL,NULL,NULL,1,0,0,2,1,0,'xxx',NULL,NULL,'75845784',NULL,NULL,7,2,11,1,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'45645','456456',NULL,11,NULL,NULL,'4564564564',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,14,NULL,NULL,NULL,0,NULL,NULL,NULL,'123',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'123',1),(30,'30','eer','2019-02-11','testr',NULL,'d','testr  d','Images/CPhvTshWgkXKLnAhw00hZXZynjtini7fctI08Cto.png',NULL,'D:\\SMS Latest\\school\\public\\Uploads\\Images/CPhvTshWgkXKLnAhw00hZXZynjtini7fctI08Cto.png',NULL,'deleteNewIcon (1).png','1995-05-16',NULL,NULL,NULL,5,0,0,4,2,0,'45345',NULL,NULL,'345345435',NULL,NULL,1,1,11,1,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,0,'1',NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'1',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1),(31,'1','1','2022-02-18','praba',NULL,'G','praba  G',NULL,NULL,NULL,NULL,NULL,'2000-02-15',NULL,NULL,NULL,1,0,0,4,1,0,'mole',NULL,NULL,'98989898',NULL,NULL,15,2,2,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1),(32,'32','2','2022-02-18','ajay U',NULL,'G','ajay U  G',NULL,NULL,NULL,NULL,NULL,'2000-02-15',NULL,NULL,NULL,1,0,0,4,1,0,'mole',NULL,NULL,'98989898',NULL,NULL,15,2,2,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,0,'1',NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'1',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,'232',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2),(33,'000001','000001','2022-02-20','AADIL',NULL,'BAIG MIRZA','AADIL  BAIG MIRZA',NULL,NULL,NULL,NULL,NULL,'1999-11-21',NULL,NULL,NULL,2,0,0,3,3,0,'scar on left hand',NULL,NULL,'8959458693',NULL,NULL,15,2,5,2,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(34,'000002','000002','2022-02-20','AAFREEN',NULL,'KHANAM','AAFREEN  KHANAM',NULL,NULL,NULL,NULL,NULL,'1999-02-22',NULL,NULL,NULL,1,0,0,3,3,0,'mole on right chin',NULL,NULL,'8462864951',NULL,NULL,15,2,6,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(35,'000003','000003','2022-02-20','AAFREEN',NULL,'s k','AAFREEN  s k',NULL,NULL,NULL,NULL,NULL,'1999-12-31',NULL,NULL,NULL,1,0,0,2,1,0,'mole in right chin',NULL,NULL,'8461016658',NULL,NULL,15,2,4,1,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(36,'000004','000004','2022-02-20','AAKANKSHA',NULL,'KATARIA','AAKANKSHA  KATARIA',NULL,NULL,NULL,NULL,NULL,'2000-02-14',NULL,NULL,NULL,1,0,0,1,7,0,'scar on left leg',NULL,NULL,'7869465889',NULL,NULL,15,2,5,1,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(37,'000005','000005','2022-02-20','AAKASH',NULL,'PANWAR','AAKASH  PANWAR',NULL,NULL,NULL,NULL,NULL,'2002-10-15',NULL,NULL,NULL,2,0,0,2,3,0,'mole on right knee',NULL,NULL,'8109687806',NULL,NULL,15,4,6,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(38,'000006','000006','2022-02-20','AAMIN',NULL,'MANSURI','AAMIN  MANSURI',NULL,NULL,NULL,NULL,NULL,'2002-01-09',NULL,NULL,NULL,1,0,0,3,6,0,'scar on left cheek',NULL,NULL,'9753882622',NULL,NULL,15,2,7,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(39,'000007','000007','2022-02-20','AARADHANA',NULL,'UPADHYAYA','AARADHANA  UPADHYAYA',NULL,NULL,NULL,NULL,NULL,'2002-06-11',NULL,NULL,NULL,1,0,0,1,1,0,'mole on left wrist',NULL,NULL,'7692889214',NULL,NULL,15,1,6,2,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(40,'000008','000008','2022-02-20','AARATI',NULL,'R J','AARATI  R J',NULL,NULL,NULL,NULL,NULL,'2001-09-05',NULL,NULL,NULL,1,0,0,4,1,0,'scaR on right leg',NULL,NULL,'8819844893',NULL,NULL,15,2,5,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(41,'000009','000009','2022-02-20','ARUN',NULL,'SINGH','ARUN  SINGH',NULL,NULL,NULL,NULL,NULL,'2002-02-26',NULL,NULL,NULL,2,0,0,7,3,0,'---',NULL,NULL,'9754199415',NULL,NULL,15,2,4,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(42,'000010','000010','2022-02-20','ARVIND',NULL,'J SHARMA','ARVIND  J SHARMA',NULL,NULL,NULL,NULL,NULL,'2001-11-20',NULL,NULL,NULL,2,0,0,1,3,0,'mole on left wrist',NULL,NULL,'9755688215',NULL,NULL,15,2,6,0,0,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,0,0,NULL,NULL,NULL,0,0,0,NULL,NULL,NULL,NULL,'0',NULL,NULL,1,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `studentdetailsmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentdocumentdetails`
--

DROP TABLE IF EXISTS `studentdocumentdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentdocumentdetails` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `DocumentTypeId` int(10) unsigned NOT NULL,
  `StudentId` int(10) unsigned NOT NULL,
  `DocumentLocation` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `DocumentName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `DocumentFullPath` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `documentsdetailsmaster_documenttypeid_foreign` (`DocumentTypeId`),
  KEY `documentsdetailsmaster_studentid_foreign` (`StudentId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentdocumentdetails`
--

LOCK TABLES `studentdocumentdetails` WRITE;
/*!40000 ALTER TABLE `studentdocumentdetails` DISABLE KEYS */;
INSERT INTO `studentdocumentdetails` VALUES (1,1,30,'Images/wF4BtTEpBWDnr40ZvkSWlOvJ0RNuHBDEMamAf6ap.txt','controller.js','D:\\SMS Latest\\school\\public\\Uploads\\Images/wF4BtTEpBWDnr40ZvkSWlOvJ0RNuHBDEMamAf6ap.txt',NULL,NULL),(2,2,30,'Images/qhnKWyDDUD4q0y74kB9R8TLiPTnQSUrzUXsMn4AB.xlsx','FeeCollectionBillWiseReport (4).xlsx','D:\\SMS Latest\\school\\public\\Uploads\\Images/qhnKWyDDUD4q0y74kB9R8TLiPTnQSUrzUXsMn4AB.xlsx',NULL,NULL);
/*!40000 ALTER TABLE `studentdocumentdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentenrollment`
--

DROP TABLE IF EXISTS `studentenrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentenrollment` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `StudentId` int(11) DEFAULT NULL,
  `CourseId` int(11) DEFAULT NULL,
  `SectionId` int(11) DEFAULT NULL,
  `AcademicYearId` int(11) DEFAULT NULL,
  `ExamId` int(11) DEFAULT NULL,
  `EnrollmentNumber` varchar(100) DEFAULT NULL,
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `CourseId` (`CourseId`),
  KEY `SectionId` (`SectionId`),
  KEY `AcademicYearId` (`AcademicYearId`),
  KEY `StudentId` (`StudentId`),
  KEY `ExamId` (`ExamId`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentenrollment`
--

LOCK TABLES `studentenrollment` WRITE;
/*!40000 ALTER TABLE `studentenrollment` DISABLE KEYS */;
INSERT INTO `studentenrollment` VALUES (35,32,2,0,15,17,'Ann1001990',1),(36,32,2,0,15,16,'Ann1001991',1);
/*!40000 ALTER TABLE `studentenrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(20) DEFAULT NULL,
  `AcademicYearId` int(10) unsigned DEFAULT NULL,
  `CourseId` int(10) unsigned NOT NULL,
  `Subjectname` int(5) DEFAULT NULL,
  `SubjectParentId` int(11) DEFAULT NULL,
  `SubjectTypeId` int(10) unsigned NOT NULL,
  `Remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `HasChild` int(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `subject_academicyearid_foreign` (`AcademicYearId`),
  KEY `subject_courseid_foreign` (`CourseId`),
  KEY `subject_subjecttypeid_foreign` (`SubjectTypeId`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (53,1,15,2,2,0,1,'test',1,1,NULL,NULL,0),(55,1,15,3,2,0,1,NULL,1,1,NULL,NULL,0),(56,1,15,3,1,0,1,'test',1,1,NULL,NULL,0),(57,1,15,2,1,0,1,'test',1,1,NULL,NULL,0);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectdetails`
--

DROP TABLE IF EXISTS `subjectdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectdetails` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(20) DEFAULT NULL,
  `ExamSubjectId` int(11) NOT NULL,
  `SubjectId` int(11) NOT NULL,
  `pass` decimal(12,2) DEFAULT NULL,
  `Total` decimal(12,2) DEFAULT NULL,
  `Orderby` int(10) DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `fk_l_id` (`SubjectId`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectdetails`
--

LOCK TABLES `subjectdetails` WRITE;
/*!40000 ALTER TABLE `subjectdetails` DISABLE KEYS */;
INSERT INTO `subjectdetails` VALUES (46,1,14,2,51.00,100.00,0,1),(47,1,16,1,35.00,100.00,0,1),(48,1,16,2,35.00,100.00,1,1),(49,1,17,1,70.00,200.00,0,1),(50,1,17,2,70.00,200.00,1,1);
/*!40000 ALTER TABLE `subjectdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectmaster`
--

DROP TABLE IF EXISTS `subjectmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectmaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(11) NOT NULL,
  `SubjectName` varchar(100) DEFAULT NULL,
  `ShortName` varchar(100) DEFAULT NULL,
  `SubjectCode` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModiifiedUserId` int(11) NOT NULL DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `SubjectCode_UNIQUE` (`SubjectCode`),
  KEY `InstitutionId` (`InstitutionId`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectmaster`
--

LOCK TABLES `subjectmaster` WRITE;
/*!40000 ALTER TABLE `subjectmaster` DISABLE KEYS */;
INSERT INTO `subjectmaster` VALUES (1,1,'Tamil','Tam','T101',NULL,1,1,'2018-11-26 09:54:44'),(2,1,'English','Eng','E101',NULL,1,1,'2018-11-26 09:54:57');
/*!40000 ALTER TABLE `subjectmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjecttype`
--

DROP TABLE IF EXISTS `subjecttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjecttype` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(11) NOT NULL,
  `SubjectType` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) NOT NULL DEFAULT '1',
  `ModifiedUserId` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `InstitutionId` (`InstitutionId`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjecttype`
--

LOCK TABLES `subjecttype` WRITE;
/*!40000 ALTER TABLE `subjecttype` DISABLE KEYS */;
INSERT INTO `subjecttype` VALUES (1,1,'Theory',NULL,1,1),(2,1,'Practical','s',1,1),(3,2,'Compulsory','s',1,1),(4,2,'Optional','ss',1,1);
/*!40000 ALTER TABLE `subjecttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titlemaster`
--

DROP TABLE IF EXISTS `titlemaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `titlemaster` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(10) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(11) DEFAULT '1',
  `ModifiedUserId` int(11) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Title` (`Title`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titlemaster`
--

LOCK TABLES `titlemaster` WRITE;
/*!40000 ALTER TABLE `titlemaster` DISABLE KEYS */;
INSERT INTO `titlemaster` VALUES (1,'Mr.',NULL,1,1,'2017-12-30 13:03:12'),(2,'Mrs.',NULL,1,1,'2017-12-30 13:03:23'),(3,'hi',NULL,0,1,'2018-06-26 09:51:59'),(4,'Miss',NULL,0,1,'2019-01-12 12:37:10'),(5,'A',NULL,1,1,'2019-01-12 12:37:50');
/*!40000 ALTER TABLE `titlemaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yearmaster`
--

DROP TABLE IF EXISTS `yearmaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yearmaster` (
  `Id` int(10) NOT NULL AUTO_INCREMENT,
  `InstitutionId` int(11) NOT NULL,
  `Year` varchar(100) NOT NULL,
  `Description` varchar(250) DEFAULT NULL,
  `IsActive` int(10) DEFAULT '1',
  `ModifiedUserId` int(10) DEFAULT '1',
  `CreatedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yearmaster`
--

LOCK TABLES `yearmaster` WRITE;
/*!40000 ALTER TABLE `yearmaster` DISABLE KEYS */;
INSERT INTO `yearmaster` VALUES (1,1,'2020',NULL,1,1,NULL),(2,1,'2021',NULL,1,1,NULL);
/*!40000 ALTER TABLE `yearmaster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'oems'
--

--
-- Dumping routines for database 'oems'
--
/*!50003 DROP PROCEDURE IF EXISTS `AcademicPeriod_DuplicateCheck` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AcademicPeriod_DuplicateCheck`(
`p_Id` INT, 
`p_FromYearId` int,
`p_ToYearId` int,
`p_InstitutionId` int)
BEGIN
      if exists(select Id from academicyearmaster
       where FromYearId=p_FromYearId and ToYearId=p_ToYearId  and InstitutionId = p_InstitutionId
       and Id not in (p_Id))
Then
begin
       select 1 val;
       end;
       else
       begin
       select 2 val;
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AcademicYearList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AcademicYearList`(
p_AcademicYearId int,
p_IsActive int,
p_InstitutionId int)
BEGIN
select
AY.Id,
AY.AcademicYear,
AY.FromYearId,
AY.ToYearId,
AY.Status,
AY.Description,
AY.IsActive,
YM.Year as FromYear,
Y.Year as ToYear,
AY.AcademicFlag
 
from 
AcademicYearMaster AY
left join YearMaster as YM on YM.Id = AY.FromYearId 
left join YearMaster as Y on Y.Id = AY.ToYearId 
inner join institution I on I.Id = AY.InstitutionId
where
  (AY.Id =  p_AcademicYearId or ifnull( p_AcademicYearId,0)=0) and 
    (AY.IsActive =  p_IsActive or ifnull( p_IsActive,-1)=-1)and 
     (AY.InstitutionId =  p_InstitutionId) 
    Order by
    AY.AcademicFlag desc,
    AY.FromYearId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AcademicYear_BasedCourseList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AcademicYear_BasedCourseList`(
`p_AcademicYearId` INT,
`p_InstitutionId` int)
BEGIN
select
CS.CourseId AS Id,
CM.Course,
CM.IsActive
from
coursesection as CS
join CourseMaster as CM on CS.CourseId = CM.Id
inner join Institution I on I.Id = CS.InstitutionId
where
CS.AcademicYearId = p_AcademicYearId and
CS.InstitutionId =p_InstitutionId
Group by
AcademicYearId,CourseId;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AcademicYear_DefaultCheck` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AcademicYear_DefaultCheck`(
`p_Id` int,
`p_AcademicFlag` int,
`p_InstitutionId` int
)
BEGIN
      if exists(select AcademicFlag from academicyearmaster
       where AcademicFlag=p_AcademicFlag  and InstitutionId = p_InstitutionId and Id not in(p_Id)
       )
Then
begin
       select 1 val,
       Id,
       AcademicYear From
       AcademicYearMaster
       where
       AcademicFlag=p_AcademicFlag;
       end;
       else
       begin
       select 2 val;
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AcademicYear_DefaultYear_Update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AcademicYear_DefaultYear_Update`(
`p_Id` int)
BEGIN
Update
AcademicYearMaster
set
AcademicFlag = 0
where
Id=p_Id;   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AcademicYear_DuplicateCheck` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AcademicYear_DuplicateCheck`(
`p_Id` INT, 
`p_AcademicYear` NVARCHAR(100),
`p_InstitutionId` int)
BEGIN
      if exists(select Id from academicyearmaster
       where AcademicYear=p_AcademicYear and InstitutionId =p_InstitutionId
       and Id not in (p_Id))
Then
begin
       select 1 val;
       end;
       else
       begin
       select 2 val;
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Academic_Active` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Academic_Active`(
p_Id int)
BEGIN
Update 
AcademicYearMaster 
set
IsActive = 1
where
Id = p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Academic_AddEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Academic_AddEdit`(
`p_Id` INT, 
`p_AcademicYear` nvarchar(200), 
`p_FromYearId` int, 
`p_ToYearId` int, 
`p_Description` nvarchar(250), 
`p_Status` tinyint,
`p_AcademicFlag` int,
`p_InstitutionId` int
)
BEGIN
      if exists(select Id from academicyearmaster
       where AcademicYear=p_AcademicYear and InstitutionId = p_InstitutionId
       )
Then
begin
	Update 
			academicyearmaster
		Set 
			AcademicYear = p_AcademicYear,
            FromYearId = p_FromYearId,
            ToYearId = p_ToYearId,
            Description = p_Description,
            Status = p_Status,
            AcademicFlag = p_AcademicFlag,
            InstitutionId = p_InstitutionId          
        Where 
				AcademicYear=p_AcademicYear and FromYearId=p_FromYearId  and ToYearId =p_ToYearId and InstitutionId = p_InstitutionId;
     
       end;
       else
       begin
      
		  INSERT INTO	
        academicyearmaster
        (
			AcademicYear,
            FromYearId,
            ToYearId,
            Description,
            Status,
            AcademicFlag,
            InstitutionId
        )
		VALUES
		(
			p_AcademicYear,
			p_FromYearId,
            p_ToYearId,
			p_Description,
            p_Status,
            p_AcademicFlag,
            p_InstitutionId
        ); 
       end;
End if;
 SELECT  p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Academic_InActive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Academic_InActive`(
p_Id int)
BEGIN
Update 
AcademicYearMaster 
set
IsActive = 0
where
Id = p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Academic_View` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Academic_View`(`p_Id` INT)
BEGIN
select
AY.Id,
AY.AcademicYear,
AY.FromYearId,
AY.ToYearId,
AY.Status,
AY.Description,
AY.IsActive,
YM.Year as FromYear,
Y.Year as ToYear,
AY.AcademicFlag as IsDefault 
from AcademicYearMaster AY
inner Join YearMaster as YM on AY.FromYearId= YM.Id
inner Join YearMaster as Y on AY.ToYearId=Y.Id
where AY.Id =p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Admin_Exam_SP_Delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Exam_SP_Delete`(
`p_ExamNameId` INT,
`p_InstitutionId` int
)
BEGIN
     if exists(select Id from ExamSubject
      where p_ExamNameId=ExamNameId and InstitutionId = p_InstitutionId)
Then
begin
      select 1 val;
      end;
      else
      begin
     delete from exammaster
     where
     Id = p_ExamNameId;
     select 2 val;
      end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Admin_Organiser_AcademicYear_DefaultYear_Update` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Organiser_AcademicYear_DefaultYear_Update`(
`p_Id` int)
BEGIN
Update
AcademicYearMaster
set
AcademicFlag = 0
where
Id=p_Id;   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Admin_Subject_SP_Delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Admin_Subject_SP_Delete`(
`p_SubjectNameId` INT)
BEGIN
    if exists(select Id from subjectdetails
     where p_SubjectNameId=SubjectId)
Then
begin
     select 1 val;
     end;
     else if(select Id from staffsubject
     where p_SubjectNameId=SubjectId)
     then
     begin
    select 2 val;
    end;
     else if(select Id from classtimetablechild
     where p_SubjectNameId=SubjectId)
     then
     begin
    select 3 val;
    end;
     else
     delete from subject
     where p_SubjectNameId = Id;
     select 4 val;
     end if;
End if;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AdmissionNumber_DuplicateCheck` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AdmissionNumber_DuplicateCheck`(
`p_Id` INT, 
`p_AdmissionNumber` nvarchar(255))
BEGIN
      if exists(select Id from StudentDetailsMaster
       where AdmissionNumber=p_AdmissionNumber
       and Id not in (p_Id))
Then
begin
       select 1 val;
       end;
       else
       begin
       select 2 val;
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AssignEnrollmentNumber_AddEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AssignEnrollmentNumber_AddEdit`(`p_StudentId` INT, `p_AcademicYearId` INT, `p_ExamId` INT, `p_EnrollmentNumber` VARCHAR(150))
BEGIN
if exists(select Id from studentenrollment
where AcademicYearId=p_AcademicYearId and ExamId = p_ExamId
and StudentId = p_StudentId)
Then
begin
	Update 
			studentenrollment
		Set 
			EnrollmentNumber = p_EnrollmentNumber
        Where 
			StudentId=p_StudentId 
            and AcademicYearId=p_AcademicYearId
			and ExamId = p_ExamId;     
   end;
   else
   begin      
	  INSERT INTO	
        studentenrollment
        (
			StudentId,
            AcademicYearId,
            EnrollmentNumber,
            ExamId, CourseId, SectionId
            
        )
		select p_StudentId,
            p_AcademicYearId,
			p_EnrollmentNumber,
            p_ExamId, CourseId, SectionId
        from StudentDetailsMaster
        where id=p_StudentId;
        set p_StudentId = last_insert_id();
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `AssignRollNumber_AddEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AssignRollNumber_AddEdit`(`p_Id` INT, `p_StudentId` INT, `p_AcademicYearId` INT, `p_RollNumber` VARCHAR(150),
 `p_FirstLanguage` int, `p_SecondLanguage`int )
BEGIN
      if exists(select Id from StudentChildTable
       where AcademicYearId=p_AcademicYearId and StudentId=p_StudentId
       and Id not in (p_Id))
Then
begin
	Update 
			StudentChildTable
		Set 
			RollNumber = p_RollNumber,
            FirstLanguageId = p_FirstLanguage,
            SecondLanguageId = p_SecondLanguage
            
          
        Where 
				StudentId=p_StudentId and AcademicYearId=p_AcademicYearId;
     
       end;
       else
       begin
      
		  INSERT INTO	
        StudentChildTable
        (
			StudentId,
            AcademicYearId,
            RollNumber,
            FirstLanguageId,
            SecondLanguageId
            
        )
		VALUES
		(
			p_StudentId,
            p_AcademicYearId,
			p_RollNumber,
            p_FirstLanguage,
            p_SecondLanguage
        ); 
        set p_StudentId = last_insert_id();
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CommonTable_SP_Select` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CommonTable_SP_Select`()
BEGIN
	SELECT
		Id, 
		UITableName,
		DBTableName
	FROM 
		CommonTable CT
	Where
		CT.Active = 1
	order by 
    CT.UITableName;	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Common_CourseList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Common_CourseList`(
`p_InstitutionId` int)
BEGIN
select
CM.Id,
CM.Course,
CM.IsActive
from
CourseMaster CM
inner join institution I on I.Id= CM.InstitutionId
where
CM.InstitutionId = p_InstitutionId
order By Course asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Common_SectionList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Common_SectionList`(
`p_InstitutionId` int)
BEGIN
select
SM.Id,
SM.SectionName,
SM.IsActive
from
SectionMaster SM
inner join institution I on I.Id= SM.InstitutionId
where
SM.InstitutionId = p_InstitutionId
order By SectionName asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Common_SubjectNameList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Common_SubjectNameList`(
`p_InstitutionId` int)
BEGIN
select
SM.Id,
SM.SubjectName,
SM.IsActive

from 
subjectmaster SM

inner join Institution I on I.Id = SM.InstitutionId

where
SM.InstitutionId=p_InstitutionId

order By SubjectName asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseBasedExamName` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseBasedExamName`(
`p_AcademicYearId` int,
`p_CourseId` int
)
BEGIN
	SELECT 
   ES.Id,
   ES.AcademicYearId,
   ES.CourseId,
   ES.ExamNameId,
   EM.ExamName
	

    FROM 
    ExamSubject as ES
   
   
   
   left join ExamMaster  EM on ES.ExamNameId=EM.Id  
  
   
     where
    AcademicYearId = p_AcademicYearId and  ES.CourseId=p_CourseId
    
    order by
     EM.ExamName;
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseBasedSubjectList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseBasedSubjectList`(`p_AcademicYearId` int,`p_CourseId` INT)
BEGIN
	SELECT 
    SM.Id,
   cs.SectionId,
   SM.SectionName
    FROM 
    CourseSection as cs
     LEFT JOIN SectionMaster SM on cs.SectionId=SM.Id
     where
     cs.CourseId=p_CourseId and p_AcademicYearId = cs.AcademicYearId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseBasedSubjects` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseBasedSubjects`(
p_AcademicYearId int,
p_CourseId int,
p_InstitutionId int
)
BEGIN
select
SM.Id,
SM.SubjectName

from 
subject as S
inner join subjectMaster SM on SM.Id = s.SubjectName
inner join Institution I on I.Id = S.InstitutionId
where AcademicYearId = p_AcademicYearId and CourseId = p_CourseId and S.InstitutionId = p_InstitutionId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseBasedSubjectsforExamSubject` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseBasedSubjectsforExamSubject`(
p_AcademicYearId int,
p_CourseId int,
p_InstitutionId int
)
BEGIN
select
(select count(S.SubjectParentId) from subject S
where S.AcademicYearId = p_AcademicYearId and S.CourseId = p_CourseId and S.SubjectParentId != 0)  as count ,
S.SubjectName as Id,
S.SubjectParentId,
SM.SubjectName
from
subject as S
join SubjectMaster as SM on SM.Id = S.SubjectName
inner join Institution I on I.Id =S.InstitutionId
    
where
 S.AcademicYearId = p_AcademicYearId and S.CourseId = p_CourseId
 and 
 (S.InstitutionId=p_InstitutionId)
order by 
			(case when S.SubjectParentId=0 then S.SubjectName else S.SubjectParentId end), 
			(case when S.SubjectParentId=0 then 0 else 1 end), S.SubjectName;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseSectionEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseSectionEdit`(`p_AcademicYearId` INT, `p_CourseId` int,
`p_SectionId` int,
`p_InstitutionId` int)
BEGIN
      if not exists(select Id from CourseSection
       where AcademicYearId=p_AcademicYearId and CourseId = p_CourseId and SectionId=p_SectionId)
Then
begin
 INSERT INTO	
        CourseSection
        (
            AcademicYearId,
            CourseId,
            SectionId,
            InstitutionId
        )
		VALUES
		(
            p_AcademicYearId,
			p_CourseId,
            p_SectionId,
            p_InstitutionId
        ); 
       end;
End if;
 select Id from CourseSection
       where AcademicYearId=p_AcademicYearId and CourseId = p_CourseId and SectionId=p_SectionId;
       END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseSection_Active` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseSection_Active`(
p_AcademicYearId int,
p_CourseId Int)
BEGIN
Update 
CourseSection CS
set
IsActive = 1
where
CS.AcademicYearId = p_AcademicYearId and CourseId = p_CourseId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseSection_AddEdit_SP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseSection_AddEdit_SP`(
`p_Id` INT,
 `p_AcademicYearId` INT,
 `p_CourseId` VARCHAR(100),
 `p_SectionId` VARCHAR(100),
 `p_InstitutionId` int)
begin
			drop table if exists course_temp;
			create table course_temp(txt varchar(255));
			insert into course_temp values(p_CourseId);
            
			drop temporary table if exists course_temp_list;
			create temporary table course_temp_list(CId varchar(255));
			set @sql = concat("insert into course_temp_list (CId) values ('", replace(( select group_concat(distinct txt) as data from course_temp), ",", "'),('"),"');");
			prepare stmt1 from @sql;
			execute stmt1;
			select CId from course_temp_list;
            
			drop table if exists section_temp;
			create table section_temp( txt varchar(255));
			insert into section_temp values(p_SectionId);
            
			drop temporary table if exists section_temp_list;
			create temporary table section_temp_list( SId varchar(255) );
			set @sql = concat("insert into section_temp_list (SId) values ('", replace(( select group_concat(distinct txt) as data from section_temp), ",", "'),('"),"');");
			prepare stmt1 from @sql;
			execute stmt1;
			select SId from section_temp_list;
            
			if(p_Id=0)then

        Begin
           INSERT INTO	
				coursesection
				(
					
					AcademicYearId,
					CourseId,
					SectionId,
                    InstitutionId
				)
        
				select  p_AcademicYearId, a.CId,b.SId,p_InstitutionId From
				course_temp_list a
				cross join section_temp_list b;
         
				set p_Id = last_insert_id();
                
        END;
ELSEIF p_Id>0
	then
		update  
        coursesection
         set
            AcademicYearId = p_AcademicYearId,
             CourseId = p_CourseId,
             SectionId=p_SectionId,
             InstitutionId = p_InstitutionId
        where Id=p_Id;
    END IF;	
	SELECT  p_Id;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseSection_InActive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseSection_InActive`(
p_AcademicYearId int,
p_CourseId Int)
BEGIN
Update 
CourseSection CS
set
IsActive = 0
where
CS.AcademicYearId = p_AcademicYearId and CourseId = p_CourseId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseSection_SP_Duplicatechecking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseSection_SP_Duplicatechecking`(`p_Id` INT,
 `p_AcademicYearId` int,
 `p_CourseId` varchar(100),
 `p_SectionId` varchar(100),
 `p_InstitutionId` int
 )
BEGIN
      if exists(select Id from coursesection
       where AcademicYearId=p_AcademicYearId and
       CourseId=p_CourseId and
       SectionId=p_SectionId and 
       InstitutionId =p_InstitutionId and
        Id not in (p_Id) group by AcademicYearId,CourseId)
Then
begin
       select 1 val;
       end;
       else
       begin
       select 2 val;
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseSection_SP_List` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseSection_SP_List`(`p_Id` INT, 
`p_AcademicYearId` INT,
 `p_CourseId` INT,
 `p_IsActive` Int,
 `p_InstitutionId` int)
BEGIN
   SELECT
       CS.Id,
       CS.AcademicYearId,
       CS.CourseId,
       group_concat(SM.SectionName order by SM.Id) as SectionName,
       AM.AcademicYear,
       AM.Status as AcademicStatus,
       CM.Course,
       CS.IsActive
        FROM
        CourseSection AS CS
       LEFT JOIN AcademicYearMaster  AM on CS.AcademicYearId=AM.Id
       LEFT JOIN  CourseMaster  CM on CS.CourseId = CM.Id
       left join SectionMaster SM on CS.SectionId = SM.Id
       inner join Institution IM on IM.Id = CS.InstitutionId
     WHERE
    (CS.AcademicYearId =  p_AcademicYearId or ifnull( p_AcademicYearId,0)=0) and 
	(CS.CourseId =  p_CourseId or ifnull( p_CourseId,0)=0)and 
    (CS.IsActive =  p_IsActive or ifnull( p_IsActive,-1)=-1)and 
	(CS.InstitutionId = p_InstitutionId)
       group by
       CS.CourseId,CS.AcademicYearId
       Order by
       CS.AcademicYearId
       ;
       END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseSection_SP_Section` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseSection_SP_Section`( 
`p_CourseId`int,
`p_AcademicYearId` int
)
BEGIN
   SELECT
     group_concat(CS.SectionId) as SectionId,
     group_concat(SM.SectionName) as SectionName
   FROM
        CourseSection as CS
       LEFT JOIN SectionMaster SM on CS.SectionId =SM.Id
       WHERE
       CS.CourseId = p_CourseId and CS.AcademicYearId = p_AcademicYearId; 
       END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `CourseSection_SP_View` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CourseSection_SP_View`(`p_Id` INT)
BEGIN
SELECT
      CS.Id,
      CS.AcademicYearId,
      CS.CourseId,
      CS.SectionId,
	  AM.AcademicYear,
      CM.Course,
      group_concat(SM.SectionName) as Section      
     FROM     
     CourseSection CS    
     
     LEFT JOIN AcademicYearMaster AM on CS.AcademicYearId=AM.Id
     LEFT JOIN CourseMaster CM on CS.CourseId=CM.Id
     LEFT JOIN SectionMaster  SM on CS.SectionId=SM.Id
     
     
    where
               CS.Id=p_Id;
        
       
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EmployeeLogin_SP_InsertUpdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EmployeeLogin_SP_InsertUpdate`(
/*
Index --> User login --> Add Page
to Insert/Update the entered  User Information 
When Id = 0 it is Insert, Id >0 it is Update
Input: User login input fields
Output: Id
*/
p_Id int,
p_UserName nvarchar(100),
p_Password nvarchar(100))
Begin
	declare v_ModifiedUser_Id int default 1;
    declare v_EmployeeId int default ifnull((select max(ReferenceId) from managelogins where UserName = p_UserName and IsActive = 1), 0);
	declare v_EmployeeName varchar(100) default ifnull((select max(UserName) from managelogins where UserName = p_UserName and IsActive = 1), null);
    declare v_LogCheckTime datetime(3) default null;
    declare v_CountVal int default 0;
    declare v_Flag int default 1;
    declare v_CountValresult int default 0; 
    /*declare v_MinLoginTimes int default (select MinLoginTime from passwordpolicy);
    declare v_MinLoginHour int default (select MinLoginHours from passwordpolicy);
	declare v_MinLoginMins int default (select MinLoginMins from passwordpolicy);
	declare v_Expiryperioddays int default (select ExpiryPeriod from passwordpolicy);*/
	declare v_Balance int default 0;
	declare v_Balancemins int default 0;
    
    declare v_DayDiff int default (select TIMESTAMPDIFF(day,(SELECT CURRENT_TIMESTAMP),(select max(LogInTime) from EmployeeLogin where EmployeeId=v_EmployeeId)));
	/*declare v_ExpiryPeriod int default (select Expiry from passwordpolicy);*/
	declare v_loginId int;


    declare v_loginCnt int default 0;
	declare v_loginFlag int;
	declare v_lastLoginId int default 0;
	declare v_LogInTime int;

	declare v_pwdid int default 0;
	declare v_pwdcount datetime(3) default null;
	declare v_pwddatevalue int default 0;
	declare v_pwddate datetime(3) default null;
	
	if(v_EmployeeId=0) and exists (select max(ReferenceId) from managelogins where UserName = p_UserName and IsActive = 0)
	then		
			select 10 data, v_Balance Balance, v_EmployeeId EmployeeId ,v_EmployeeName EmpName;
			
	end if;
	
	
	-- username and password matches -- valid login
	if exists(select ReferenceId from managelogins where UserName = p_UserName and Password = p_Password)
	then
			-- if logging in within expiry period
		-- valid login -- user allowed to login
		INSERT INTO EmployeeLogin
		(                            
			EmployeeId,
			LogInTime,
			CountVal ,
			Flag,
			ModifiedUser_Id,
			Balance
		)
		VALUES
		(            
			v_EmployeeId,
			now(),
			1 , 
			1,
			v_ModifiedUser_Id,
			NULL                        
		); 
		
	select 1 data, 0 Balance, v_EmployeeId EmployeeId, v_EmployeeName EmpName;
		
	-- wrong login Attempt
	-- Right Username and wrong password
	elseif exists(select ReferenceId from managelogins where UserName = p_UserName and Password != p_Password)
	then

		if(v_loginFlag = 0)
		then
			update EmployeeLogin set CountVal = CountVal + 1, LogInTime=now()
			where Id = (Select max(Id) from EmployeeLogin where EmployeeId = v_EmployeeId) and v_loginCnt < v_MinLoginTimes;
		else
			INSERT INTO EmployeeLogin
			(                            
				EmployeeId,
				LogInTime,
				CountVal ,
				Flag,
				ModifiedUser_Id,
				Balance
			)
			VALUES
			(            
				v_EmployeeId,
				now(),
				1 , 
				0,
				v_ModifiedUser_Id,
				NULL                        
			); 
			
		end if;
		select 3 data, 0 Balance, v_EmployeeId EmployeeId, v_EmployeeName EmpName;
	end if;
	/*
		user trying to login after the 'max login hours'
		so new login entry starts
	*/

	if (v_Balance <0)
	then
		set v_loginFlag = null;
	end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Employee_SP_Logout` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Employee_SP_Logout`(`p_Id` INT)
BEGIN
declare v_EID datetime default (select max(LogInTime) from EmployeeLogin where EmployeeId=p_Id);

select v_EID;
   
SET SQL_SAFE_UPDATES=0;

      update
            EmployeeLogin
            
      set 
            LogOutTime = now()
      where 
			EmployeeId = p_Id and LogInTime=v_EID;
             
             SET SQL_SAFE_UPDATES=1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamListBasedCourse` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamListBasedCourse`(
)
BEGIN
	SELECT 
    EM.Id, 
    ES.CourseId,
    ES.ExamNameId,
    ES.CourseId,
    EM.ExamName,
    CM.Course
    FROM 
    ExamSubject as ES
     LEFT JOIN ExamMaster EM on ES.ExamNameId=EM.Id
     LEFT JOIN CourseMaster CM on ES.CourseId=CM.Id;      
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamSubjectChildList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamSubjectChildList`(
`p_AcademicYearId` int,
`p_CourseId` int,
`p_ExamId` int,
`p_InstitutionId` int
)
BEGIN
select
SD.Id as ChildId,
S.SubjectName as Id,
S.SubjectParentId,
SM.SubjectName,
cast(SD.Pass as unsigned) as Pass,
cast(SD.Total as unsigned) as Total
from
subject as S
join SubjectMaster as SM on SM.Id = S.SubjectName
left join 
(SELECT SD.*,ES.AcademicYearId,ES.CourseId FROM SubjectDetails as SD 
			INNER join ExamSubject as ES on ES.Id =  SD.ExamsubjectId 
            and ES.ExamNameId = p_ExamId) AS SD
		on S.SubjectName = SD.SubjectId and SD.AcademicYearId = S.AcademicYearId and SD.CourseId = S.CourseId 
      
    
where S.AcademicYearId = p_AcademicYearId and S.CourseId = p_CourseId and S.InstitutionId = p_InstitutionId
order by 
			(case when S.SubjectParentId=0 then S.SubjectName else S.SubjectParentId end), 
			(case when S.SubjectParentId=0 then 0 else 1 end), S.SubjectName;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamSubjectChildView` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamSubjectChildView`(
`p_ExamSubjectId` int)
BEGIN
    
        select
        SD.ExamSubjectId,
      cast(SD.Pass as unsigned) as Pass,
cast(SD.Total as unsigned) as Total,
        SD.SubjectId,
         SM.SubjectName,
         S.SubjectParentId,
         SD.OrderBy
         
        from SubjectDetails as SD
       Join ExamSubject ES on SD.ExamSubjectId = ES.Id
       join Subject S on SD.SubjectId = S.SubjectName and 
       S.AcademicYearid=ES.AcademicYearId and S.courseId= ES.CourseId  and S.InstitutionId=ES.InstitutionId
 join subjectmaster SM on SM.Id = S.SubjectName
        where 
           (SD.ExamSubjectId = p_ExamSubjectId or ifnull(p_ExamSubjectId,0)=0) 
                
           order by 
           
			SD.Orderby;
           
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamSubjectChild_SP_InsertUpdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamSubjectChild_SP_InsertUpdate`(
`p_Id` INT,
`p_ExamSubjectId` int,
`p_SubjectId` INT,
`p_Total` decimal,
`p_Pass` decimal,
`p_OrderBy` int,
`p_InstitutionId` int

)
BEGIN
if(p_Id=0)then

      Begin
          INSERT INTO
      SubjectDetails
      (
           ExamSubjectId,
           SubjectId,
           Total,
           Pass,
           OrderBy,
           InstitutionId

      )
       VALUES
       (
           p_ExamSubjectId,
           p_SubjectId,
           p_Total,
           p_Pass,
           p_OrderBy,
           p_InstitutionId


      );
      set p_Id = last_insert_id();

      End;
   ELSEIF p_Id>0
       THEN
           Update
           SubjectDetails
       Set
          ExamSubjectId=p_ExamSubjectId,
          SubjectId=p_SubjectId,
          Total=p_Total,
          Pass=p_Pass,
         OrderBy=p_OrderBy,
         InstitutionId=p_InstitutionId


      Where
               Id=p_Id;
    END IF;
   SELECT  p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamSubjectSearchSP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamSubjectSearchSP`(
`p_AcademicYearId` int,
`p_CourseId` int,
`p_SubjectNameId` int,
`p_ExamNameId` int,
`p_IsActive`int,
`p_InstitutionId` int)
BEGIN
select

ES.Id,
ES.AcademicYearId,
AM.AcademicYear,
ES.CourseId,
C.Course,
ES.SubjectNameId, 
ES.ExamNameId,
EM.ExamName,
EM.ExamCode,
ES.Description,
ES.Total,
ES.Pass,
ES.IsActive,
AM.Status as AcademicStatus
 from 
ExamSubject  as ES
        
inner Join 	AcademicYearMaster  AM on ES.AcademicYearId =AM.Id
       
inner Join ExamMaster  EM on ES.ExamNameId = EM.Id
inner Join CourseMaster  C on ES.CourseId = C.Id
inner join Institution I on I.Id =ES.InstitutionId
-- left Join SubjectDetails SD on ES.Id = SD.ExamSubjectId
-- left Join Subject  S on SD.SubjectId =  S.Id

    where 
        (ES.AcademicYearId = p_AcademicYearId or ifnull(p_AcademicYearId,0)=0) and 
        (ES.CourseId = p_CourseId or ifnull(p_CourseId,0)=0) and 
        (ES.SubjectNameId = p_SubjectNameId or ifnull(p_SubjectNameId,0)=0) and
        (ES.ExamNameId = p_ExamNameId or ifnull(p_ExamNameId,0)=0)and
        (ES.IsActive = p_IsActive or ifnull(p_IsActive,-1)=-1) and
         (ES.InstitutionId=p_InstitutionId or ifnull(p_InstitutionId, 0)=0);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamSubjectView` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamSubjectView`(
`p_Id` int)
BEGIN
select

ES.Id,
ES.AcademicYearId,
AM.AcademicYear as ESAcademicYear,
ES.CourseId,
C.Course as ESCourse,
ES.SubjectNameId,
ES.ExamNameId,
EM.ExamName,
EM.ExamCode,
ES.Description,
ES.Total,
ES.Pass,
ES.IsActive,
S.SubjectName,
SS.SubjectName,
SD.Pass,SD.Total


from ExamSubject as ES

left Join AcademicYearMaster  AM on ES.AcademicYearId =AM.Id
left Join Subject  SM on ES.SubjectNameId = SM.SubjectName
left Join ExamMaster  EM on ES.ExamNameId =EM.Id
left Join CourseMaster   C on ES.CourseId =C.Id
left Join SubjectDetails  SD on ES.Id = SD.ExamSubjectId
left Join Subject S on SD.SubjectId = S.SubjectName
inner  join subjectmaster SS on S.SubjectName = SS.Id
    where (ES.Id=p_Id);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamSubject_DuplicateCheck` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamSubject_DuplicateCheck`(
`p_Id` INT,
`p_AcademicYearId` Int,
`p_CourseId` Int,
`p_ExamNameId` varchar(50),
`p_InstitutionId` int
)
BEGIN
     if exists(select Id from ExamSubject
      where AcademicYearId=p_AcademicYearId and CourseId=p_CourseId and ExamNameId = p_ExamNameId and InstitutionId = p_InstitutionId
      and Id not in (p_Id))
Then
begin
      select 1 val;
      end;
      else
      begin
      select 2 val;
      end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamSubject_InnerTableList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamSubject_InnerTableList`()
BEGIN
select 
SD.ExamSubjectId,
SD.SubjectId,
s.SubjectParentId,
SM.SubjectName,
cast(SD.Pass as unsigned) as Pass,
cast(SD.Total as unsigned) as Total,
SD.Orderby
From 
SubjectDetails SD
 inner  join ExamSubject EX on SD.ExamSubjectId=EX.Id
 join Subject S on SD.SubjectId = S.SubjectName and 
 S.AcademicYearid=EX.AcademicYearId and S.courseId= EX.CourseId
 and S.InstitutionId=EX.InstitutionId
 join subjectmaster SM on SM.Id = S.SubjectName
order by 
		SD.Orderby;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamSubject_SP_Active` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamSubject_SP_Active`(
p_Id int)
BEGIN
Update 
ExamSubject 
set
IsActive = 1
where
Id = p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamSubject_SP_Inactive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamSubject_SP_Inactive`(
p_Id int)
BEGIN
Update 
ExamSubject 
set
IsActive = 0
where
Id = p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamSubject_SP_InsertUpdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamSubject_SP_InsertUpdate`(
`p_Id` INT,
 `p_AcademicYearId` int,
 `p_CourseId` INT, 
 `p_ExamNameId` INT, 
 `p_Description` varchar(255),
 `p_InstitutionId` int
 )
BEGIN
if(p_Id=0)then

       Begin
           INSERT INTO
       ExamSubject
       (
            AcademicYearId,
            CourseId,
            ExamNameId,
            Description,
            InstitutionId
       )
        VALUES
        (
            p_AcademicYearId,
            p_CourseId,
            p_ExamNameId,
            p_Description,
            p_InstitutionId
       );
       set p_Id = last_insert_id();

       End;
    ELSEIF p_Id>0
        THEN
            Update
            ExamSubject
        Set
           AcademicYearId=p_AcademicYearId,
           CourseId=p_CourseId,
           ExamNameId=p_ExamNameId,
           Description=p_Description,
           InstitutionId=p_InstitutionId
       Where
                Id=p_Id;
     END IF;    
    SELECT  p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamTimeTableEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamTimeTableEdit`(
`p_AcademicYearId` int,
`p_CourseId` INT,
`p_ExamNameId` INT

)
BEGIN
	SELECT 
    ES.AcademicYearId,
    ES.CourseId,
    ES.ExamNameId,
    SD.SubjectId,
     S.HasChild,
 CAST(S.SubjectParentId as CHAR(50)) SubjectParentId,

 CAST(S.SubjectName as CHAR(50)) Id,
    ECT.StartTime,
    ECT.EndTime,
    ECT.Id as ChildId,
    ECT.ExamDate,
    ECT.Remarks,
    sm.SubjectName
      
    
       
    FROM 
    SubjectDetails as SD
      JOIN ExamSubject ES on SD.ExamSubjectId=ES.Id
      join Subject S on SD.SubjectId = S.SubjectName and S.AcademicYearid=ES.AcademicYearId and S.courseId= ES.CourseId
  join subjectmaster SM on SM.Id = S.SubjectName
  left join ExamTimeTable ET on ET.AcademicYearid=ES.AcademicYearId and ET.courseId= ES.CourseId AND ET.ExaminationId = ES.ExamNameId
     left Join ExamTimeTableChild ECT on S.SubjectName = ECT.SubjectId and ET.Id = ECT.ExamTimeTableId
    
    


     where
     ES.AcademicYearId = p_AcademicYearId and ES.CourseId=p_CourseId and ES.ExamNameId=p_ExamNameId 
     and S.HasChild=0
     
  order by
    SD.Orderby;
     
     
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamTimeTableItemList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamTimeTableItemList`(
p_SubjectId int

)
BEGIN
	SELECT 
   ET.Id,
   ET.SubjectId,
   ET.ExamTimeTableId,
   ET.ExamDate,
   ET.StartTime,
   ET.EndTime,
   ET.Remarks,
   SM.SubjectName as ParentSubject,
   SM.SubjectName,
   ET.IsActive,
   S.SubjectParentId
      
    
       
    FROM 
    ExamTimeTableChild as ET
      JOIN ExamTimeTable ETT on ETT.Id=ET.ExamTimeTableId
     JOIN SubjectMaster sm ON ET.SubjectId = sm.Id
      JOIN Subject as S on S.SubjectName = ET.SubjectId AND ETT.AcademicYearId = S.AcademicYearId and ETT.CourseId = S.CourseId
    
    where

 (ET.SubjectId= p_SubjectId or ifnull(p_SubjectId, 0)=0) OR
 (S.SubjectParentId= p_SubjectId or ifnull(p_SubjectId, 0)=0)
   
    ORDER BY
    (case when S.SubjectParentId=0 then S.SubjectName else S.SubjectParentId end), 
			(case when S.SubjectParentId=0 then 0 else 1 end), S.SubjectName
  ;
     
     
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ExamTimeTable_Duplicatechecking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ExamTimeTable_Duplicatechecking`(`p_Id` INT, `p_AcademicYearId` int, 
`p_CourseId` INT,
`p_ExamNameId` int)
BEGIN
      if exists(select Id from examtimetable
       where AcademicYearId=p_AcademicYearId and CourseId=p_CourseId and ExaminationId=p_ExamNameId
       and Id not in (p_Id))
Then
begin
       select 1 val;
       end;
       else
       begin
       select 2 val;
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Exam_Active` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Exam_Active`(
`p_Id` INT
)
BEGIN
    Update
            exammaster
        Set
            IsActive = 1
       Where
                Id=p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Exam_DuplicateCheck` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Exam_DuplicateCheck`(
`p_Id` INT, 
`p_ExamName` varchar(100),
`p_InstitutionId` int
)
BEGIN
      if exists(select Id from ExamMaster
       where ExamName=p_ExamName and InstitutionId =p_InstitutionId
       and Id not in (p_Id))
Then
begin
       select 1 val;
       end;
       else
       begin
       select 2 val;
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Exam_Inactive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Exam_Inactive`(
`p_Id` INT
)
BEGIN
    Update
            exammaster
        Set
            IsActive = 0
       Where
                Id=p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Exam_InsertUpdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Exam_InsertUpdate`(
`p_Id` int,
`p_ExamName` varchar(100),
`p_ExamCode` varchar(100),
`p_Duration_Hour` varchar(100),
`p_Duration_Minutes` varchar(15),
`p_Description` text,
`p_GradeT` varchar(100),
`p_InstitutionId` int
)
BEGIN
if(p_Id=0)then
Begin
INSERT INTO
exammaster
(
Id,
ExamName,
ExamCode,
Duration_Hour,
Duration_Minutes,
Description,
GradeT,
InstitutionId
)
VALUES 
(
p_Id,
p_ExamName,
p_ExamCode,
p_Duration_Hour,
p_Duration_Minutes,
p_Description,
p_GradeT,
p_InstitutionId
);
set p_Id = last_insert_id();
End;
ELSEIF p_Id>0
THEN
Update
exammaster
Set
Id  = p_Id,
ExamName = p_ExamName,
ExamCode = p_ExamCode,
Duration_Hour = p_Duration_Hour,
Duration_Minutes = p_Duration_Minutes,
Description = p_Description,
GradeT = p_GradeT,
InstitutionId=p_InstitutionId
Where
Id=p_Id;
END IF;    
SELECT  p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Exam_List` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Exam_List`(
`p_ExamName` varchar(100),
`p_ExamCode` varchar(100),
`p_IsActive` int,
`p_InstitutionId` int
)
BEGIN
SELECT
	EM.Id,
	EM.ExamName,
	EM.ExamCode,
	EM.Duration_Hour,
	EM.Duration_Minutes,
	EM.Description,
	EM.GradeT,
	EM.IsActive
FROM
	ExamMaster EM
    inner join Institution I on I.Id =EM.InstitutionId
WHERE
	(EM.ExamName like concat('%',ifnull(p_ExamName,''),'%')) and
	(EM.ExamCode like concat('%',ifnull(p_ExamCode,''),'%')) and
	(EM.IsActive= p_IsActive or ifnull(p_IsActive, -1)=-1) and
    (EM.InstitutionId=p_InstitutionId)
ORDER BY
	EM.ExamName;                 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Exam_SP_Delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Exam_SP_Delete`(
`p_ExamNameId` INT,
`p_InstitutionId` int
)
BEGIN
     if exists(select Id from ExamSubject
      where p_ExamNameId=ExamNameId and InstitutionId = p_InstitutionId)
Then
begin
      select 1 val;
      end;
      else
      begin
     delete from exammaster
     where
     Id = p_ExamNameId;
     select 2 val;
      end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Exam_View` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Exam_View`(
`p_Id` int)
BEGIN
SELECT
	EM.Id,
	EM.ExamName,
	EM.ExamCode,
	EM.Duration_Hour,
	EM.Duration_Minutes,
	EM.Description,
	EM.GradeT,
	EM.IsActive
FROM
	ExamMaster EM
WHERE
	EM.Id =p_Id;      
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GenerateHallTicket_AddEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GenerateHallTicket_AddEdit`(
`p_Id` INT, 
 
`p_AcademicYearId` INT, 
`p_CourseId` int, 
`p_ExamNameId` int,
`p_StudentId` INT
)
BEGIN
      if exists(select Id from GenerateHallTicket
       where AcademicYearId=p_AcademicYearId and StudentId=p_StudentId and ExamNameId = p_ExamNameId
       )
Then
begin
	select
     1 val;
     end;
       else
       begin
      
		  INSERT INTO	
        GenerateHallTicket
        (
			StudentId,
            AcademicYearId,
            CourseId,
            ExamNameId
            
            
        )
		VALUES
		(
			p_StudentId,
            p_AcademicYearId,
			p_CourseId,
            p_ExamNameId
        ); 
      
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GenerateHallTicket_List` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GenerateHallTicket_List`(
`p_AcademicYearId` INT, 
`p_CourseId` INT, 
`p_MediumId` INT, 
`p_SectionId` INT,
 `p_ExamNameId` INT
 )
BEGIN

    SELECT 
    
        SM.Id,
        
        SM.StudentId,
        SM.StudentName,
        SM.FatherName,
        SM.RollNumber,
        GM.Gender,
        SM.SMobileNumber
        
      
		
        
    FROM
    
         StudentDetailsMaster AS SM
         
		 JOIN StudentChildTable SCT on SM.Id=SCT.StudentId
		 JOIN CourseMaster CM on SCT.CourseId=CM.Id
		 JOIN AcademicYearMaster YM on SCT.AcademicYearId=YM.Id
         JOIN mediummasters MM on SM.MediumId=MM.Id
		 JOIN GenderMaster GM on SM.GenderId = GM.Id
         JOIN ExamSubject ES on SCT.CourseId=ES.CourseId
       
       
		
      WHERE 

        (SCT.AcademicYearId= p_AcademicYearId or ifnull(p_AcademicYearId, 0)=0) and
		(SM.MediumId= p_MediumId or ifnull(p_MediumId, 0)=0) and
		(SCT.CourseId= p_CourseId or ifnull(p_CourseId, 0)=0) and
		(SCT.SectionId= p_SectionId or ifnull(p_SectionId, 0)=0) and 
        (ES.ExamNameId= p_ExamNameId or ifnull(p_ExamNameId, 0)=0) 
      
         order by
         SM.StudentName;
        
         
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GradeMarkswithName_Duplicatechecking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GradeMarkswithName_Duplicatechecking`(`p_Id` INT,
 `p_GradeName` VARCHAR(50), `p_MarksFrom` INT, `p_MarksUpto` INT,
 `p_InstitutionId` int)
BEGIN

		if exists(select Id from gradesettings
      where
        (MarksFrom between p_MarksFrom AND p_MarksUpto OR MarksUpto between p_MarksFrom AND p_MarksUpto)
         AND
         (p_MarksFrom between MarksFrom AND MarksUpto OR p_MarksUpto between MarksFrom AND MarksUpto) and InstitutionId = p_InstitutionId and id not in (p_Id)
         ) 
        
Then
begin
        select 1 val;
        end;
        
        else
        begin
        select 2 val;
        end;
End if;
End ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Grade_Active` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Grade_Active`(
p_Id int)
BEGIN
Update 
gradesettings 
set
IsActive = 1
where
Id = p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Grade_InActive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Grade_InActive`(
p_Id int)
BEGIN
Update 
gradesettings 
set
IsActive = 0
where
Id = p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Grade_InsertUpdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Grade_InsertUpdate`(
`p_Id` int,
`p_GradeName` varchar(40),
`p_GradePoint` varchar(50),
`p_GradeCategory` varchar(30),
`p_MarksFrom` int,
`p_MarksUpto` int,
`p_Remarks` varchar(250),
`p_InstitutionId` int
)
BEGIN

if(p_Id=0)then

Begin

INSERT INTO
gradesettings
(
Id,
GradeName,
GradePoint,
GradeCategory,
MarksFrom,  
MarksUpto,
Remarks,
InstitutionId
)
VALUES 
(
p_Id,
p_GradeName,
p_GradePoint,
p_GradeCategory,
p_MarksFrom,
p_MarksUpto,
p_Remarks,
p_InstitutionId
);

set p_Id = last_insert_id();

End;

ELSEIF p_Id>0

THEN

Update
gradesettings
Set
Id  = p_Id,
GradeName = p_GradeName,
GradePoint = p_GradePoint,
GradeCategory = p_GradeCategory,
MarksFrom = p_MarksFrom, 
MarksUpto = p_MarksUpto,
Remarks = p_Remarks,
InstitutionId= p_InstitutionId

Where

Id=p_Id;
END IF;    

SELECT  p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Grade_List` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Grade_List`(
`p_GradeName` varchar(255),
`p_IsActive` int,
`p_InstitutionId` int

)
BEGIN
select
GS.Id,
GS.GradeName,
GS.GradePoint,
GS.GradeCategory,
GS.MarksFrom,
GS.MarksUpto,
GS.Remarks,
GS.IsActive
from gradesettings as GS        
inner join institution I on I.Id = GS.InstitutionId        
where 
(GS.GradeName like concat('%',ifnull(p_GradeName,''),'%')) and
(GS.IsActive =  p_IsActive or ifnull( p_IsActive,-1)=-1) and
(GS.InstitutionId =  p_InstitutionId);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Grade_View` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Grade_View`(
p_Id int)
BEGIN

SELECT
	GS.Id,
	GS.GradeName,
	GS.GradePoint,
	GS.GradeCategory,
	GS.MarksFrom,
	GS.MarksUpto,
	GS.Remarks,
	GS.IsActive
FROM

	gradesettings GS

WHERE
	GS.Id = p_Id;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `HR_ManageEmployee_EducationalDetails_View` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `HR_ManageEmployee_EducationalDetails_View`(
`p_EmployeeId` int
)
BEGIN
select 
ED.Id as EducationId,
ED.EmployeeId,
ED.YearOfPassedOut,
ED.CollegedUnivercity,
ED.Percentage,
ED.QualificationId,
QM.Qualification
from
EducationalDetails as ED
join QualificationMaster as QM on QM.Id = ED.QualificationId
where
ED.EmployeeId = p_EmployeeId and ED.IsActive=1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Login_SP_CheckPassword` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Login_SP_CheckPassword`(
`p_UserName` VARCHAR(50))
BEGIN
 if exists(select ML.Id from managelogins as ML where
     ML.UserName=p_UserName)
Then
  select 1 Val, ML.Id, ML.UserName from managelogins as ML
    where ML.UserName=p_UserName;

   else
   begin
     select  2 Val;

      end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MainSubjectsList_SP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MainSubjectsList_SP`(
`p_AcademicYearId` int,
`p_courseId` int,
`p_InstitutionId` int
)
BEGIN
  select
 -- S.Id,
  S.CourseId,
  C.Course,
  S.AcademicYearId,
  S.SubjectParentId,
  S.SubjectName as Id,
  SS.subjectName
   from Subject  S
    left Join CourseMaster   C on S.CourseId = C.Id
   inner join subjectmaster SS on S.SubjectName = SS.Id
   inner join Institution I on I.Id = S.InstitutionId
   where AcademicYearId = p_AcademicYearId and CourseId  = p_CourseId
   and I.Id = p_InstitutionId
   order by
    S.SubjectName;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ManageStudentsList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ManageStudentsList`(`p_id` int,

`p_AcademicYearId` int,`p_RollNumber` varchar(250),`p_courseId` int,
`p_SectionId` int,`p_MediumId` int
)
BEGIN
select
SM.Id,
           SM.StudentId,
           SM.StudentName,
          -- StudentDetailsMaster.FirstName,
          -- StudentDetailsMaster.LastName,
          SM.AdmissionNumber,
           SM.MediumId,
           MM.MediumName,
            SM.GenderId,
         GM.Gender,
        --   StudentDetailsMaster.FatherName,
           -- StudentDetailsMaster.DOB,
           SM.SMobileNumber,
           SE.RollNumber,
       --    AYM.AcademicYear,
           SE.AcademicYearId,
         -- CM.Course,
           SE.CourseId,
           CM.Course,
        -- SM.SectionName,
           SM.IsActive,
           SE.CourseId

from StudentDetailsMaster SM


     inner Join GenderMaster  GM on SM.GenderId = GM.Id
  inner Join mediummasters  MM on SM.MediumId = MM.Id
  left join studentchildtable SE on SM.Id = SE.StudentId
 left join  studentchildtable SC on SM.RollNumber = SC.RollNumber
 left Join AcademicYearMaster  AYM on SE.AcademicYearId = AYM.Id
 left Join CourseMaster  CM on SE.CourseId = CM.Id
 left Join SectionMaster  SEM on SE.SectionId = SEM.Id



       -- left join studentenrollment SE on studentchildtable.courseId= SE.courseId
   where
     (SE.AcademicYearId = p_AcademicYearId) and
        
       -- and SE.CourseId is null
      (SE.SectionId = p_SectionId or ifnull(p_SectionId,0)=0)
   and (ifnull(SE.CourseId, -1) = p_CourseId or ifnull(p_CourseId, 0)=0
            -- or (ifnull(p_CourseId, 0)=-1 and SE.CourseId is null)
           or (ifnull(p_CourseId, 0)=-1 and ifnull(SE.CourseId, -1)=ifnull(p_CourseId, 0))
       ) and
 /* and ifnull(SE.CourseId,ifnull(p_CourseId, 0)) =
   (case


          when  p_courseId = -1 then
            0
         else
            ifnull(p_CourseId, 0)
          end
    )
   and */

           -- (SE.AcademicYearId = p_AcademicYearId) and
          (SM.MediumId = p_MediumId or ifnull(p_MediumId,0)=0)
         and
    (ifnull(SE.RollNumber,'') like concat('%',ifnull(p_RollNumber,''),'%')) ; 
          
	
           -- (StudentDetailsMaster.SectionId = p_SectionId or ifnull(p_SectionId,0)=0) and
           -- (StudentDetailsMaster.CourseId = p_courseId or ifnull(p_courseId,0)=0) and
             -- and (SE.CourseId = p_CourseId or ifnull(p_CourseId, 0)=0) ;
     -- SE.CourseId IS NULL;

                END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `MasterItem_Delete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `MasterItem_Delete`(IN `p_MasterId` INT, IN `p_Id` INT, IN `p_Active` INT)
    NO SQL
BEGIN
  DECLARE v_ColumnName varchar(100);
	DECLARE v_TableName varchar(100);
	DECLARE v_SqlQry VARCHAR(8000); 
    
	SELECT 
	 DBTableName, ActiveColumn INTO v_TableName, v_ColumnName 
	from CommonTable 
	where 
		Id = p_MasterId; 
	
	set v_SqlQry = CONCAT('UPDATE ' , v_TableName , ' set ' , v_ColumnName , '= '  ,  p_Active , ' Where  Id = ' , p_Id);

	set @stmt_str =  v_SqlQry;
	prepare stmt from @stmt_str;
	execute stmt;
	deallocate prepare stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Master_Active` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Master_Active`(IN `p_MasterId` INT, IN `p_Id` INT, IN `p_Active` INT)
    NO SQL
BEGIN
DECLARE v_ColumnName varchar(100);
	DECLARE v_TableName varchar(100);
	DECLARE v_SqlQry VARCHAR(8000); 
    
	SELECT 
	 DBTableName, ActiveColumn INTO v_TableName, v_ColumnName 
	from CommonTable
	where 
		Id = p_MasterId; 
	
	set v_SqlQry = CONCAT('UPDATE ' , v_TableName , ' set ' , v_ColumnName , '= '  ,  p_Active , ' Where  Id = ' , p_Id);
	
	set @stmt_str =  v_SqlQry;
	prepare stmt from @stmt_str;
	execute stmt;
	deallocate prepare stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Master_SP_DropdownFill` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Master_SP_DropdownFill`(IN `p_MasterColumn_id` INT)
    NO SQL
BEGIN
DECLARE v_SqlQry VARCHAR(8000); 
	SELECT 
	 ddsql INTO v_SqlQry 
	from CommonTableColumns
	where 
		Id = p_MasterColumn_id; 

	set @stmt_str =  v_SqlQry;
	prepare stmt from @stmt_str;
	execute stmt;
	deallocate prepare stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PaperPatterenChild_SP_InsertUpdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `PaperPatterenChild_SP_InsertUpdate`(
`p_Id` int,
`p_paperpatterenId` INT,
`p_QuestionpaperSectionId` int,
`p_NumberofQuestions` INT, 
`p_Answers` INT,
`p_Marks` int,
`p_Remarks` varchar(255)
)
BEGIN
if(p_Id=0)then

       Begin
           INSERT INTO
       paperpatternchild
       (
            paperpatterenId,
            QuestionpaperSectionId,
            NumberofQuestions,
            Answers,
			Marks,
			Remarks
			
			
       )
        VALUES
        (
            p_paperpatterenId,
            p_QuestionpaperSectionId,
            p_NumberofQuestions,
            p_Answers,
			p_Marks,
			p_Remarks
       );
       set p_Id = last_insert_id();

       End;
    ELSEIF p_Id>0
        THEN
            Update
            paperpatternchild
        Set
           paperpatterenId = p_paperpatterenId,
            QuestionpaperSectionId = p_QuestionpaperSectionId,
            NumberofQuestions = p_NumberofQuestions,
            Answers = p_Answers,
			Marks = p_Marks,
			Remarks = p_Remarks
		Where
                Id=p_Id;
     END IF;    
    SELECT  p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PaperPatteren_SP_InsertUpdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `PaperPatteren_SP_InsertUpdate`(
`p_Id` INT,
`p_AcademicYearId` int,
`p_CourseId` INT, 
`p_MediumId` INT,
`p_ExamNameId` int,
`p_SubjectId` int)
BEGIN
if(p_Id=0)then

       Begin
           INSERT INTO
       paperpatteren
       (
            AcademicYearId,
            CourseId,
            MediumId,
            ExamNameId,
			SubjectId
			
       )
        VALUES
        (
            p_AcademicYearId,
            p_CourseId,
            p_MediumId,
            p_ExamNameId,
			p_SubjectId
       );
       set p_Id = last_insert_id();

       End;
    ELSEIF p_Id>0
        THEN
            Update
            paperpatteren
        Set
           AcademicYearId=p_AcademicYearId,
           CourseId=p_CourseId,
           MediumId=p_MediumId,
           ExamNameId=p_ExamNameId,
		   SubjectId=p_SubjectId
		Where
                Id=p_Id;
     END IF;    
    SELECT  p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PaperPatternChild_SP_List` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `PaperPatternChild_SP_List`()
BEGIN
   SELECT
   PPC.PaperPatterenId,
      PPC.QuestionpaperSectionId,
      QM.QuestionPaperSection,
     PPC.NumberofQuestions,
     PPC.Marks,
     PPC.Answers
        
   FROM
       PaperPatternChild as PPC
       
       left JOIN QuestionpaperSectionMaster QM on PPC.QuestionpaperSectionId=QM.Id
       left JOIN PaperPatteren pp on PPC.PaperPatterenId=pp.Id
       where
       PPC.IsActive=1
       order by
       QM.QuestionPaperSection;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PaperPattern_DuplicateCheck` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `PaperPattern_DuplicateCheck`(
`p_Id` INT, 
`p_AcademicYearId` int,
`p_CourseId` int,
`p_MediumId` int,
`p_ExamNameId` int,
`p_SubjectNameId` int

)
BEGIN
      if exists(select Id from paperpatteren
       where AcademicYearId=p_AcademicYearId and CourseId=p_CourseId and  MediumId=p_MediumId
       and ExamNameId=p_ExamNameId  and SubjectId=p_SubjectNameId
       and Id not in (p_Id))
Then
begin
       select 1 val;
       end;
       else
       begin
       select 2 val;
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Paperpattern_SP_List` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Paperpattern_SP_List`(`p_Id` INT, `p_AcademicYearId` INT, `p_CourseId` INT, `p_ExamNameId` INT, `p_SubjectId` INT,
`p_IsActive` int)
BEGIN

    select
            PP.Id,
            PP.AcademicYearId,
            PP.CourseId,
            PP.MediumId,
            MM.MediumName,
        AM.AcademicYear,

          pp.ExamNameId,
          EM.ExamName,
         pp.SubjectId,
         SM.SubjectName,
         SS.SubjectName,
            C.Course,
            pp.IsActive

    from
        PaperPatteren
            AS
                PP
        
        left Join AcademicYearMaster  AM on PP.AcademicYearId=AM.Id             
       left Join mediummasters MM on PP.MediumId=MM.Id
       left Join CourseMaster C on PP.CourseId=C.Id
       left Join ExamMaster EM on  PP.ExamNameId=EM.Id
       left Join Subject SM on PP.SubjectId=SM.Id
            inner  join subjectmaster SS on SM.SubjectName = SS.Id
                where
                    (PP.AcademicYearId = p_AcademicYearId or ifnull(p_AcademicYearId,0)=0) and
                (PP.CourseId = p_CourseId or ifnull(p_CourseId,0)=0) and
                (PP.ExamNameId =p_ExamNameId or ifnull(p_ExamNameId,0)=0) and
                (PP.SubjectId =p_SubjectId or ifnull(p_SubjectId,0)=0) and
                 (PP.IsActive =p_IsActive or ifnull(p_IsActive,-1)=-1)
                group by
                    PP.Id
                order by C.Course,MM.MediumName;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `QuestionBankList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `QuestionBankList`(
`p_AcademicYearId` int,
`p_CourseId` int,
`p_ExamNameId` int,
`p_PaperTypeId` int,
`p_IsActive` int
)
begin

select

QB.Id,
QB.MediumId,
MM.MediumName,
QB.Questions,
QB.AcademicYearId,
AM.AcademicYear,
QB.CourseId,
C.Course,
QB.ExamNameId,
EM.ExamName,
QB.SubjectId,
SM.SubjectName,
QB.QuestionpaperSectionId,
QM.QuestionPaperSection,
QB.PaperTypeId,
PM.PaperType,
QB.IsActive

from  QuestionBank as QB

    
left Join AcademicYearMaster  AM on QB.AcademicYearId =AM.Id
left Join mediummasters  MM on QB.MediumId = MM.Id
left Join CourseMaster  C on QB.CourseId = C.Id
left Join ExamMaster  EM on QB.ExamNameId = EM.Id 
left Join Subject  SM on QB.SubjectId = SM.Id
left Join QuestionPaperSectionMaster  QM on QB.QuestionpaperSectionId =QM.Id
left Join PaperTypeMaster  PM on QB.PaperTypeId = PM.Id
        
where 
	(QB.AcademicYearId = p_AcademicYearId or ifnull(p_AcademicYearId,0)=0) and 
	(QB.CourseId = p_CourseId or ifnull(p_CourseId,0)=0) and 
	(QB.ExamNameId = p_ExamNameId or ifnull(p_ExamNameId,0)=0) and
	(QB.PaperTypeId = p_PaperTypeId or ifnull(p_PaperTypeId,0)=0) and
	 (QB.IsActive = p_IsActive or ifnull(p_IsActive,-1)=-1)
	 order by
	 C.Course asc, MM.MediumName ASC;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `QuestionBankView` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `QuestionBankView`(
`p_Id` int)
BEGIN
select 

QB.Id,
QB.MediumId,
MM.MediumName as QBMedium,
QB.Questions,
QB.AcademicYearId,
AM.AcademicYear as QBAcademicYear,
QB.CourseId,
C.Course as QBCourse,
QB.ExamNameId,
EM.ExamName as QBExamName,
QB.SubjectId,
SM.SubjectName as QBSubject,
QB.QuestionpaperSectionId,
QM.QuestionPaperSection as QBQuestionPaperSection,
QB.PaperTypeId,
PM.PaperType,
QB.IsActive

 from  QuestionBank as QB
        
left Join AcademicYearMaster  AM on QB.AcademicYearId = AM.Id
left Join mediummasters  MM on QB.MediumId = MM.Id
left Join CourseMaster   C on QB.CourseId = C.Id
left Join ExamMaster   EM on  QB.ExamNameId = EM.Id
left Join Subject  SM on QB.SubjectId = SM.Id 
left Join QuestionPaperSectionMaster   QM on QB.QuestionpaperSectionId = QM.Id
left Join PaperTypeMaster   PM on QB.PaperTypeId = PM.Id 
        
     where(QB.Id=p_Id);
	 end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `QuestionBank_SP_InsertUpdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `QuestionBank_SP_InsertUpdate`(
`p_Id` INT,
`p_AcademicYearId` int,
`p_CourseId` INT, 
`p_MediumId` int,
`p_ExamNameId` INT,
`p_SubjectId` INT,
`p_QuestionpaperSectionId` int,
`p_PaperTypeId` INT, 
`p_Questions` longtext
 
 )
BEGIN
if(p_Id=0)then

       Begin
           INSERT INTO
       QuestionBank
       (
            AcademicYearId,
            CourseId,
            MediumId,
            ExamNameId,
			SubjectId,
			QuestionpaperSectionId,
			PaperTypeId,
			Questions
       
       )
        VALUES
        (
            p_AcademicYearId,
            p_CourseId,
            p_MediumId,
            p_ExamNameId,
			p_SubjectId,
			p_QuestionpaperSectionId,
			p_PaperTypeId,
			p_Questions
         
           
       );
       set p_Id = last_insert_id();

       End;
    ELSEIF p_Id>0
        THEN
            Update
            QuestionBank
        Set
          AcademicYearId=p_AcademicYearId,
           CourseId=p_CourseId,
           MediumId=p_MediumId,
          ExamNameId=p_ExamNameId,
		   SubjectId=p_SubjectId,
		   QuestionpaperSectionId=p_QuestionpaperSectionId,
         PaperTypeId=p_PaperTypeId,
		  Questions=p_Questions
    

       Where
                Id=p_Id;
     END IF;    
    SELECT  p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_AcademicYearMasterList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_AcademicYearMasterList`(p_InstitutionId int)
BEGIN
select 
AY.Id,
AY.AcademicFlag,
AY.status,
AY.AcademicYear, CONCAT(YM.Year,'-', Y.Year) AS AcyYear,
AY.IsActive,
AY.Description
from AcademicYearMaster AY
inner Join YearMaster YM on AY.FromYearId= YM.Id
inner Join YearMaster Y on AY.ToYearId= Y.Id
join institution I on I.Id = AY.InstitutionId
where
 I.Id=p_InstitutionId
order By 
 AY.AcademicYear asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_ExamNameList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_ExamNameList`(
`p_InstitutionId` int)
BEGIN
select 
EM.Id as ExamNameId,EM.ExamName
  from ExamMaster  EM
inner join Institution I on EM.InstitutionId = I.Id
where
EM.InstitutionId =p_InstitutionId
order By EM.Id asc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_SubjectListList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_SubjectListList`(`p_InstitutionId` int)
BEGIN
select
S.Id,
S.SubjectType
from subjecttype S
inner join institution I on I.Id= InstitutionId
where
S.InstitutionId = p_InstitutionId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SP_YearList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_YearList`(`p_InstitutionId` int)
BEGIN
select 
Y.Id,
Y.Year,
Y.IsActive
from 
YearMaster Y
inner join institution I on I.Id = Y.InstitutionId
where
Y.InstitutionId=p_InstitutionId
order By
 Y.Id asc;   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `StudentChildTable_AddEdit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `StudentChildTable_AddEdit`(`p_Id` INT, `p_StudentId` INT, `p_AcademicYearId` INT, `p_CourseId` INT, `p_SectionId` INT)
BEGIN
      if exists(select Id from StudentChildTable
       where AcademicYearId=p_AcademicYearId and StudentId=p_StudentId
       and Id not in (p_Id))
Then
begin
	Update 
			StudentChildTable
		Set 
			CourseId = p_CourseId,
            SectionId = p_SectionId,
            AcademicYearId = p_AcademicYearId
            
          
        Where 
				StudentId=p_StudentId and AcademicYearId=p_AcademicYearId;
     
       end;
       else
       begin
      
		  INSERT INTO	
        StudentChildTable
        (
           
			StudentId,
            AcademicYearId,
            CourseId,
            SectionId
            
        )
		VALUES
		(
			p_StudentId,
            p_AcademicYearId,
			p_CourseId,
            p_SectionId
        ); 
        set p_StudentId = last_insert_id();
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Student_Document_EditList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Student_Document_EditList`(
p_StudentId int
 )
BEGIN
Select 
DT.Id,
DT.Document,
sd.DocumentName,
sd.StudentId,
sd.DocumentFullPath
from 
DocumentTypeMaster DT
left join studentdocumentdetails sd on sd.DocumentTypeId = DT.Id and sd.StudentId = p_StudentId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Student_EnrollmentNumber_SP_Duplicatechecking` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Student_EnrollmentNumber_SP_Duplicatechecking`(`p_StudentId` INT,`p_AcademicYearId` INT,`p_ExamId` INT, `p_EnrollmentNumber` NVARCHAR(50))
BEGIN
      if exists(select Id from studentenrollment
       where EnrollmentNumber=p_EnrollmentNumber
       and AcademicYearId=p_AcademicYearId
       and ExamId=p_ExamId
       and StudentId not in (p_StudentId) )
Then
begin
       select 1 val;
       end;
       else
       begin
       select 2 val;
       end;
End if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SubjectListBasedExam` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SubjectListBasedExam`(
`p_AcademicYearId` int,
`p_CourseId` INT,
`p_ExamNameId` INT

)
BEGIN
	SELECT 
    ES.AcademicYearId,
    ES.CourseId,
    ES.ExamNameId,
    SD.SubjectId,
    S.HasChild,
    CAST(S.SubjectParentId as CHAR(50)) SubjectParentId,
    S.SubjectParentId as SubParentId, -- For Examination Result Page
   -- S.SubjectName,
    SS.SubjectName,
    CAST(S.SubjectName as CHAR(50)) Id,
    SD.Orderby,
    cast(SD.Pass as signed) Pass,
	cast(SD.Total as signed) Total
   
    FROM 
    SubjectDetails as SD
    
      JOIN ExamSubject ES on SD.ExamSubjectId=ES.Id
     JOIN Subject S on SD.SubjectId=S.SubjectName and S.AcademicYearid=ES.AcademicYearId and S.courseId= ES.CourseId
       join subjectmaster SS on S.SubjectName = SS.Id
      /*Join ExamSubject ES on SD.ExamSubjectId = ES.Id
       join Subject S on SD.SubjectId = S.SubjectName and S.AcademicYearid=ES.AcademicYearId and S.courseId= ES.CourseId
 join subjectmaster SM on SM.Id = S.SubjectName*/
     
     where
     ES.AcademicYearId = p_AcademicYearId and ES.CourseId=p_CourseId and ES.ExamNameId=p_ExamNameId
     
     order by
     SD.OrderBy;
     
     
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SubjectListFilter_SP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SubjectListFilter_SP`(
`p_Id` int,
`p_AcademicYearId` int,
`p_CourseId` int,
`p_subName` int,
`p_subjecttypeid` int,
`p_IsActive` int,
`p_InstitutionId` int
)
BEGIN
  select
  S.Id,
  S.AcademicYearId,
  AM.AcademicYear,
  S.CourseId,
  C.Course,
  S.SubjectParentId,
  SU.SubjectName as MainSubject,
  -- S.SubjectName,
  B.Id as JoinId,
  SS.SubjectName,
  S.SubjectTypeId,
  SM.SubjectType,
  S.Remarks,
  S.IsActive,
  AM.Status as AcademicStatus

   from Subject   S left join
   Subject   B on S.SubjectParentId = B.Id

    inner Join AcademicYearMaster  AM on S.AcademicYearId = AM.Id
   inner Join SubjectType  SM on S.SubjectTypeId = SM.Id
    inner Join CourseMaster   C on S.CourseId = C.Id
   inner  join subjectmaster SS on S.SubjectName = SS.Id
   left join subjectmaster SU on S.SubjectParentId =SU.Id
    inner join Institution I on I.Id = S.InstitutionId
where
	(S.Id = p_Id or ifnull(p_Id,0)=0)and
	(S.AcademicYearId = p_AcademicYearId or ifnull(p_AcademicYearId,0)=0)and
	(S.CourseId = p_CourseId or ifnull(p_CourseId,0)=0)and
    -- (S.SubjectName like concat('%',ifnull(p_subName,''),'%') ) and
    (S.Subjectname = p_subName or ifnull(p_subName,0)=0)and
	(S.SubjectTypeId = p_subjecttypeid or ifnull(p_subjecttypeid,0)=0)and
	(S.IsActive = p_IsActive or ifnull(p_IsActive,-1)=-1) and
    (S.InstitutionId=p_InstitutionId) 
 order by
 C.Course;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SubjectListView_SP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SubjectListView_SP`(
`p_Id` INT)
BEGIN
SELECT

(select count(*) from subject where subjectparentid = S.SubjectName)  as count ,
S.Id,
S.AcademicYearId,
AM.AcademicYear,
S.CourseId,
C.Course,
S.SubjectName as SubjectNameId,
S.SubjectParentId,
SS.SubjectName,
SU.SubjectName as MainSubject,
S.SubjectTypeId,
SM.SubjectType,
S.Remarks
FROM Subject as S
    left Join AcademicYearMaster  AM on S.AcademicYearId = AM.Id
   left Join SubjectType  SM on S.SubjectTypeId = SM.Id
    left Join CourseMaster   C on S.CourseId = C.Id
     join subjectmaster SS on S.SubjectName = SS.Id
   left join subjectmaster SU on S.SubjectParentId =SU.Id

    where
 S.Id = p_Id;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Subject_SP_Active` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Subject_SP_Active`(
`p_Id` INT
)
BEGIN
    Update
            Subject
        Set
            IsActive = 1
       Where
                Id=p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Subject_SP_Inactive` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Subject_SP_Inactive`(
`p_Id` INT
)
BEGIN
    Update
            Subject
        Set
            IsActive = 0
       Where
                Id=p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Subject_SP_InsertUpdate` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Subject_SP_InsertUpdate`(
`p_Id` INT,
`p_AcademicYearId` int,
`p_CourseId` INT,
`p_SubjectName` varchar(255),
 `p_SubjectTypeId` int,
`p_SubjectParentId` int,
`p_Remarks` varchar(255),
`p_HasChild` int,
`p_InstitutionId` int
)
BEGIN
if(p_Id=0)then

      Begin
          INSERT INTO
      Subject
      (
           AcademicYearId,
			CourseId,
           SubjectName,
           SubjectTypeId,
            SubjectParentId,
            Remarks,
           HasChild,
           InstitutionId
      )
       VALUES
       (
           p_AcademicYearId,
            p_CourseId,
           p_SubjectName,
            p_SubjectTypeId,
            p_SubjectParentId,
            p_Remarks,
           p_HasChild,
           p_InstitutionId
      );
      set p_Id = last_insert_id();

      End;
   ELSEIF p_Id>0
       THEN
           Update
           Subject
       Set
          AcademicYearId=p_AcademicYearId,
          CourseId=p_CourseId,
           SubjectName=p_SubjectName,
          SubjectTypeId=p_SubjectTypeId,
          SubjectParentId=p_SubjectParentId,
          Remarks=p_Remarks,
          InstitutionId = p_InstitutionId

      Where
               Id=p_Id;
    END IF;
   select p_Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `TableColumn_SP_List` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `TableColumn_SP_List`(IN `p_Id` INT, IN `p_CommonTable_Id` INT)
BEGIN
 declare v_IdValue varchar(50);
    	declare v_ColumnName varchar(100);
    	declare v_ColListactive varchar(100);
	declare v_PKColumnName varchar(50);
	declare v_TableName varchar(100);
	declare v_ColList VARCHAR(8000); 
	declare v_SqlQry VARCHAR(8000);
	declare v_sql VARCHAR(8000);
    
    	set v_IdValue = p_Id;

	SELECT DBTableName , CONCAT(ActiveColumn ,' IsActive ') INTO v_TableName, v_ColumnName
	FROM CommonTable
    	WHERE Id = p_CommonTable_Id;		
    
	SELECT GROUP_CONCAT(COALESCE(CONCAT(v_ColList, ', '), ''),
        IFNULL(CONCAT('(', ListSql, ') ', DBColumnName),DBColumnName))
	INTO v_ColList FROM CommonTableColumns
	WHERE CommonTable_Id = p_CommonTable_Id;  

	set v_SqlQry = CONCAT('SELECT ' , v_ColList , ', ' , ifnull(v_ColumnName, '''') , ' from ' , v_TableName  , ' M' , ' where Id = ', v_IdValue ,' || ', ifnull(v_IdValue, 0) =0); 

	set @stmt_str =  v_SqlQry;
	prepare stmt from @stmt_str;
	execute stmt;
	deallocate prepare stmt; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `TableColumn_SP_Select` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `TableColumn_SP_Select`(IN `p_CommonTable_Id` INT)
BEGIN
SELECT
		CTC.Id,
	    CommonTable_Id,
		DBColumnName,
		UIColumnName,
		UIMaxLength,
		UIMandatory,
		FieldType,
		ValidationType,
        DDSql,
		IsPk,
        IsUnique,
		IsDefault,
		DisplayOrder,
		ListRequired,
		ListWidth, 
		SortingRequired, 
		SearchColumn,
        CTC.UniqueColumn,        
		ifnull(CTC.FilterColumn, '') FilterColumn
	From 
		CommonTableColumns CTC
		Inner Join CommonTable CT  on CTC.CommonTable_Id =  CT.Id
	
	where	     
		CTC.CommonTable_Id =p_CommonTable_Id 
         
	Order By
		DisplayOrder;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `TableColumn_SP_View` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `TableColumn_SP_View`(IN `p_CommonTable_Id` INT, IN `p_PKId` INT)
    NO SQL
BEGIN
DECLARE v_PKColumnName varchar(50);
    DECLARE v_TableName varchar(100);
	DECLARE v_ColList VARCHAR(8000); 
	DECLARE v_SqlQry VARCHAR(8000); 
    
	SELECT 
	 DBTableName INTO v_TableName 
	from CommonTable 
	where 
		Id = p_CommonTable_Id; 		
        
        SELECT 
	 DBColumnName INTO v_PKColumnName 
	from CommonTableColumns 
	where 
		CommonTable_Id =p_CommonTable_Id  and IsPk = 1;        
        
	-- SELECT GROUP_CONCAT(COALESCE(CONCAT(v_ColList , ', '), '') , IFNULL(CONCAT('(' ,ListSql , ') ' , DBColumnName), DBColumnName)) INTO v_ColList
	-- FROM CommonTableColumns
	-- where 
	-- CommonTable_Id = p_CommonTable_Id;  
        
	SELECT GROUP_CONCAT(COALESCE(CONCAT(v_ColList , ', '), '') , DBColumnName) INTO v_ColList 
	FROM CommonTableColumns
	where 
		CommonTable_Id = p_CommonTable_Id;
    
	-- set v_SqlQry = CONCAT('SELECT ' , v_ColList , ' ,IsActive from ' , v_TableName , ' M where ', v_PKColumnName ,  ' =',p_PKId);  
    
    set v_SqlQry = CONCAT('SELECT ' , v_ColList , ' from ' , v_TableName , ' where ', v_PKColumnName ,  ' =',p_PKId);   

	set @stmt_str =  v_SqlQry;
	prepare stmt from @stmt_str;
	execute stmt;
	deallocate prepare stmt;   
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateHasChild` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateHasChild`(
`p_SubjectParentChild` int,
`p_AcademicYearId` int,
`p_CourseId` int,
`p_InstitutionId` int
)
Begin
Update
Subject S
set
HasChild = 1
where
S.SubjectName = p_SubjectParentChild and S.AcademicYearId=p_AcademicYearId and S.courseId=p_CourseId
and S.InstitutionId =p_InstitutionId; 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-23 16:32:59
