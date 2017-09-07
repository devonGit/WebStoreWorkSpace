var mysql = require("mysql"),
	express = require("express"),
	app = express();

var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	database : "node"
});

connection.connect();

app.use(express.bodyParser());

app.get("/",function  (req,res) {
	res.sendfile(__dirname+"/index.html");
})
//connection.end();

app.post('/', function(req, res){
    console.log(req.body);
    connection.query("INSERT into sample SET ?",req.body,function  (err,result) {
		if (err) throw err;
		res.send("Created "+JSON.stringify(result));
	});
	//res.send("Received"+req.body)
});

app.listen(3000);
console.log("listenening on 3000");