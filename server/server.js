import express, { response } from 'express';
import bodyParser from 'body-parser';
const app = express();

import path from 'path';
const __dirname = path.resolve();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

import sqlite3 from 'better-sqlite3'; 
const db = new sqlite3('proj.db');
db.pragma('journal_mode = WAL');

const sqlInit = `CREATE TABLE users (_id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, password VARCHAR);`
try {
    db.exec(sqlInit);
} catch (error) {}

const sqlInit2 = `CREATE TABLE logs (_id INTEGER PRIMARY KEY AUTOINCREMENT, user VARCHAR, message VARCHAR, time VARCHAR);`
try {
    db.exec(sqlInit2);
} catch (error) {}

// TO GET OLD VIEW (NO DATABASE) UNCOMMMENT LINE BELOW
// app.use(express.static('../client'));

// TO GET NEW VIEW (WITH DATABASE) UNCOMMENT LINE BELOW
app.use(express.static(path.join(__dirname, '..', 'views')));

import minimist from 'minimist';
import { fileURLToPath } from 'url';
const args = minimist(process.argv.slice(2));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

var port = 5555;
if (args.port) {
    port = args.port;
}

app.listen(port, function(err) {
    if(err) { 
        console.log(err);
        console.log("server listening on port: ", port);
    }
});

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/index', function(req, res){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    let user = req.app.get('user')

    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'succesful login or return to home', '${today.toISOString()}');`;
    db.exec(stmt1)
    res.render('index');
});

app.get('/login', function(req, res) {
    res.render('login')
});

app.post('/login', function(res, req) {
    const user = req.body.username;
    const password = req.body.password;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'attempted to login', '${today.toISOString()}');`;
    db.exec(stmt1)

    const stmt = db.prepare(`SELECT * FROM users WHERE user='${user}' and password='${password}';`);
    let row = stmt.get();
    if (row === undefined) {
        req.app.set('user', user);
        req.app.set('password', password);
        window.alert("Try again or create an account!");
    } else {
        req.app.set('user', user);
        req.app.set('password', password);
        res.redirect('/index');
    }});

app.get('/acc_info', function(req, res){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    let user= req.app.get('user')
    
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'viewed account info', '${today.toISOString()}');`;
    db.exec(stmt1)
    res.render('acc_info', {user: req.app.get('user'), password: req.app.get('password')});
});

app.post('/delete_acc', function(req, res){
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let user1 = req.body.username
    const stmt1 = `INSERT INTO logs (user, message, time) VALUES ('${user1}', 'deleted account', '${today.toISOString()}');`;
    db.exec(stmt1)

    const user= req.body.username;
    const password = req.body.password;
    const stmt = `DELETE FROM users WHERE user='${user}' and password='${password}';`
    db.exec(stmt)
    res.render('acc_deleted');
});

app.get('/users_db', function(req, res){
    const stmt = db.prepare(`SELECT * FROM users;`);
    let all = stmt.all();

    if(all === undefined) {
        res.send('nothing in db');
    } else {
        res.send(all);
    }
});

app.get('/logs_db', function(req, res){
    const stmt = db.prepare(`SELECT * FROM logs;`);
    let all = stmt.all();

    if(all === undefined) {
        res.send('nothing in db');
    } else {
        res.send(all);
    }
});

app.post('/newacc', function(req, res) {
    const user = req.body.username;
    const password = req.body.password;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const stmt2 = `INSERT INTO logs (user, message, time) VALUES ('${user}', 'tried to create new user', '${today.toISOString()}');`;
    db.exec(stmt2)

    const stmt1 = db.prepare(`SELECT * FROM users WHERE user='${user}'`);
    let row = stmt1.get();

    if (row === undefined) {
        const stmt = `INSERT INTO users (user, password) VALUES ('${user}', '${password}');`;
        db.exec(stmt)
        res.render('new_acc_made');
    } else {
        res.render('username_exists')
    }
    
});

app.get('/clicks', (req, res) => {
    console.log("clicks");
    res.header('Access-Control-Allow-Origin', '*');
    res.send({
        click: "I clicked"
    });
});