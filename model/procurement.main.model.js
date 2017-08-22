
var config=require('../config.json');
const sql = require('mssql');
process.setMaxListeners(0);
const gpool = new sql.ConnectionPool(config)
 
gpool.connect(err => {
    // ... 
})

get_navigation = function(callback){

    	var menu = {navigation:[
            {bEnabled:true,bGranted:true,bVisible:true,nCaption:"Dashboard",nId:1,option:"dashboard",icon : "fa fa-dashboard fa-fw"},
            {bEnabled:true,bGranted:true,bVisible:true,nCaption:"Monitoring",nId:2,option:"monitoring",icon : "fa fa-table"},
			]};
            callback(menu);
}




exports.get_navigation = get_navigation;
