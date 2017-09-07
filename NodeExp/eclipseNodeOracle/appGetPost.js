/**
 * Created by Devendra on 19-Dec-16.
 */
var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    ,oracledb = require('oracledb');
//var request=require('request');
var app = express();
//app.use(express.logger('dev'));
/*app.use(express.bodyParser());
app.use(express.methodOverride());*/
//app.use(app.router);







var connAttrs = {
    "user": "devtest1",
    "password": "devtest1",
    "connectString": "localhost:1521/orcl1"
}
app.use(function (req, res, next) {
    console.log(req.body) // populated!
    next();
});
//This is for all CORS Requests----
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});





// GET method route
app.get('/get', function (req, res) {
    res.send('GET request to the homepage')
})

// POST method route
app.post('/post', function (req, res) {
   /* console.log('the name is -->'+req.body.ctrldir);
    console.log('the callvalue is -->'+req.body.callValue);*/
    console.log('the Tenderid is -->'+req.body.tenderid);
    //res.send('POST request to the homepage'+req.body.tenderid);
    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("SELECT * FROM TENDERBASEINFORMATION WHERE TENDERTXNNO = :tenderid", [req.body.tenderid], {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err || result.rows.length < 1) {
                res.set('Content-Type', 'application/json');
                var status = err ? 500 : 404;
                res.status(status).send(JSON.stringify({
                    status: status,
                    message: err ? "Error getting the user profile" : "User doesn't exist",
                    detailed_message: err ? err.message : ""
                }));
            } else {
                res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /user_profiles/" + req.body.tenderid + " : Connection released");
                    }
                });
        });
    });
});


/*app.Router('/book')
    .get(function (req, res) {
        res.send('Get a random book')
    })
    .post(function (req, res) {
        res.send('Add a book')
    })
    .put(function (req, res) {
        res.send('Update the book')
    })*/

var server = app.listen(3000, function () {
    "use strict";

    var host = server.address().address,
        port = server.address().port;

    console.log(' Server is listening at http://%s:%s', host, port);
});