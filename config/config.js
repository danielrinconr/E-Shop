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
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'postgres://postgres:admin@localhost/E-shopdb';
} else {
    urlDB = process.env.DATABASE_URL;
}

// urlDB = "postgres://avrsupdivtrqux:821ab634e76472360baec81609654692ae9c8992df5423d724a4c5af016ed1fa@ec2-174-129-41-127.compute-1.amazonaws.com:5432/daedc3k6et0isb";

process.env.URLDB = urlDB;