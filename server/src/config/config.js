require('dotenv').config(); // Make sure to require dotenv if you're using environment variables
const SQLite = require('sqlite3').verbose();

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: './habithubdb.sqlite', // Path to your SQLite database file
        dialectOptions: {
            mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE, // Ensure file creation if it doesn’t exist
        }
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