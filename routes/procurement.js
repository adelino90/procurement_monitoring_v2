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

app.get('/procurement_monitoring/:datefron/:dateto',function(req,res){
    /*var filePath = path.join(__dirname, '/../','public/test.xlsx');
    var file = fs.readFile(filePath, 'binary');

    res.setHeader('Content-Type', 'xlsx');
    res.setHeader('Content-Disposition', 'attachment; filename=test.xlsx');
    res.write(file, 'binary');
    res.end();*/
   res.sendFile(path.join(__dirname, '/../','public/test.xlsx'));
})
app.post('/save',function(req,res,next){
        alldata= req.body.idata
        model.save_data(alldata,function(data){
            if(data)
                res.send(data);
        });

});

app.post('/save_update',function(req,res,next){
        alldata= req.body.idata
        model.save_update_data(alldata,function(data){
            if(data)
                res.send(data);
        });

});

app.post('/delete_proc',function(req,res,next){
        alldata = {id:req.body.id}
        model.delete_procurement(alldata,function(data){
            
                res.send(data);
        });

});

app.post('/get_source_of_fund_filter_graph',function(req,res,next){
        alldata = {}
        model.get_source_of_fund_filter_graph(alldata,function(data){
            
                res.send(data);
        });

})

app.post('/Pr_Per_Month',function(req,res,next){
        alldata = {}
        model.Pr_Per_Month(alldata,function(data){
            
                res.send(data);
        });

})
app.post('/mode_of_proc_graph',function(req,res,next){
        alldata = {}
        model.mode_of_proc_graph(alldata,function(data){
            
                res.send(data);
        });

});

app.post('/get_Supplier_filter_graph',function(req,res,next){
        alldata = {}
        model.get_Supplier_filter_graph(alldata,function(data){
            
                res.send(data);
        });

});
app.post('/get_total',function(req,res,next){
        from = req.body.from;
        to = req.body.to;
        search = req.body.search;
        ptype = req.body.ptype 
        model.get_total(from,to,search,ptype,function(data){
            if(data)
                res.send(data.recordset[0]);
        });

});

app.post('/generate_excel',function(req,res,next){
       /* original data */
                input = req.body
                model.excel_data(input,function(data2){

               Header = [{
                            code_PAP: 'Code (PAP)',
                            pr_no: 'PR #',
                            PO_JO: 'PO/JO #',
                            program_proj_name: 'Procurement Program/Project',
                            end_user: 'PMO/End-User',
                            Mode:  'Mode of Procurement',
                            pre_Proc: 'Pre-Proc Conference',
                            ads_post_IAEB: 'Ads/Post of IAEB',
                            Pre_bid: 'Pre-bid Conf',
                            Eligibility_Check: 'Eligibility Check',
                            oob: 'Sub/Open of Bids',
                            Bid_Eval: 'Bid Evaluation',
                            Post_Qual: 'Post Qual',
                            Notice_of_Award: 'Notice of Award',
                            Contract_Signing: 'Contract Signing',
                            Notice_To_Proceed: 'Notice to Proceed',
                            Del_Completion: 'Delivery/ Completion',
                            Acceptance_date: 'Acceptance/ Turnover',
                            Source_of_Funds: 'Source of Funds',
                            ABC: 'Total',
                            ABC_MOOE: 'MOOE',
                            ABC_CO: 'CO',
                            ABC_Others: 'Others',
                            Contract_Cost: 'Total',
                            Contract_Cost_MOOE: 'MOOE',
                            Contract_Cost_CO: 'CO',
                            Contract_Cost_Others: 'Others',
                            Invited_Observers: 'List of Invited Observers',
                            DRP_Pre_Proc_conf: 'Pre-Proc Conf',
                            DRP_Pre_Bid_conf: 'Pre-bid Conf',
                            DRP_Eligibility_check: 'Eligibility Check',
                            DRP_OOP: 'Sub/Open of Bids',
                            DRP_Bid_Eval: 'Bid Evaluation',
                            DRP_Post_Qual: 'Post Qual',
                            DRP_Notice_of_Award: 'Notice of Award',
                            DRP_Contract_Signing:'Contract Signing',
                            DRP_Delivery_Accept: 'Delivery/ Accept',
                            Remarks: 'Remarks' }
                            ]    
                var data = Header.concat(data2)
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
							//console.log(cell_ref)
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