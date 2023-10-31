import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./data/db.sqlite');

db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT(100) NOT NULL,
    password TEXT(1000) NOT NULL
)`)

export class UserSqlStore {
    async create(user) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO users(username, password) VALUES (?, ?)`,
                [user.username, user.password],
                function (err, row) {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(this.lastID);
                })
        })
    }

    async read(username) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT * FROM users WHERE username = ?`,
                username,
                function (err, row) {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(row);
                })
        })
    }
}