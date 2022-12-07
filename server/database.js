import sqlite3 from 'better-sqlite3';

const db = new sqlite3('data.db');

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='access';`)
let accessrow = stmt.get();


if (userrow === undefined) {
    const userinfoInit = `
    CREATE TABLE USERINTO (
        id INTEGER PRIMARY KEY,
        username VARCHAR,
        email VARCHAR
    );`
    db.exec(userinforInit);
} else {
    console.log("user info table exists.")
}


