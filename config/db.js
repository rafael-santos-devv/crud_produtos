
const sql = require("mssql/msnodesqlv8");
require("dotenv").config();

const config = {
    connectionString:
        `Driver={ODBC Driver 18 for SQL Server};` +
        `Server=localhost\\SQLEXPRESS;` +
        `Database=${process.env.DB_NAME};` +
        `Trusted_Connection=Yes;` +
        `TrustServerCertificate=Yes;`
};

const poolPromise = new sql.ConnectionPool(config).connect();

module.exports = { sql, poolPromise };
