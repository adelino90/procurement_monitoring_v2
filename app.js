var http = require('http');
var  iniparser = require('iniparser');
const fileUpload = require('express-fileupload');
var path = require('path');
var bodyParser = require('body-parser');
var sql = require('mssql'); 
var session = require('express-session');
var routes = require('./routes/index');
var fs = require('fs');
 var express= require('express');
 var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(session({secret: 'ssshhhhh'}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// dynamically include routes (Controller)

fs.readdirSync('./routes').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./routes/' + file);
      route.controller(app);
  }
});



var server = http.createServer(app).listen(3000, function() {
	console.log('App started on port ' + 3000);
});