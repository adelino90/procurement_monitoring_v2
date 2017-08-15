var config=require('../config.json');
const sql = require('mssql');
var path = require('path');
//var model = require('../model/model.index');


module.exports.controller = function(app) {
    app.get('/', function(req, res, next) {
    res.render('index',{title:"E-Buletin Website"});

    });
}