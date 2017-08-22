var config=require('../config.json');
const sql = require('mssql');
var path = require('path');
var model = require('../model/procurement.main.model');
//var model = require('../model/model.index');


module.exports.controller = function(app) {
    app.get('/', function(req, res, next) {
    res.render('index',{title:"Procurement Monitoring"});

    });
    app.get('/getnav', function(req, res, next) {
             
        
        model.get_navigation(function(data){
                res.send(data);
            });

    });
}


