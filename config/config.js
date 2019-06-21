// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Base de datos
// ============================
// const localClient = {
//     user: "postgres",
//     password: "admin",
//     host: "localhost",
//     port: 5432,
//     database: "E-shopdb"
// };
// process.env.localClient = "postgres://postgres:admin@localhost/E-shopdb"
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'postgres://postgres:admin@localhost/E-shopdb';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;