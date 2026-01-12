-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 12 jan 2026 kl 10:53
-- Serverversion: 11.7.2-MariaDB
-- PHP-version: 8.4.7

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Databas: `fed25_books`
--

--
-- Dumpning av Data i tabell `Author`
--

INSERT INTO `Author` (`id`, `name`) VALUES
(1, 'Sir Arthur C. Clarke'),
(2, 'Isaac Asimov'),
(3, 'Jason Anspach'),
(4, 'Nick Cole'),
(5, 'J.R.R. Tolkien'),
(6, 'Jane Austen'),
(7, 'Douglas Adams'),
(8, 'Amal El-Mohtar'),
(9, 'Max Gladstone'),
(11, 'Mr Beast');

--
-- Dumpning av Data i tabell `Book`
--

INSERT INTO `Book` (`id`, `title`, `pages`) VALUES
(1, '2001: A Space Odessey', 224),
(2, '2010: Odessey Two', 291),
(3, 'Foundation', 542),
(4, 'Galaxy\'s Edge: Book 1-2', 674),
(5, 'Pride and Prejudice', 279),
(6, 'The Hitchhiker\'s Guide to the Galaxy', 216),
(7, 'The Restaurant at the End of the Universe', 250),
(8, 'Life, the Universe and Everything', 224),
(9, 'So Long, and Thanks for All the Fish', 225),
(10, 'Mostly Harmless', 288),
(11, 'This Is How You Lose the Time War', 208),
(13, 'This Is How You Get Rich Quick', 1);

--
-- Dumpning av Data i tabell `_AuthorToBook`
--

INSERT INTO `_AuthorToBook` (`A`, `B`) VALUES
(1, 1),
(1, 2),
(2, 3),
(5, 3),
(3, 4),
(4, 4),
(5, 4),
(6, 5),
(7, 6),
(7, 7),
(7, 8),
(7, 9),
(7, 10),
(8, 11),
(9, 11),
(11, 13);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
