require('dotenv').config(); // Make sure to require dotenv if you're using environment variables
const SQLite = require('sqlite3').verbose();

module.exports = {
    development: {
        dialect: 'postgres',
        protocol: 'postgres',
        // dialectOptions: {
        //     ssl: {
        //       require: true,
        //       rejectUnauthorized: false, // Important for self-signed certificates
        //     },
        //   },
        host: process.env.DEV_DB_HOST || 'localhost',
        database: process.env.DEV_DB_NAME || 'habitum',
        username: process.env.DEV_DB_USER || 'postgres',
        password: process.env.DEV_DB_PASS || 'admin',
        port: process.env.DEV_DB_PORT || 5432,
        password: "admin",
        logging: console.log
    },
    test: {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // Important for self-signed certificates
            },
          },
        host: process.env.DEV_DB_HOST || 'dpg-cue02r0gph6c73ab97eg-a.frankfurt-postgres.render.com',
        database: process.env.DEV_DB_NAME || 'habitum',
        username: process.env.DEV_DB_USER || 'habitum',
        port: process.env.DEV_DB_PORT || 5432,
        password: "wEFrpQufJcDA054iarG8hQiInoWjQE9N",
        logging: console.log
    },
    production: {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // Important for self-signed certificates
            },
          },
        host: process.env.DEV_DB_HOST || 'dpg-cue02r0gph6c73ab97eg-a.frankfurt-postgres.render.com',
        database: process.env.DEV_DB_NAME || 'habitum',
        username: process.env.DEV_DB_USER || 'habitum',
        port: process.env.DEV_DB_PORT || 5432,
        password: "wEFrpQufJcDA054iarG8hQiInoWjQE9N",
        logging: console.log
    },
    port: process.env.PORT || 8081,
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
};