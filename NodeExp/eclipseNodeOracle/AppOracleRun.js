/**
 * Created by Devendra on 30-Dec-16.
 */
// This Code Working on Express 4 ........................
var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    ,oracledb = require('oracledb');
var urlc = require('url') ;

var bodyParser = require('body-parser');
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var connAttrs = {
    "user": "devtest1",
    "password": "devtest1",
    "connectString": "localhost:1521/orcl1"
}


app.all('/', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    console.log('The All Request URL is ------> '+req.url);
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/tms/userLogin', function (req, res) {
    "use strict";
    //  var header1=req.headers['head1']
   // tmsdao.login("devendra kumar");
    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        // connection.execute("SELECT UTL_RAW.CAST_TO_VARCHAR2(DBMS_LOB.SUBSTR(LOGOPATH, 3200,1))as Blobpth FROM DBCONNECTION ", {}, {
        connection.execute("SELECT DBMS_LOB.SUBSTR(LOGOPATH)as Blobpth FROM DBCONNECTION ", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the user profile",
                    detailed_message: err.message
                }));
            } else {
                res.contentType('application/json').status(200);
             //   Below Lines are CORS
                res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                // Set custom headers for CORS
                res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
                res.send(JSON.stringify(result.rows));
                //  res.send(result.rows);
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /user_profiles : Connection released");
                    }
                });
        });
    });

});

app.get('/tms/usrCompany', function (req, res) {
    "use strict";
    // var header1=req.headers['head1'];
    //console.log("the haeder value is-"+header1);
    console.log(req.headers);
    var username='Devendra kumar';
    var password='dev@123';

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        connection.execute("select REGISTRATIONID,COMPANYID,TO_CHAR(REGDATE,'DD-MM-YYYY') as REGDATE from company where REGISTRATIONID=1465", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the user profile",
                    detailed_message: err.message
                }));
            } else {
                res.contentType('application/json').status(200);
                //   Below Lines are CORS
                res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                // Set custom headers for CORS
                res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
                res.send(JSON.stringify(result.rows));
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /user_profiles : Connection released");
                    }
                });
        });
    });

});

app.get('/tms/tbInfo', function (req, res) {
    "use strict";
    // var header1=req.headers['head1'];
    //console.log("the haeder value is-"+header1);

    oracledb.getConnection(connAttrs, function (err, connection) {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }

        //connection.execute("select TENDERTXNNO,SHORTDESCRIPTION,ALTERNATESHORTDESCRIPTION as ArabicDesc from TENDERBASEINFORMATION where TENDERTXNNO=1062", {}, {
        connection.execute("select TENDERTXNNO,SHORTDESCRIPTION,ALTERNATESHORTDESCRIPTION as ArabicDesc from TENDERBASEINFORMATION ", {}, {
            outFormat: oracledb.OBJECT // Return the result as Object
        }, function (err, result) {
            if (err) {
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error getting the user profile",
                    detailed_message: err.message
                }));
            } else {
                res.contentType('application/json').status(200);
                //  res.writeHead(200, {'Access-Control-Allow-Origin' : '*'});
                res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                // Set custom headers for CORS
                res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
                res.send(JSON.stringify(result.rows));
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /user_profiles : Connection released");
                    }
                });
        });
    });

});

app.post('/tms/SearchtndInfo', function (req, res) {
    "use strict";
    console.log('the Tenderid is -->'+req.body.tenderid);
    console.log('the Url is  -->'+req.url);
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
                res.contentType('application/json').status(200);
                //   Below Lines are CORS
                res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                // Set custom headers for CORS
                res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
                res.contentType('application/json').status(200).send(JSON.stringify(result.rows));
            }
            // Release the connection
            connection.release(
                function (err) {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log("GET /Search Tender Id--/" + req.body.tenderid + " : Connection released");
                    }
                });
        });
    });
});



var server = app.listen(3000, function () {
    "use strict";

    var host = server.address().address,
        port = server.address().port;

    console.log(' Server is listening at http://%s:%s', host, port);
});
