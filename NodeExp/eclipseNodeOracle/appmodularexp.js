/**
 * Created by Devendra on 20-Dec-16.
 */
var express = require("express");
var app = express();
var myroutes = require('./routes/oracleRoutes');


app.use(express.bodyParser());
app.use(express.methodOverride());
/*var log4js = require( "log4js" );
log4js.configure( "./config/log4jExp.json" );*/

/*//log4js.configure( "./config/lo4j.json" );
var logger = log4js.getLogger( "test-file-appender" );
log4js.getLogger("app")// will return logger that prints log to the console
logger.debug("Hello log4js");// store log in file
logger.info('i m in log....');*/

//http://localhost:1234/myweb/
//http://localhost:1234/myweb/about



/*app.use(express.bodyParser());*/
/*app.use(express.methodOverride());*/

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




app.use('/tmsApi', myroutes);

app.listen(3000,function(){
    console.log("Server Start...");
});