create database if not exists VertaDB;

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
    idSenderAddress BIGINT UNSIGNED  NOT NULL,
    idRecipientAddress BIGINT UNSIGNED  NOT NULL,
    idCargo BIGINT UNSIGNED  NOT NULL,
    datePickup DATE NOT NULL,
    foreign key (idSenderAddress) references Addresses(id) on update cascade,
    foreign key (idRecipientAddress) references Addresses(id) on update cascade,
    foreign key (idCargo) references Cargo(id) on update cascade
);

