
const express = require("express");
const { sql, poolPromise } = require("./config/db");

const app = express();

app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.json({ mensagem: "API de produtos funcionando!" });
});

// Cadastrar produto
app.post("/produtos", async (req, res) => {
    const { nome, preco, quantidade } = req.body;

    try {
        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("nome", sql.NVarChar(100), nome)
            .input("preco", sql.Decimal(10, 2), preco)
            .input("quantidade", sql.Int, quantidade)
            .query(`
                INSERT INTO Produtos (Nome, Preco, Quantidade)
                OUTPUT INSERTED.Id
                VALUES (@nome, @preco, @quantidade)
            `);

        res.status(201).json({
            mensagem: "Produto cadastrado!",
            id: resultado.recordset[0].Id
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao cadastrar produto"
        });
    }
});

// Listar produtos
app.get("/produtos", async (req, res) => {
    try {
        const pool = await poolPromise;

        const resultado = await pool.request().query(`
            SELECT Id, Nome, Preco, Quantidade
            FROM Produtos
            ORDER BY Id
        `);

        res.json(resultado.recordset);

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao buscar produtos"
        });
    }
});

// Atualizar produto
app.put("/produtos/:id", async (req, res) => {
    const id = Number(req.params.id);
    const { nome, preco, quantidade } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID inválido"
        });
    }

    try {
        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .input("nome", sql.NVarChar(100), nome)
            .input("preco", sql.Decimal(10, 2), preco)
            .input("quantidade", sql.Int, quantidade)
            .query(`
                UPDATE Produtos
                SET Nome = @nome,
                    Preco = @preco,
                    Quantidade = @quantidade
                WHERE Id = @id
            `);

        if (resultado.rowsAffected[0] === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json({
            mensagem: "Produto atualizado!"
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao atualizar produto"
        });
    }
});

// Excluir produto
app.delete("/produtos/:id", async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            erro: "ID inválido"
        });
    }

    try {
        const pool = await poolPromise;

        const resultado = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                DELETE FROM Produtos
                WHERE Id = @id
            `);

        if (resultado.rowsAffected[0] === 0) {
            return res.status(404).json({
                erro: "Produto não encontrado"
            });
        }

        res.json({
            mensagem: "Produto excluído com sucesso!"
        });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({
            erro: "Erro ao excluir produto"
        });
    }
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor executando na porta 3000");
});
