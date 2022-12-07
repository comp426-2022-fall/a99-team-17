import express, { Router } from 'express';
const app = express();
const router = express.Router();

import path from 'path';
const __dirname = path.resolve();

// import db from 'better-sqlite3';
// const db = db();

app.use('/', router);

import {MongoClient} from 'mongodb';
const url = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url);

let db;

const dbName = "a99";

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');

    app.listen(port, function(err) {
        if(err) { 
            console.log(err);
            console.log("server listening on port: ", port);
        }
    });

    return 'done.';
}

import minimist from 'minimist';
const args = minimist(process.argv.slice(2));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

var port = 5555;
if (args.port) {
    port = args.port;
}


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
} )



// app.post('/clicked', (req, res) => {
//     const click = {clickTime: new Date()};
//     console.log(click);
//     console.log(db);

//     db.collection('clicks').save(click, (err, result) => {
//         if (err) {
//             return console.log(err);
//         }
//         console.log('click added to db');
//       res.sendStatus(201);
//     })
// })

// app.get('/clicks', (req, res) => {
//     console.log("clicks");
//     db.collection('clicks').find().toArray((err, result) => {
//       if (err) return console.log(err);
//       res.send(result);
//     });
// });

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());