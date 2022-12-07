import express, { response } from 'express';
import bodyParser from 'body-parser';
const app = express();

import path from 'path';
const __dirname = path.resolve();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

import sqlite3 from 'better-sqlite3';
const db = new sqlite3('./data.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);

    console.log("connection successful");
});


app.use(express.static('../client'));

import minimist from 'minimist';
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
    res.send("Hello, world!");
});

app.get('/clicks', (req, res) => {
    console.log("clicks");
    res.header('Access-Control-Allow-Origin', '*');
    res.send({
        click: "I clicked"
    });
});

app.post('/aclickss', async (req, res) => {
    const body = req.body;
    console.log(body);
    res.send(body);
});


db.close((err) => { 
    if (err) {
        return console.error(err.message);
    }
    console.loge('Close the database connection');
})