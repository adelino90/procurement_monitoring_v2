var config=require('../config.json');
const sql = require('mssql');
var path = require('path');
var model = require('../model/procurement.main.model');
//var model = require('../model/model.index');
process.setMaxListeners(0);
const gpool = new sql.ConnectionPool(config)
 
gpool.connect(err => {
    // ... 
})
function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  if (d!="Invalid Date")
    return [pad(d.getMonth()+1),pad(d.getDate()), d.getFullYear()].join('/');
  else 
    return undefined
}

function getDate(){
    var d = new Date();
    var n = d.getMonth();
    if(n>5){
        return ['01/01/'+d.getFullYear(),'06/30/'+d.getFullYear()]
    }
    else  return ['07/01/'+d.getFullYear(),'12/31/'+d.getFullYear()]
}
module.exports.controller = function(app) {
    app.get('/', function(req, res, next) {
    res.render('index',{title:"Procurement Monitoring"});

    });
    app.get('/getnav', function(req, res, next) {
             
        
        model.get_navigation(function(data){
                res.send(data);
            });

    });


        app.get('/readexcel',function(req,res,next){
                if(typeof require !== 'undefined') XLSX = require('xlsx');
                var workbook = XLSX.readFile('Procurement Monitoring Report 2nd Sem 2017 as of December 27 2017(December,13 2017).xlsx');
                var sheet_name_list = workbook.SheetNames;
                var worksheet = workbook.Sheets['Jul-Dec 2017 '];
                var d = new Date();
                var date_save = d.getMonth()+1 +'/'+d.getDay()+'/'+d.getFullYear();
                var headers = {};
                var data = [];
                //25 - 575

                for(i=8; i<=550 ; i++){
                    entry = {};
                    entry.code_PAP = (worksheet['A'+i] ? worksheet['A'+i].w: '')
                    entry.pr_no = (worksheet['B'+i] ? worksheet['B'+i].w: '') 
                    entry.PO_JO  = (worksheet['C'+i] ? worksheet['C'+i].w: '') 
                    entry.program_proj_name  = (worksheet['D'+i] ? worksheet['D'+i].w: '') 
                    entry.end_user  = (worksheet['E'+i] ? worksheet['E'+i].w: '') 
                    entry.MOP  = (worksheet['F'+i] ? worksheet['F'+i].w: '') 
                    entry.pre_Proc  = (worksheet['G'+i] ? convertDate(worksheet['G'+i].w): undefined)
                    entry.ads_post_IAEB  = (worksheet['H'+i] ? convertDate(worksheet['H'+i].w): undefined)
                    entry.Pre_bid = (worksheet['I'+i] ? convertDate(worksheet['I'+i].w) : undefined) 
                    entry.Eligibility_Check  = (worksheet['J'+i] ?  convertDate(worksheet['J'+i].w): undefined) 
                    entry.oob  = (worksheet['K'+i] ? convertDate(worksheet['K'+i].w) : undefined) 
                    entry.Bid_Eval  = (worksheet['L'+i] ? convertDate(worksheet['L'+i].w) : undefined)
                    entry.Post_Qual  = (worksheet['M'+i] ? convertDate(worksheet['M'+i].w): undefined) 
                    entry.Notice_of_Award  = (worksheet['N'+i] ? convertDate(worksheet['N'+i].w) : undefined)
                    entry.Contract_Signing  = (worksheet['O'+i] ? convertDate(worksheet['O'+i].w) : undefined) 
                    entry.Notice_To_Proceed  = (worksheet['P'+i] ? convertDate(worksheet['P'+i].w) : undefined) 
                    entry.Del_Completion = (worksheet['Q'+i] ? convertDate(worksheet['Q'+i].w) : undefined) 
                    entry.Acceptance_date  = (worksheet['R'+i] ? convertDate(worksheet['R'+i].w) : undefined) 
                    entry.Source_of_Funds  = (worksheet['S'+i] ? worksheet['S'+i].w: '') 
                    entry.ABC  = (worksheet['T'+i] ? worksheet['T'+i].w.replace(',', '') : '') 
                    entry.ABC_MOOE  = (worksheet['U'+i] ? worksheet['U'+i].w.replace(',', '') : '') 
                    entry.ABC_CO  = (worksheet['V'+i] ? worksheet['V'+i].w.replace(',', '') : '') 
                    entry.ABC_Others  = (worksheet['W'+i] ? worksheet['W'+i].w.replace(',', '') : '') 
                    entry.Contract_Cost  = (worksheet['X'+i] ? worksheet['X'+i].w.replace(',', '') : '') 
                    entry.Contract_Cost_MOOE = (worksheet['Y'+i] ? worksheet['Y'+i].w.replace(',', '') : '') 
                    entry.Contract_Cost_CO = (worksheet['Z'+i] ? worksheet['Z'+i].w.replace(',', '') : '') 
                    entry.Contract_Cost_Others  = (worksheet['AA'+i] ? worksheet['AA'+i].w.replace(',', '') : '') 
                    entry.Invited_Observers  = (worksheet['AB'+i] ? worksheet['AB'+i].w: '') 
                    entry.DRP_Pre_Proc_conf  = (worksheet['AC'+i] ?  convertDate(worksheet['AC'+i].w): undefined) 
                    entry.DRP_Pre_Bid_conf  = (worksheet['AD'+i] ? convertDate(worksheet['AD'+i].w) : undefined) 
                    entry.DRP_Eligibility_check  = (worksheet['AE'+i] ?  convertDate(worksheet['AE'+i].w): undefined) 
                    entry.DRP_OOP = (worksheet['AF'+i] ? convertDate(worksheet['AF'+i].w) : undefined) 
                    entry.DRP_Bid_Eval = (worksheet['AG'+i] ? convertDate(worksheet['AG'+i].w) : undefined) 
                    entry.DRP_Post_Qual = (worksheet['AH'+i] ? convertDate(worksheet['AH'+i].w) : undefined) 
                    entry.DRP_Notice_of_Award  = (worksheet['AI'+i] ? convertDate(worksheet['AI'+i].w) : undefined)
                    entry.DRP_Contract_Signing  = (worksheet['AJ'+i] ? convertDate(worksheet['AJ'+i].w) : undefined) 
                    entry.DRP_Delivery_Accept = (worksheet['AK'+i] ? convertDate(worksheet['AK'+i].w) : undefined) 
                    entry.Remarks  = (worksheet['AL'+i] ? worksheet['AL'+i].w: '') 
                    entry.supplier  =(worksheet['AM'+i] ? worksheet['AM'+i].w: '') 
                    entry.PO_JO_Date =(worksheet['AN'+i] ? convertDate(worksheet['AN'+i].w) : undefined) 
                    entry.PR_Date =(worksheet['AO'+i] ? convertDate(worksheet['AO'+i].w) : undefined) 
                    data.push(entry);
                    sql.close();
                    const request = new sql.Request(gpool)
                    .input('code_PAP', sql.NVarChar, entry.code_PAP)
                    .input('pr_no', sql.NVarChar, entry.pr_no)
                    .input('PR_Date', sql.NVarChar,  convertDate(entry.PR_Date))
                    .input('PO_JO', sql.NVarChar, entry.PO_JO)
                     .input('PO_JO_Date', sql.NVarChar,  convertDate(entry.PO_JO_Date))
                    .input('program_proj_name', sql.NVarChar, entry.program_proj_name)
                    .input('end_user', sql.NVarChar, entry.end_user)
                    .input('MOP', sql.Int,getMOP(entry.MOP) )
                    .input('pre_Proc', sql.NVarChar,  convertDate(entry.pre_Proc))
                    .input('ads_post_IAEB', sql.NVarChar,  convertDate(entry.ads_post_IAEB))
                    .input('Pre_bid', sql.NVarChar,  convertDate(entry.Pre_bid))
                    .input('Eligibility_Check', sql.NVarChar,  convertDate(entry.Eligibility_Check))
                    .input('oob', sql.NVarChar,  convertDate(entry.oob))
                    .input('Bid_Eval', sql.NVarChar,  convertDate(entry.Bid_Eval))
                    .input('Post_Qual', sql.NVarChar,  convertDate(entry.Post_Qual))
                    .input('Notice_of_Award', sql.NVarChar,  convertDate(entry.Notice_of_Award))
                    .input('Contract_Signing', sql.NVarChar,  convertDate(entry.Contract_Signing))
                    .input('Notice_To_Proceed', sql.NVarChar,  convertDate(entry.Notice_To_Proceed))
                    .input('Del_Completion', sql.NVarChar,  convertDate(entry.Del_Completion))
                    .input('Acceptance_date', sql.NVarChar,  convertDate(entry.Acceptance_date))
                    .input('Source_of_Funds', sql.Int, getFunds(entry.Source_of_Funds))
                    .input('ABC', sql.Float,parseFloat(entry.ABC))
                    .input('ABC_MOOE', sql.Float, parseFloat(entry.ABC_MOOE))
                    .input('ABC_CO', sql.Float, parseFloat(entry.ABC_CO))
                    .input('ABC_Others', sql.Float, parseFloat(entry.ABC_Others))
                    .input('Contract_Cost', sql.Float, parseFloat(entry.Contract_Cost))
                    .input('Contract_Cost_MOOE', sql.Float, parseFloat(entry.Contract_Cost_MOOE))
                    .input('Contract_Cost_CO', sql.Float, parseFloat(entry.Contract_Cost_CO))
                    .input('Contract_Cost_Others', sql.Float, parseFloat(entry.Contract_Cost_Others))
                    .input('Invited_Observers', sql.NVarChar, entry.Invited_Observers)
                    .input('DRP_Pre_Proc_conf', sql.NVarChar,  convertDate(entry.DRP_Pre_Proc_conf))
                    .input('DRP_Pre_Bid_conf', sql.NVarChar,  convertDate(entry.DRP_Pre_Bid_conf))
                    .input('DRP_Eligibility_check', sql.NVarChar,  convertDate(entry.DRP_Eligibility_check))
                    .input('DRP_OOP', sql.NVarChar,  convertDate(entry.DRP_OOP))
                    .input('DRP_Bid_Eval', sql.NVarChar,  convertDate(entry.DRP_Bid_Eval))
                    .input('DRP_Post_Qual', sql.NVarChar,  convertDate(entry.DRP_Post_Qual))
                    .input('DRP_Notice_of_Award', sql.NVarChar,  convertDate(entry.DRP_Notice_of_Award))
                    .input('DRP_Contract_Signing', sql.NVarChar,  convertDate(entry.DRP_Contract_Signing))
                    .input('DRP_Delivery_Accept', sql.NVarChar,  convertDate(entry.DRP_Delivery_Accept))
                    .input('Remarks', sql.NVarChar, entry.Remarks)
                    .input('date_today', sql.NVarChar, '12/06/2017')
                    .input('ptype', sql.Int, 1)
                    .input('supplier', sql.NVarChar, entry.supplier)
                    .execute('insert_procurement', (err, result) => {
                    // ... 
                        console.log(err)
                
                   })
                   
                }
                //console.log(data[455]);
                //drop those first two rows which are empty
                   //console.log(data)
                   // console.log(data[455])
        res.send('<h5>HI</h5>');

    })
}

function getMOP(Mop){
var MOP

if(Mop=="Agency to Agency")
    MOP=3;
else if(Mop=="Small Value Procurement")
    MOP=1;    
else if(Mop=="Shopping Ord/Reg Office Supplies & Eqpt Sec. 52.1b")
     MOP=2;    
else if(Mop=="Shopping Ord/Reg Office Supplies & Eqpt Sec. 52.1b")
     MOP=6;    
return MOP;
}


function getFunds(fund){
var FUND
//console.log(fund)
if(fund=="Fund 101"){
    FUND=1;
}
else if(fund=="SSP"){
    FUND=2;    
}
else if(fund=="Trust Fund"){
    FUND=4;    
}

 
return FUND;
}

