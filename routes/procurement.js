var fs = require('fs');
var XLSX = require('xlsx')
var path = require('path')

var model = require('../model/procurement.model');

module.exports.controller = function(app) {

app.get('/get_procurement', function(req, res, next) {
        model.proc_data(function(data){
            res.send(data)
        })
     });

app.post('/filter_proc', function(req, res, next) {

        var filterdata = {from:req.body.from,to:req.body.to,search_str:req.body.search_str}
        model.filter_proc_data(filterdata,function(data){
            res.send(data)
        })
    });

app.post('/view_procurement',function(req,res,next){
      
       var procurement_id = req.body.id
		      model.procurement_details(procurement_id,function(data){
                    res.send(data);
              })
     })

app.get('/get_excel',function(req,res){

    res.sendFile(path.join(__dirname, '/../','public/test.xlsx'));
})
  app.post('/save',function(req,res,next){
          alldata= req.body.idata
          model.save_data(alldata,function(data){
                if(data == "OK!")
                    res.send("OK");
          });

  });
app.post('/generate_excel',function(req,res,next){
       /* original data */
                input = req.body
                model.excel_data(input,function(data2){
             

                var data = data2
                var ws_name = "SheetJS";

                /* require XLSX */
               

                /* set up workbook objects -- some of these will not be required in the future */
                var wb = {}
                wb.Sheets = {};
                wb.Props = {};
                wb.SSF = {};
                wb.SheetNames = [];

                /* create worksheet: */
                var ws = {}

                /* the range object is used to keep track of the range of the sheet */
                var range = {s: {c:0, r:0}, e: {c:0, r:0 }};

                /* Iterate through each element in the structure */
                for(var R = 0; R != data.length; ++R) {
                if(range.e.r < R) range.e.r = R;
                    C=0
                    for(var key in data[R]) {
                        if(range.e.c < C) range.e.c = C;

                        /* create cell object: .v is the actual data */
                        var cell = { v: data[R][key]};
                        if(cell.v == null) cell.v = '';
                        if(key=="id") continue
                        /* create the correct cell reference */
                        var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

                        /* determine the cell type */
                        if(typeof cell.v === 'number') cell.t = 'n';
                        else if(typeof cell.v === 'boolean') cell.t = 'b';
                        else cell.t = 's';

                        /* add to structure */
                        ws[cell_ref] = cell;
                    C++;
                    }
                }
                


                ws['!ref'] = XLSX.utils.encode_range(range);

                /* add worksheet to workbook */
                wb.SheetNames.push(ws_name);
                wb.Sheets[ws_name] = ws;

                /* write file */
                XLSX.writeFile(wb,path.join(__dirname, '/../','public/test.xlsx'));
                res.send("Nice")
            })
    })
}