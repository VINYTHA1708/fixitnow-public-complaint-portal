-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2026 at 10:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fixitnowdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

CREATE TABLE `complaint` (
  `id` bigint(20) NOT NULL,
  `category` enum('ELECTRICITY','GARBAGE','OTHER','POTHOLE','STREETLIGHT','WATER_SUPPLY') DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `upvotes` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `assigned_staff_id` bigint(20) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaint`
--

INSERT INTO `complaint` (`id`, `category`, `description`, `status`, `title`, `upvotes`, `user_id`, `assigned_staff_id`, `createdAt`, `created_at`) VALUES
(8, 'STREETLIGHT', 'streetlight has broken in our area', 'In Progress', 'streetlight broken', 6, 11, 10, NULL, '2025-11-02 17:45:40'),
(9, 'GARBAGE', 'garbage', 'Assigned', 'garbage', 2, 11, NULL, NULL, '2025-11-02 17:45:40'),
(10, 'WATER_SUPPLY', 'water supply', 'Assigned', 'water supply', 2, 11, 10, NULL, '2025-11-02 17:45:40'),
(11, 'GARBAGE', 'Garbage not collected for 4 days', 'Assigned', 'Garbage not taken', 1, 11, 10, NULL, '2025-11-02 17:45:40'),
(12, 'STREETLIGHT', 'Streetlight not working for past 3 days', 'Resolved', 'Streetlight not working', 10, 11, NULL, NULL, '2025-11-02 17:45:40'),
(13, 'GARBAGE', 'garbage', 'Assigned', 'garbage', 2, 11, 10, NULL, '2025-11-02 17:45:40'),
(14, 'STREETLIGHT', 'streetlight', 'Assigned', 'streetlight', 4, 11, 10, NULL, '2025-11-02 17:45:40'),
(15, 'POTHOLE', 'pothole', 'Assigned', 'pothole', 3, 11, 10, NULL, '2025-11-02 17:45:40'),
(16, 'STREETLIGHT', 'street', 'Pending', 'street', 1, 11, NULL, NULL, '2025-11-02 17:48:08'),
(17, 'STREETLIGHT', 'street', 'Pending', 'str', 1, 11, NULL, NULL, '2025-11-04 09:42:12'),
(18, 'POTHOLE', 'there is a pothole in our road', 'Resolved', 'Pothole Issue', 2, 11, 10, NULL, '2025-11-07 19:28:51');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role_id` bigint(20) NOT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `address`, `email`, `name`, `phone`, `role_id`, `password`) VALUES
(7, 'theni', 'theertha@gmail.com', 'theertha', '0987654321', 3, 'theertha'),
(10, 'sevur, vellore', 'pooja@gmail.com', 'Pooja', '9876543210', 2, 'pooja'),
(11, 'Mannargudi', 'vinytha@gmail.com', 'vinytha', '1234567890', 1, 'vinytha'),
(13, 'Sivakasi', 'abi@gmail.com', 'Abi', '8765982304', 1, 'Abi');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `description`, `role`) VALUES
(1, 'person who raise complaints and upvote', 'citizen'),
(2, 'Who can resolve the complaints', 'staff'),
(3, 'Can manage users and complaints', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKh8dg5n7ibjyack6pn6e71djj6` (`user_id`),
  ADD KEY `FKm0o93f3gnvr5y7db6htvyga3a` (`assigned_staff_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  ADD KEY `FKn4pb12f3y8ktduy8fnc2xlln1` (`role_id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKs21d8k5lywjjc7inw14brj6ro` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaint`
--
ALTER TABLE `complaint`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `complaint`
--
ALTER TABLE `complaint`
  ADD CONSTRAINT `FKh8dg5n7ibjyack6pn6e71djj6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKm0o93f3gnvr5y7db6htvyga3a` FOREIGN KEY (`assigned_staff_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FKn4pb12f3y8ktduy8fnc2xlln1` FOREIGN KEY (`role_id`) REFERENCES `user_role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
