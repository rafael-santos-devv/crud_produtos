
IF DB_ID('LojaDB') IS NULL
    CREATE DATABASE LojaDB;
GO

USE LojaDB;
GO

IF OBJECT_ID('dbo.Produtos', 'U') IS NULL
BEGIN
    CREATE TABLE Produtos (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nome NVARCHAR(100) NOT NULL,
        Preco DECIMAL(10,2) NOT NULL,
        Quantidade INT NOT NULL
    );
END;
GO
