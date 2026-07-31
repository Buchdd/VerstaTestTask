USE VertaDB;

-- 1. Создаем адрес отправителя
INSERT INTO Addresses (city, street, house, apartment) 
VALUES ('Москва', 'Тверская', '12', '45');
SET @senderId = LAST_INSERT_ID();

-- 2. Создаем адрес получателя
INSERT INTO Addresses (city, street, house, apartment) 
VALUES ('Санкт-Петербург', 'Невский проспект', '88', '12');
SET @recipientId = LAST_INSERT_ID();

-- 3. Создаем запись о грузе (вес в кг)
INSERT INTO Cargo (weight) 
VALUES (15);
SET @cargoId = LAST_INSERT_ID();

-- 4. Создаем сам заказ со связями
INSERT INTO Orders (idSenderAddress, idRecipientAddress, idCargo, datePickup) 
VALUES (@senderId, @recipientId, @cargoId, '2026-08-01');

-- Проверяем результат со JOIN
SELECT 
    o.id AS OrderId,
    CONCAT(a1.city, ', ул. ', a1.street, ' d.', a1.house) AS Sender,
    CONCAT(a2.city, ', ул. ', a2.street, ' d.', a2.house) AS Recipient,
    c.weight AS WeightKg,
    o.datePickup AS PickupDate
FROM Orders o
JOIN Addresses a1 ON o.idSenderAddress = a1.id
JOIN Addresses a2 ON o.idRecipientAddress = a2.id
JOIN Cargo c ON o.idCargo = c.id;