import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./data/db.sqlite');

db.run(`CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT(1000) NOT NULL,
    email TEXT(1000) NOT NULL,
    description TEXT(5000) NOT NULL
)`)

export class StudentSqlStore {
    async create(student) {
       return new Promise((resolve, reject) => {
           db.run(
               `INSERT INTO students(name, email, description) VALUES (?, ?, ?)`,
               [student.name, student.email, student.description],
               function (err, row) {
                   if (err) {
                       return reject(err);
                   }

               return resolve(this.lastID);
           })
       })
    }

    async read(id) {
        return new Promise((resolve, reject) => {
            db.get(
                `SELECT * FROM students WHERE id = ?`,
                id,
                function (err, row) {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(row);
                })
        })
    }

    async update() {

    }

    async delete() {

    }

    async list() {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM students`,
                function (err, row) {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(row);
                })
        })
    }
}