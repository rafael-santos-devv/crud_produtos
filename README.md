# CRUD de Produtos

## Descrição
API REST para gerenciamento de produtos, desenvolvida como atividade prática do curso de Programação Full-Stack.

## Tecnologias
- JavaScript
- Node.js
- Express
- SQL Server Express
- SQL Server Management Studio (SSMS)
- Postman

## Funcionalidades
- Cadastrar produtos (POST)
- Listar produtos (GET)
- Atualizar produtos (PUT)
- Excluir produtos (DELETE)

## Como executar

### 1. Instalar os pré-requisitos
Instale o Node.js, o SQL Server Express, o driver ODBC do SQL Server e o Postman.

### 2. Criar o banco de dados
Abra o SQL Server Management Studio, conecte-se à instância local e execute o arquivo `database.sql`.

### 3. Configurar a conexão
Confira os arquivos `config/db.js` e `.env`. Ajuste o nome da instância e do banco de dados conforme o ambiente.

A conexão atual utiliza autenticação do Windows e o driver ODBC 18.

### 4. Instalar as dependências
Abra o terminal na pasta do projeto e execute:

`npm install`

### 5. Iniciar a API
Execute:

`node app.js`

O servidor será iniciado na porta 3000.

### 6. Testar no Postman
- GET: http://localhost:3000/produtos
- POST: http://localhost:3000/produtos
- PUT: http://localhost:3000/produtos/1
- DELETE: http://localhost:3000/produtos/1

Para POST e PUT, envie os dados em Body → raw → JSON.

## Observação
O SQL Server precisa estar instalado e configurado, e a conta do Windows utilizada precisa ter permissão para acessar o banco de dados.