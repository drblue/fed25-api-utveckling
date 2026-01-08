-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 08 jan 2026 kl 08:35
-- Serverversion: 11.7.2-MariaDB
-- PHP-version: 8.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `fed25_phones`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `phones`
--

DROP TABLE IF EXISTS `phones`;
CREATE TABLE `phones` (
  `id` int(11) UNSIGNED NOT NULL,
  `manufacturer` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `imei` varchar(15) NOT NULL,
  `user_id` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `phones`
--

INSERT INTO `phones` (`id`, `manufacturer`, `model`, `imei`, `user_id`) VALUES
(1, 'Nokia', '8110', '536919122789773', 4),
(2, 'Chiqita', 'Banana Phone 3000', '983608827881831', 2),
(3, 'Samsung', 'Galaxy S1337', '490824788037364', 3),
(4, 'Ericsson', 'R310', '359156071226366', 5),
(5, 'HTC', 'Hero', '867287033072344', NULL),
(6, 'Apple', 'iPhone 6S', '355768071907615', 7),
(7, 'Nokia', '8100', '537028926319560', NULL),
(9, 'Nokia', '1337', '537128926419570', NULL),
(12, 'Motorola', 'V.BOX (V100)', '869531514880347', 11);

-- --------------------------------------------------------

--
-- Tabellstruktur `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `name`, `title`, `email`) VALUES
(2, 'Sean Banan', 'Banan-connoisseur', 'sean@banan.se'),
(3, 'Dr Alban', 'Doktor', 'dr.alban@doktor.se'),
(4, 'Thomas Anderson', 'Hacker', 'thomas.a.andersson@thematrix.com'),
(5, 'Thanos', 'Scientist', 'thanos@universe.com'),
(6, 'Korben Dallas', 'Taxi Driver', 'korben@dallas3000.com'),
(7, 'Leeloo', 'Multi-pass?', 'leeloo@bigbadaboom.com'),
(8, 'Marques Brownlee', 'Youtuber', 'mkbhd@thestudio.com');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `phones`
--
ALTER TABLE `phones`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `phones`
--
ALTER TABLE `phones`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
