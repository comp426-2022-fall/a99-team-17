import express, { response } from 'express';
import bodyParser from 'body-parser';
const app = express();

import path from 'path';
const __dirname = path.resolve();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

import db from './database'

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

// create user endpoint
app.post('/user/new/', (req, res, next) => {
    let userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const stmt = db.prepare('INSERT INTO userinfo (username, email) VALUES (?, ?)');
    const info = stmt.run(userData.username, userData.email);
    res.status(200).json({"message": "user" + userData.username + "created"});
    console.log(userData);
    console.log(info);
});

// read user endpoint
app.get('/user/info/:username/', (req, res, next) => {
    let userData = {
        username: req.params.username
    }
})

// delete user info enpoint
app.delete('/user/bye', (req, res, next) => {
    let userData = {
        username: req.body.username
    }
});

// send some data endpoint
app.post('/senddata/:username/', (req, res, next) => {
    console.log(req.params.username + " logged in with this passwordL " + req.body.password)
    res.status(200).json({
        username: req.params.username,
        password: req.body.password
    }).end();
})

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