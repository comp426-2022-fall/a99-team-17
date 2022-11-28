import express from 'express';

const db = require('better-sqlite3');
const app = express();

import minimist from minimist;
const args = minimist(process.argv.slice(2));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

var port = 5000;


app.listen(port);