var moment = require('moment');   
var config=require('../config.json');
const sql = require('mssql');
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
function nullvalidation(input){
    if(input==null)
    return '';
    else
    return input;
}

getDate = function(){
    var d = new Date();
    var n = d.getMonth();
    if(n<5){
          return ['01/01/'+d.getFullYear(),'06/30/'+d.getFullYear()]
    }
    else  return ['07/01/'+d.getFullYear(),'12/31/'+d.getFullYear()]
}


proc_data = function(callback){
    
            var dates = getDate();
            var datefrom = new Date(dates[0])
            var dateto = new Date(dates[1])
            datefrom = moment(datefrom).format('LL')
            dateto = moment(dateto).format('LL')
            var html="";   
            sql.close();
            const request = new sql.Request(gpool)
            .input('ptype', sql.Int, 2)
            .input('search_str', sql.NVarChar, '')
            .input('from', sql.NVarChar, datefrom)
            .input('to', sql.NVarChar,  dateto)
            .execute('procurement_search', (err, result) => {
              // ...      
             record_len = result.recordset.length;
             data = result.recordset;

              html = html+` <tr class = "row-hover procurement_data" data-id = 'none'>\
                                      <td class = "cellsh small_width"></td>\
                                      <td class = "cellsh small_width"></td>\
                                      <td class = "cellsh small_width"></td> \
                                      <td class = "cellsh program_name no-pads"><b>A. PUBLIC BIDDINGS</b></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td> \ 
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td> \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                  </tr>
                                  `;

                  for(i=0;i<record_len;i++){
                                html=html+' <tr class = "row-hover procurement_data" data-id = '+ nullvalidation(data[i].id) +' >\
                                    <td class = "cells small_width">'+ nullvalidation(data[i].code_PAP) +'</td>\
                                    <td class = "cells small_width">'+ nullvalidation(data[i].pr_no) +'</td>\
                                    <td class = "cells small_width">'+ nullvalidation(data[i].PO_JO) +'</td>\
                                    <td class = "cells program_name no-pads">'+ nullvalidation(data[i].program_proj_name)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].end_user)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Mode)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].pre_Proc) +'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ads_post_IAEB)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Pre_bid) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Eligibility_Check)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].oob) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Bid_Eval)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Post_Qual)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Notice_of_Award) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Signing)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Notice_To_Proceed)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Del_Completion)+'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Acceptance_date) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Source_of_Funds)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC_MOOE) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC_CO)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC_Others) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost) +'</td> \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost_MOOE) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost_CO) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost_Others)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Invited_Observers) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Pre_Proc_conf)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Pre_Bid_conf) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Eligibility_check)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_OOP) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Bid_Eval) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Post_Qual) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Notice_of_Award)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Contract_Signing) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Delivery_Accept) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Remarks)  +'</td>\
                                </tr>';
                            
              }

                const request1 = new sql.Request(gpool)
                .input('ptype', sql.Int, 1)
                .input('from', sql.NVarChar, datefrom)
                .input('to', sql.NVarChar, dateto)
                .input('search_str', sql.NVarChar, "")
                .execute('procurement_search', (err, result2) => {

                  record_len2 = result2.recordset.length;
                  data2 = result2.recordset;
                   const request3 = new sql.Request(gpool)
                        .input('from', sql.NVarChar, datefrom)
                        .input('to', sql.NVarChar, dateto)
                        .input('search_str', sql.NVarChar, "")
                        .input('ptype', sql.Int, 1)
                        .execute('get_total_ABC_CC', (err, result3) => {

                          data3 = result3.recordset;
                        html = html+` <tr class = "row-hover procurement_data" data-id = 'none'>\
                                      <td class = "cellsh small_width"></td>\
                                      <td class = "cellsh small_width"></td>\
                                      <td class = "cellsh small_width"></td> \
                                      <td class = "cellsh program_name no-pads"><b>B. ALTERNATIVE MODE OF PROCUREMENT</b></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td> \ 
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td> \ 
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td> \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                  </tr>`;

                  for(i=0;i<record_len2;i++){
                    html=html+' <tr class = "row-hover procurement_data" data-id = '+ nullvalidation(data2[i].id) +'>\
                                      <td class = "cells small_width">'+ nullvalidation(data2[i].code_PAP) +'</td>\
                                      <td class = "cells small_width">'+ nullvalidation(data2[i].pr_no) +'</td>\
                                      <td class = "cells small_width">'+ nullvalidation(data2[i].PO_JO) +'</td>\
                                      <td class = "cells program_name no-pads">'+ nullvalidation(data2[i].program_proj_name)+'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].end_user)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Mode)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].pre_Proc) +'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].ads_post_IAEB)+'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Pre_bid) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Eligibility_Check)+'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].oob) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Bid_Eval)+'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Post_Qual)+'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Notice_of_Award) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Contract_Signing)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Notice_To_Proceed)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Del_Completion)+'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Acceptance_date) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Source_of_Funds)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].ABC)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].ABC_MOOE) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].ABC_CO)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].ABC_Others) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Contract_Cost) +'</td> \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Contract_Cost_MOOE) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Contract_Cost_CO) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Contract_Cost_Others)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Invited_Observers) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Pre_Proc_conf)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Pre_Bid_conf) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Eligibility_check)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_OOP) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Bid_Eval) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Post_Qual) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Notice_of_Award)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Contract_Signing) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Delivery_Accept) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Remarks)  +'</td>\
                                  </tr>';
                              
                  }
                                  if(record_len2 == 0  && record_len ==0)
                                    html=' <tr class = "row-hover procurement_data" data-id = "none"><td class = "cells data_cell" colspan="37" style ="text-align: left;"><b>No Results Found</b></td><tr>'


                                     html = html+` <tr class = "row-hover procurement_data" data-id = "none">\
                                      <td class = "cells small_width"></td>\
                                      <td class = "cells small_width"></td>\
                                      <td class = "cells small_width"></td> \
                                      <td class = "cells program_name no-pads"></td>  \
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>  \
                                      <td class = "cells data_cell"></td>  \
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td> \ 
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td> \ 
                                      <td class = "cells data_cell"></td>  \
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"><b>SUB-TOTAL:</b></td>\
                                      <td class = "cells data_cell">`+nullvalidation(data3[0].total_ABC)+`</td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"><b>SUB-TOTAL:</b></td>\
                                      <td class = "cells data_cell">`+nullvalidation(data3[0].total_contract_cost)+`</td> \
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                  </tr>`;  
                             const request = new sql.Request(gpool)
                                .execute('get_procurement_type', (err, presult) => {

                                    const request1 = new sql.Request(gpool)
                                    .query('Select * from Mode_of_Proc', (err, modes) => {

                                        const fund_sql = new sql.Request(gpool)
                                            .query('Select * from Source_Of_Funds', (err, sourceOF) => {
                                                ptype = presult.recordset;
                                                modes = modes.recordset;
                                                source_of_fund = sourceOF.recordset;
                                               
                                                 callback({html:html,datefrom:datefrom,dateto:dateto,ptype:ptype,modes:modes,source_of_fund:source_of_fund});
                                            // res.render('add',{title:"Add Procurement Monitoring",data : result.recordset[0],mode : 2,ptype:ptype,modes:modes,source_of_fund:source_of_fund});
                                            })
                                    })
                            
                                })
                                 

                      })            
              })
            
          
			  })
           
}


procurement_details = function(id,callback){

    sql.close();
    	 const request = new sql.Request(gpool)
			.input('id', sql.Int, id)
            .execute('get_procurement_by_id', (err, result) => {
                               callback(result.recordset[0])
             })
                     
                 
               

}

          
filter_proc_data = function(filter_data,callback){
    
            var datefrom = new Date(filter_data.from)
            var dateto = new Date(filter_data.to)
            datefrom = moment(datefrom).format('LL')
            dateto = moment(dateto).format('LL')
            var search_str = filter_data.search_str;
            var html="";   
            sql.close();
            const request = new sql.Request(gpool)
            .input('ptype', sql.Int, 2)
            .input('search_str', sql.NVarChar, search_str)
            .input('from', sql.NVarChar, datefrom)
            .input('to', sql.NVarChar,  dateto)
            .execute('procurement_search', (err, result) => {
              // ...      
             record_len = result.recordset.length;
             data = result.recordset;

              html = html+` <tr class = "row-hover procurement_data" data-id = 'none' id="pbid">\
                                      <td class = "cellsh small_width"></td>\
                                      <td class = "cellsh small_width"></td>\
                                      <td class = "cellsh small_width"></td> \
                                      <td class = "cellsh program_name no-pads"><b>A. PUBLIC BIDDINGS</b></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td> \ 
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td> \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                  </tr>
                                  `;

                  for(i=0;i<record_len;i++){
                                html=html+' <tr class = "row-hover procurement_data" data-id = '+ nullvalidation(data[i].id) +' >\
                                    <td class = "cells small_width">'+ nullvalidation(data[i].code_PAP) +'</td>\
                                    <td class = "cells small_width">'+ nullvalidation(data[i].pr_no) +'</td>\
                                    <td class = "cells small_width">'+ nullvalidation(data[i].PO_JO) +'</td>\
                                    <td class = "cells program_name no-pads">'+ nullvalidation(data[i].program_proj_name)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].end_user)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Mode)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].pre_Proc) +'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ads_post_IAEB)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Pre_bid) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Eligibility_Check)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].oob) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Bid_Eval)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Post_Qual)+'</td>  \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Notice_of_Award) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Signing)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Notice_To_Proceed)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Del_Completion)+'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Acceptance_date) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Source_of_Funds)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC_MOOE) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC_CO)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].ABC_Others) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost) +'</td> \
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost_MOOE) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost_CO) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Contract_Cost_Others)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Invited_Observers) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Pre_Proc_conf)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Pre_Bid_conf) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Eligibility_check)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_OOP) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Bid_Eval) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Post_Qual) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Notice_of_Award)  +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Contract_Signing) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].DRP_Delivery_Accept) +'</td>\
                                    <td class = "cells data_cell">'+ nullvalidation(data[i].Remarks)  +'</td>\
                                </tr>';
                            
              }

                const request1 = new sql.Request(gpool)
                .input('ptype', sql.Int, 1)
                .input('from', sql.NVarChar, datefrom)
                .input('to', sql.NVarChar, dateto)
                .input('search_str', sql.NVarChar, search_str)
                .execute('procurement_search', (err, result2) => {

                  record_len2 = result2.recordset.length;
                  data2 = result2.recordset;
                   const request3 = new sql.Request(gpool)
                        .input('from', sql.NVarChar, datefrom)
                        .input('to', sql.NVarChar, dateto)
                        .input('search_str', sql.NVarChar, search_str)
                        .input('ptype', sql.Int, 1)
                        .execute('get_total_ABC_CC', (err, result3) => {

                          data3 = result3.recordset;
                        html = html+` <tr class = "row-hover procurement_data" data-id = 'none' id="altmode">\
                                      <td class = "cellsh small_width"></td>\
                                      <td class = "cellsh small_width"></td>\
                                      <td class = "cellsh small_width"></td> \
                                      <td class = "cellsh program_name no-pads"><b>B. ALTERNATIVE MODE OF PROCUREMENT</b></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td> \ 
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td> \ 
                                      <td class = "cellsh data_cell"></td>  \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td> \
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                  </tr>`;

                  for(i=0;i<record_len2;i++){
                    html=html+' <tr class = "row-hover procurement_data" data-id = '+ nullvalidation(data2[i].id) +'">\
                                      <td class = "cells small_width">'+ nullvalidation(data2[i].code_PAP) +'</td>\
                                      <td class = "cells small_width">'+ nullvalidation(data2[i].pr_no) +'</td>\
                                      <td class = "cells small_width">'+ nullvalidation(data2[i].PO_JO) +'</td>\
                                      <td class = "cells program_name no-pads">'+ nullvalidation(data2[i].program_proj_name)+'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].end_user)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Mode)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].pre_Proc) +'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].ads_post_IAEB)+'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Pre_bid) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Eligibility_Check)+'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].oob) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Bid_Eval)+'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Post_Qual)+'</td>  \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Notice_of_Award) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Contract_Signing)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Notice_To_Proceed)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Del_Completion)+'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Acceptance_date) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Source_of_Funds)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].ABC)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].ABC_MOOE) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].ABC_CO)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].ABC_Others) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Contract_Cost) +'</td> \
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Contract_Cost_MOOE) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Contract_Cost_CO) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Contract_Cost_Others)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Invited_Observers) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Pre_Proc_conf)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Pre_Bid_conf) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Eligibility_check)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_OOP) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Bid_Eval) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Post_Qual) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Notice_of_Award)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Contract_Signing) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].DRP_Delivery_Accept) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Remarks)  +'</td>\
                                  </tr>';
                              
                  }
                                  if(record_len2 == 0  && record_len ==0){
                                    html=' <tr class = "row-hover procurement_data" data-id = "none"><td class = "cells data_cell" colspan="38" style ="text-align: left;"><b>No Results Found</b></td><tr>'
                                   }      

                                     html = html+` <tr class = "row-hover procurement_data" data-id = "none">\
                                      <td class = "cells small_width"></td>\
                                      <td class = "cells small_width"></td>\
                                      <td class = "cells small_width"></td> \
                                      <td class = "cells program_name no-pads"></td>  \
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>  \
                                      <td class = "cells data_cell"></td>  \
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td> \ 
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td> \ 
                                      <td class = "cells data_cell"></td>  \
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"><b>SUB-TOTAL:</b></td>\
                                      <td class = "cells data_cell">`+nullvalidation(data3[0].total_ABC)+`</td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"><b>SUB-TOTAL:</b></td>\
                                      <td class = "cells data_cell">`+nullvalidation(data3[0].total_contract_cost)+`</td> \
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                      <td class = "cellsh data_cell"></td>\
                                  </tr>`;  
                                 

                            const request = new sql.Request(gpool)
                                .execute('get_procurement_type', (err, presult) => {

                                    const request1 = new sql.Request(gpool)
                                    .query('Select * from Mode_of_Proc', (err, modes) => {

                                        const fund_sql = new sql.Request(gpool)
                                            .query('Select * from Source_Of_Funds', (err, sourceOF) => {
                                                ptype = presult.recordset;
                                                modes = modes.recordset;
                                                source_of_fund = sourceOF.recordset;
                                                callback({html:html});
                                            // res.render('add',{title:"Add Procurement Monitoring",data : result.recordset[0],mode : 2,ptype:ptype,modes:modes,source_of_fund:source_of_fund});
                                            })
                                    })
                            
                            })
                                  

                      })            
              })
            
          
			  })
           
}

excel_data = function(inputd,callback){
            var html="";   
            sql.close();
            const request = new sql.Request(gpool)
            .input('ptype', sql.Int, 2)
            .input('search_str', sql.NVarChar, inputd.search_str)
            .input('from', sql.NVarChar, inputd.from)
            .input('to', sql.NVarChar,  inputd.to)
            .execute('procurement_search', (err, result) => {
              // ...              
             
                         const request2 = new sql.Request(gpool)
                        .input('ptype', sql.Int, 1)
                        .input('search_str', sql.NVarChar, inputd.search_str)
                        .input('from', sql.NVarChar, inputd.from)
                        .input('to', sql.NVarChar,  inputd.to)
                        .execute('procurement_search', (err2, result2) => {
                        // ...             
                      
                            
                                if(!result2 && result) alldata = result.recordset;
                                else if(!result && result2) alldata = result2.recordset;
                                else if(!result && !result2) alldata = []

                                else if(result && result2)      
                                alldata = result.recordset.concat(result2.recordset);

                                     console.log(result2.recordset)
                                callback(alldata)
                        
                        
                        
                            })

             
             
            })
           
}





          exports.proc_data = proc_data;
           exports.filter_proc_data = filter_proc_data;
           exports.procurement_details = procurement_details;
           exports.excel_data = excel_data;