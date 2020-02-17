-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Feb 2020 pada 07.14
-- Versi server: 10.1.35-MariaDB
-- Versi PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arkademy_latihan_3`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(10) NOT NULL,
  `name_customer` varchar(50) NOT NULL,
  `total_price_cart` int(10) NOT NULL,
  `ppn` int(11) NOT NULL,
  `id_user` int(10) NOT NULL,
  `checkout` int(10) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `cart`
--

INSERT INTO `cart` (`id_cart`, `name_customer`, `total_price_cart`, `ppn`, `id_user`, `checkout`, `created_at`) VALUES
(1, 'Karunia', 80000, 8000, 1, 1, '2020-02-12'),
(2, 'Andrian', 45000, 4500, 1, 1, '2020-02-12'),
(3, 'Saputra', 45000, 4500, 1, 1, '2020-02-12'),
(4, 'sd', 45000, 4500, 1, 1, '2020-02-13'),
(5, 'asd', 55000, 5500, 1, 1, '2020-02-13'),
(6, 'aa', 40000, 4000, 1, 1, '2020-02-13'),
(7, 'zas', 30000, 3000, 1, 1, '2020-02-13'),
(8, 'asd', 115000, 11500, 1, 1, '2020-02-13'),
(9, 'a', 0, 0, 1, 0, '2020-02-13'),
(10, 'asd', 0, 0, 1, 0, '2020-02-13'),
(11, 'asd', 0, 0, 1, 0, '2020-02-13'),
(12, 'zza', 0, 0, 1, 1, '2020-02-13'),
(13, 'asd', 30000, 3000, 1, 1, '2020-02-13'),
(14, 'as', 30000, 3000, 1, 0, '2020-02-13'),
(15, 'asd', 10000, 1000, 1, 0, '2020-02-13'),
(16, 'dd', 0, 0, 1, 0, '2020-02-13'),
(17, 'deede', 20000, 2000, 1, 0, '2020-02-13'),
(18, 'asd', 25000, 2500, 1, 0, '2020-02-13'),
(19, 'das', 20000, 2000, 1, 0, '2020-02-13'),
(20, 'asd', 25000, 2500, 1, 0, '2020-02-13'),
(21, 'dd', 25000, 2500, 1, 0, '2020-02-13'),
(22, 'ss', 25000, 2500, 1, 0, '2020-02-13'),
(23, 'd', 30000, 3000, 1, 0, '2020-02-13'),
(24, 'Puli', 130000, 13000, 2, 0, '2020-02-13'),
(25, 'Reta', 65000, 6500, 2, 0, '2020-02-13'),
(26, 'Karunia', 40000, 4000, 1, 1, '2020-02-13');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart_detail`
--

CREATE TABLE `cart_detail` (
  `id_cart_detail` int(10) NOT NULL,
  `id_cart` int(10) NOT NULL,
  `id_product` int(10) NOT NULL,
  `qty` int(10) NOT NULL,
  `total_price` int(10) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `cart_detail`
--

INSERT INTO `cart_detail` (`id_cart_detail`, `id_cart`, `id_product`, `qty`, `total_price`, `created_at`) VALUES
(1, 1, 1, 3, 30000, '2020-02-12'),
(2, 1, 6, 2, 50000, '2020-02-12'),
(3, 2, 1, 2, 20000, '2020-02-12'),
(4, 2, 6, 1, 25000, '2020-02-12'),
(5, 3, 1, 2, 20000, '2020-02-12'),
(6, 3, 6, 1, 25000, '2020-02-12'),
(7, 4, 2, 1, 30000, '2020-02-13'),
(8, 4, 4, 1, 15000, '2020-02-13'),
(9, 5, 2, 1, 30000, '2020-02-13'),
(10, 5, 1, 1, 10000, '2020-02-13'),
(11, 5, 4, 1, 15000, '2020-02-13'),
(12, 6, 2, 1, 30000, '2020-02-13'),
(13, 6, 1, 1, 10000, '2020-02-13'),
(14, 7, 2, 1, 30000, '2020-02-13'),
(15, 8, 1, 1, 10000, '2020-02-13'),
(16, 8, 4, 1, 15000, '2020-02-13'),
(17, 8, 2, 3, 90000, '2020-02-13'),
(18, 13, 2, 1, 30000, '2020-02-13'),
(19, 14, 2, 1, 30000, '2020-02-13'),
(20, 15, 1, 1, 10000, '2020-02-13'),
(21, 17, 1, 2, 20000, '2020-02-13'),
(22, 18, 1, 1, 10000, '2020-02-13'),
(23, 18, 4, 1, 15000, '2020-02-13'),
(24, 19, 1, 2, 20000, '2020-02-13'),
(25, 20, 1, 1, 10000, '2020-02-13'),
(26, 20, 4, 1, 15000, '2020-02-13'),
(27, 21, 4, 1, 15000, '2020-02-13'),
(28, 21, 1, 1, 10000, '2020-02-13'),
(29, 22, 1, 1, 10000, '2020-02-13'),
(30, 22, 4, 1, 15000, '2020-02-13'),
(31, 23, 1, 3, 30000, '2020-02-13'),
(32, 24, 2, 3, 90000, '2020-02-13'),
(33, 24, 1, 4, 40000, '2020-02-13'),
(34, 25, 4, 3, 45000, '2020-02-13'),
(35, 25, 1, 2, 20000, '2020-02-13'),
(36, 26, 1, 1, 10000, '2020-02-13'),
(37, 26, 7, 3, 30000, '2020-02-13');

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id_category` int(10) NOT NULL,
  `name_category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id_category`, `name_category`) VALUES
(1, 'Food'),
(2, 'Drink'),
(3, 'Snack'),
(4, 'Toping'),
(6, 'Dessert'),
(7, 'z'),
(8, 'as');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id_product` int(10) NOT NULL,
  `name_product` varchar(50) NOT NULL,
  `desc_product` varchar(100) NOT NULL,
  `price_product` int(10) NOT NULL,
  `stock_product` int(10) NOT NULL,
  `image` varchar(100) NOT NULL,
  `id_category` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id_product`, `name_product`, `desc_product`, `price_product`, `stock_product`, `image`, `id_category`, `id_user`, `updated_at`, `created_at`, `deleted`) VALUES
(1, 'Martabak manis', 'Coklat kejus', 10000, 66, 'http://localhost:3001/uploads/1581563415435-WhatsApp Image 2019-10-19 at 9.59.14 AM (1).jpeg', 1, 1, '2020-02-13 03:10:15', '2020-02-10 15:17:53', 0),
(2, 'Aqua', 'segalon', 30000, 97, 'http://localhost:3001/uploads/1581445058572-air.jpg', 2, 1, '2020-02-12 23:26:18', '2020-02-11 03:34:16', 0),
(3, 'Air', 'air minum', 4000, 10, 'http://localhost:3001/uploads/1581393714314-air.jpg', 2, 1, '2020-02-12 10:05:28', '2020-02-11 04:01:54', 1),
(4, 'Tahi te', 'Rasa anggur', 15000, 84, 'http://localhost:3001/uploads/1581437420997-esteh.jpg', 2, 1, '2020-02-12 23:27:47', '2020-02-11 16:10:21', 0),
(5, 'Air putih', 'bening', 1500, 100, 'http://localhost:3001/uploads/1581437808838-air.jpg', 2, 1, '2020-02-12 10:05:36', '2020-02-11 16:16:48', 1),
(6, 'Nasi goreng', 'Pake ayam suir', 25000, 84, 'http://localhost:3001/uploads/1581444868360-nasigoreng.jpg', 1, 1, '2020-02-12 16:58:44', '2020-02-11 18:14:28', 0),
(7, 'Sate', '10 tusuk', 10000, 2, 'http://localhost:3001/uploads/1581563084872-baju_bayi.jpg', 1, 1, '2020-02-13 03:06:05', '2020-02-13 03:04:44', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(10) NOT NULL,
  `name_user` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `id_user_level` int(10) NOT NULL,
  `token` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `name_user`, `username`, `password`, `id_user_level`, `token`) VALUES
(1, 'admin', 'admin', '$2a$10$h5SEaEVLoTVGCilZg2CExuOUL8xB704PgU0QVrWnXC0ZDofaun7X.', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNTgxNTYzMDEyfQ.6beIl9ts3hWwYciQ-rVEjgzvLIEIWRKD39ggSeAro5Q'),
(2, 'rian', 'rian', '$2a$10$1hVCypJbJv.gCrTkcT3nf.wuC6vQ4P84avtMW896B.F6cHke3QBSu', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InJpYW4iLCJpYXQiOjE1ODE1NDk1NjV9.ovnIFd2j5MlLzSrejsC9xR94Pl0lt6rlmP3NtrSq5U0'),
(3, 'mamat', 'mamat', '$2a$10$2VwFc6e2DBON8iaQa1.TFeX33GThF/VqE2ppAkYQJ9ysKZmbkvEfe', 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Im1hbWF0IiwiaWF0IjoxNTgxNTUzNzEyfQ.W9TgxSWqe382mwmlgC7XLWDuBV7jR8yQonDpXWdVdXc'),
(4, 'karunia', 'karunia', '$2a$10$AGeLbLB7/DqhVoib9GKMGOdsSLCPMNS70OaFvlN9N1pWF98MAoNtq', 2, '');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users_level`
--

CREATE TABLE `users_level` (
  `id_user_level` int(11) NOT NULL,
  `name_level` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users_level`
--

INSERT INTO `users_level` (`id_user_level`, `name_level`) VALUES
(1, 'admin'),
(2, 'cashier');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `cart_detail`
--
ALTER TABLE `cart_detail`
  ADD PRIMARY KEY (`id_cart_detail`),
  ADD KEY `id_order` (`id_cart`),
  ADD KEY `id_product` (`id_product`);

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `id_category` (`id_category`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_user_level` (`id_user_level`);

--
-- Indeks untuk tabel `users_level`
--
ALTER TABLE `users_level`
  ADD PRIMARY KEY (`id_user_level`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `cart_detail`
--
ALTER TABLE `cart_detail`
  MODIFY `id_cart_detail` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `users_level`
--
ALTER TABLE `users_level`
  MODIFY `id_user_level` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `cart_detail`
--
ALTER TABLE `cart_detail`
  ADD CONSTRAINT `cart_detail_ibfk_1` FOREIGN KEY (`id_cart`) REFERENCES `cart` (`id_cart`),
  ADD CONSTRAINT `cart_detail_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `product` (`id_product`);

--
-- Ketidakleluasaan untuk tabel `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_user_level`) REFERENCES `users_level` (`id_user_level`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
