/**
 * Created by Devendra on 20-Dec-16.
 */
var express= require("express");
var app = express();
var router = express.Router();
/*app.use(express.logger('dev'));*/
 var connAttrs = {
 "user": "devtest1",
 "password": "devtest1",
 "connectString": "localhost:1521/orcl1"
 }
var log4js = require( "log4js" );
log4js.configure( "./config/log4jExp.json" );
var logger = log4js.getLogger('tmsRoute');
/*var logger = log4js.getLogger('gotoConsole');*/
log4js.loadAppender('console');
log4js.addAppender(log4js.appenders.console());
logger.setLevel('ERROR');
logger.setLevel('INFO');

/*logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');*/


// define the home page route
router.get('/', function(req, res) {
    logger.info('in Get request......');
    res.send('This is Home Page Get Request for TMS API.....');
});
// define the about route
router.get('/about', function(req, res) {
    res.send('This is About use Page Request');
});
router.post('/',function(req,res){
    res.send('This is the Post Request....');
})
router.get('/downloadfile', function (req, res) {
   // res.download('./public/empExt.pdf','sample1.pdf', function(err){
    res.download('F:/WebStoreWorkSpace/NodeExp/eclipseNodeOracle/public/empExt.pdf','C1ExtentionList.pdf', function(err){
        if (err) {
            console.log(err);
        } else {
            console.log('The pdf downloaded....');  // decrement a download credit etc
        }
    });
   // res.send('GET request to the homepage')
})
module.exports = router;