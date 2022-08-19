const { Pool } = require ('pg');

const pool =  new Pool({
    user: "abrahan",
    host: "localhost",
    database: "proyecto_hamburguesas",
    password: "postgres",
    port: 5432,
});

module.exports={
    pool
}