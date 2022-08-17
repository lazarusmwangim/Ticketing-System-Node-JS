-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 17, 2022 at 05:26 AM
-- Server version: 5.5.16
-- PHP Version: 5.4.0beta2-dev

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ticketing`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_auth`
--

CREATE TABLE IF NOT EXISTS `api_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `api_token` varchar(100) NOT NULL,
  `date_added` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `api_auth`
--

INSERT INTO `api_auth` (`id`, `api_token`, `date_added`, `date_modified`) VALUES
(1, 'a', '2022-05-01 00:00:00', '2022-05-31 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `venue` varchar(50) NOT NULL,
  `desc` text NOT NULL,
  `organiser` varchar(50) NOT NULL,
  `capacity` int(6) NOT NULL,
  `celebs` varchar(100) NOT NULL,
  `offers` varchar(150) NOT NULL,
  `eventdate` datetime NOT NULL,
  `createddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `venue`, `desc`, `organiser`, `capacity`, `celebs`, `offers`, `eventdate`, `createddate`) VALUES
(1, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 10099, 'The One, Chosen Two', '0', '2022-08-16 00:00:00', '2022-08-16 17:26:52'),
(2, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', '0', '2022-08-16 18:03:41', '2022-08-16 16:58:30'),
(3, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', 'Come one come all', '2022-08-16 18:03:41', '2022-08-16 16:59:59'),
(4, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', 'Come one come all', '2022-08-16 18:03:41', '2022-08-16 17:04:36'),
(5, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', 'Come one come all', '2022-08-16 18:03:41', '2022-08-16 17:12:31'),
(6, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', 'Come one come all', '2022-08-16 18:03:41', '2022-08-16 17:18:40'),
(7, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 10099, 'The One, Chosen Two', 'Come one come all', '2022-08-16 18:03:41', '2022-08-17 05:24:57');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
