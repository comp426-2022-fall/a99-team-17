import express, { Router } from 'express';
const app = express();
const router = express.Router();

import path from 'path';
const __dirname = path.resolve();

// import db from 'better-sqlite3';
// const db = db();

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


app.use('/', router);


app.listen(port, function(err) {
    if(err) { 
        console.log(err);
        console.log("server listening on port: ", port);
    }
});