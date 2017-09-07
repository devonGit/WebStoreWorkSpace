
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,oracledb = require('oracledb');
var  tmsdao = require("./OrclDAO/tmsDao.js");
var bodyParser = require('body-parser');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
///**/app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.bodyParser());
//app.use(express.methodOverride());
//app.use(app.router);
/*app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/
var connAttrs = {
	    "user": "devtest1",
	    "password": "devtest1",
	    "connectString": "localhost:1521/orcl1"
	}
/*var connAttrs1 = {
    "user": "tmsadmin",
    "password": "tmsadmin",
    "connectString": "10.162.9.131:1521/etdbtest"
}*/
//This is for all Cross----------
app.all('/!*', function(req, res, next) {
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


app.get('/indx', routes.index);
app.get('/users', user.list);

app.get('/tms/userLogin', function (req, res) {
    "use strict";
  //  var header1=req.headers['head1']
    tmsdao.login("devendra kumar");
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
              //  res.writeHead(200, {'Access-Control-Allow-Origin' : '*'});
                /*res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                });*/
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

app.get('/usrCompany', function (req, res) {
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
                res.writeHead(200, {'Access-Control-Allow-Origin' : '*'});
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

// Http method: GET
// URI        : /userprofiles/:USER_NAME
// Read the profile of user given in :USER_NAME
//app.post('/tms/tenderbaseInfo/:tenderid', function (req, res) {

app.post('/tms/tenderbaseInfo/', function (req, res) {
    "use strict";

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

        connection.execute("SELECT * FROM TENDERBASEINFORMATION WHERE TENDERTXNNO = :tenderid", [req.params.tenderid], {
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
                        console.log("GET /user_profiles/" + req.params.tenderid + " : Connection released");
                    }
                });
        });
    });
});



/*http.createServer(app).listen(app.get('port'),"127.0.0.1", function(){

  console.log('Express server listening on port ' + app.get('port'));

});*/
var server = app.listen(3000, function () {
    "use strict";

    var host = server.address().address,
        port = server.address().port;

    console.log(' Server is listening at http://%s:%s', host, port);
});