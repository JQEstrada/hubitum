require('dotenv').config(); // Make sure to require dotenv if you're using environment variables
const SQLite = require('sqlite3').verbose();

module.exports = {
    development: {
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
        password: process.env.DEV_DB_PASS || 'habitum',
        port: process.env.DEV_DB_PORT || 5432,
        username: "habitum",
        password: "wEFrpQufJcDA054iarG8hQiInoWjQE9N",
        logging: console.log
    },
    test: {
        database: process.env.TEST_DB_NAME || 'test_habithub',
        username: process.env.TEST_DB_USER || 'test_habithub',
        password: process.env.TEST_DB_PASS || 'test_habithub',
        dialect: 'sqlite',
        dialectOptions: {
          mode: SQLite.OPEN_READWRITE
        },
        options: {
        dialect: 'sqlite',
        storage: ':memory:' // In-memory database for testing
        }
    },
    production: {
        database: process.env.PROD_DB_NAME || 'prod_habithub',
        username: process.env.PROD_DB_USER || 'prod_habithub',
        password: process.env.PROD_DB_PASS || 'prod_habithub',
        dialect: 'sqlite',
        dialectOptions: {
          mode: SQLite.OPEN_READWRITE,
        },
        options: {
        dialect: 'sqlite',
        storage: 'path/to/your/production/database.sqlite'
        }
    },
    port: process.env.PORT || 8081,
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
};