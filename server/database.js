import sqlite3 from 'better-sqlite3'; 

export const db = new sqlite3('data.db');

const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='access';`)
let accessrow = stmt.get();

const userstmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`)
let userrow = userstmt.get();
if (userrow === undefined) {
    const userinfoInit = `
    CREATE TABLE USERINFO (
        id INTEGER PRIMARY KEY,
        username VARCHAR,
        email VARCHAR
    );`
    db.exec(userinfoInit);
} else {
    console.log("user info table exists.")
}


