import type{ Address, Cargo, Order } from '../types';

export const BROKEN_SQL = `create database if not exists VertaDB;

use VertaDB;
drop table if exists Orders;
drop table if exists Addresses;
drop table if exists Cargo;

create table Addresses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    house VARCHAR(20) NOT NULL,
    apartment VARCHAR(20)
);

create table Cargo(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    weight int not null
);

create table Orders(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idSenderAddress BIGINT NOT NULL, -- ❌ Ошибка: отсутствует UNSIGNED!
    idRecipientAddress BIGINT NOT NULL, -- ❌ Ошибка: отсутствует UNSIGNED!
    idCargo BIGINT NOT NULL, -- ❌ Ошибка: отсутствует UNSIGNED!
    datePickup DATE NOT NULL,
    foreign key (idSenderAddress) references Addresses(id) on update cascade,
    foreign key (idRecipientAddress) references Addresses(id) on update cascade,
    foreign key (idCargo) references Cargo(id) on update cascade
);`;

export const FIXED_SQL = `create database if not exists VertaDB;

use VertaDB;
drop table if exists Orders;
drop table if exists Addresses;
drop table if exists Cargo;

create table Addresses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    city VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    house VARCHAR(20) NOT NULL,
    apartment VARCHAR(20)
);

create table Cargo(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    weight int not null
);

create table Orders(
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idSenderAddress BIGINT UNSIGNED NOT NULL, -- ✅ Добавлено UNSIGNED
    idRecipientAddress BIGINT UNSIGNED NOT NULL, -- ✅ Добавлено UNSIGNED
    idCargo BIGINT UNSIGNED NOT NULL, -- ✅ Добавлено UNSIGNED
    datePickup DATE NOT NULL,
    foreign key (idSenderAddress) references Addresses(id) on update cascade,
    foreign key (idRecipientAddress) references Addresses(id) on update cascade,
    foreign key (idCargo) references Cargo(id) on update cascade
);`;

export const INITIAL_ADDRESSES: Address[] = [
  { id: 1, city: 'Москва', street: 'Тверская', house: '12', apartment: '45' },
  { id: 2, city: 'Санкт-Петербург', street: 'Невский проспект', house: '88', apartment: '12' },
  { id: 3, city: 'Казань', street: 'Баумана', house: '15', apartment: '3' },
  { id: 4, city: 'Екатеринбург', street: 'Ленина', house: '50', apartment: '101' },
];

export const INITIAL_CARGO: Cargo[] = [
  { id: 1, weight: 15 },
  { id: 2, weight: 42 },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 1,
    idSenderAddress: 1,
    idRecipientAddress: 2,
    idCargo: 1,
    datePickup: '2026-08-01',
    createdAt: '2026-07-29T10:00:00Z',
  },
  {
    id: 2,
    idSenderAddress: 3,
    idRecipientAddress: 4,
    idCargo: 2,
    datePickup: '2026-08-05',
    createdAt: '2026-07-29T11:30:00Z',
  },
];
