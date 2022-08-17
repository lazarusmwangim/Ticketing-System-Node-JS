-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 17, 2022 at 08:55 AM
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
  `date_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `api_auth`
--

INSERT INTO `api_auth` (`id`, `api_token`, `date_added`, `date_modified`) VALUES
(1, 'a', '2022-05-01 00:00:00', '2022-05-30 21:00:00');

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
  `createddate` datetime NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `venue`, `desc`, `organiser`, `capacity`, `celebs`, `offers`, `eventdate`, `createddate`, `update_date`) VALUES
(1, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', '0', '2022-08-16 00:00:00', '2022-08-17 08:31:16', '0000-00-00 00:00:00'),
(2, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', '0', '2022-08-16 18:03:41', '2022-08-16 19:58:30', '0000-00-00 00:00:00'),
(3, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', 'Come one come all', '2022-08-16 18:03:41', '2022-08-16 19:59:59', '0000-00-00 00:00:00'),
(4, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', 'Come one come all', '2022-08-16 18:03:41', '2022-08-16 20:04:36', '0000-00-00 00:00:00'),
(5, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', 'Come one come all', '2022-08-16 18:03:41', '2022-08-16 20:12:31', '0000-00-00 00:00:00'),
(6, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', 'Come one come all', '2022-08-16 18:03:41', '2022-08-16 20:18:40', '0000-00-00 00:00:00'),
(7, 'First Last', 'Serena H', 'Graduation party celebration', 'Lazarus', 100, 'The One, Chosen Two', 'Come one come all', '2022-08-16 18:03:41', '2022-08-17 08:31:30', '2022-08-17 06:45:10'),
(8, 'Mugithi Fest', 'Greenspot, Eastern Bypass', 'Samidoh live performance test event ticketing', 'Lazarus', 100, 'Samidoh, Gathee wa Njeri, Firinda', 'Buy 3 beers, get 1 free', '2022-08-18 17:00:00', '2022-08-17 11:49:09', '2022-08-17 08:49:09'),
(9, 'Mugithi Fest', 'Greenspot, Eastern Bypass', 'Samidoh live performance test event ticketing', 'zpTBgb&A0wB4CLZF9XvL9HAD2EkXDON3', 100, 'Samidoh, Gathee wa Njeri, Firinda', 'Buy 3 beers, get 1 free', '2022-08-18 17:00:00', '2022-08-17 11:50:11', '2022-08-17 08:50:11');

-- --------------------------------------------------------

--
-- Table structure for table `event_managers`
--

CREATE TABLE IF NOT EXISTS `event_managers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `f_name` varchar(50) NOT NULL,
  `m_name` varchar(30) NOT NULL,
  `l_name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `auth_token` varchar(50) NOT NULL,
  `create_date` datetime NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1111116 ;

--
-- Dumping data for table `event_managers`
--

INSERT INTO `event_managers` (`id`, `username`, `phone`, `f_name`, `m_name`, `l_name`, `email`, `password`, `auth_token`, `create_date`, `update_date`) VALUES
(1111113, 'swan', '+254705934323', 'Test', 'First', 'User', 'swan@tickets.net', '$2b$10$iJpKl/NiZbDY9g3ebJM4uOyut7isyKBChr8N6gA/kXXZCBKVugP.6', 'zpTBgb&A0wB4CLZF9XvL9HAD2EkXDON3', '2022-08-17 10:58:14', '0000-00-00 00:00:00');

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

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('U1WaY5J047H_E4lBXYGpJ2Kke2WOde_J', 1660732211, '{"cookie":{"originalMaxAge":6000000,"expires":"2022-08-17T10:20:24.172Z","secure":false,"httpOnly":true,"path":"/","sameSite":true},"user":"zpTBgb&A0wB4CLZF9XvL9HAD2EkXDON3"}');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE IF NOT EXISTS `tickets` (
  `ticket_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `desc` text NOT NULL,
  `price` double NOT NULL,
  `reserved` int(11) NOT NULL DEFAULT '0',
  `expiry` datetime NOT NULL,
  `createdon` datetime NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ticket_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`ticket_id`, `event_id`, `category`, `desc`, `price`, `reserved`, `expiry`, `createdon`, `update_date`) VALUES
(1, 3, 'Single', 'Graduation party celebration. Ticket for 1 person', 350, 0, '2022-08-19 18:00:00', '2022-08-17 09:40:28', '2022-08-16 05:03:41'),
(2, 3, 'Couple', 'Graduation party celebration. Ticket for 1 person', 500, 0, '2022-08-19 18:00:00', '2022-08-17 10:20:45', '2022-08-16 05:03:41'),
(3, 3, 'Mbogi', 'Graduation party celebration. Ticket for a group of 10 persons max.', 2000, 0, '2022-08-19 18:00:00', '2022-08-17 10:21:22', '2022-08-16 05:03:41'),
(4, 3, 'VIP', 'Graduation party celebration. Ticket for 1 person in the VIP', 1000, 0, '2022-08-19 18:00:00', '2022-08-17 10:21:48', '2022-08-16 05:03:41');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
