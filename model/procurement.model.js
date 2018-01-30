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
                    
                    html=html+' <tr class = "row-hover procurement_data '+(data2[i].cat_id ? "tete" : 'nocat')+'" data-id = '+ nullvalidation(data2[i].id) +'>\
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
                                               const cat_sql = new sql.Request(gpool)
                                                    .query('Select * from category_tbl order by category_description ASC', (err, cat) => { 
                                              
                                              
                                                            ptype = presult.recordset;
                                                            modes = modes.recordset;
                                                            source_of_fund = sourceOF.recordset;
                                                            category = cat.recordset
                                                            
                                                            callback({html:html,datefrom:datefrom,dateto:dateto,ptype:ptype,modes:modes,source_of_fund:source_of_fund,category:category});
                                            // res.render('add',{title:"Add Procurement Monitoring",data : result.recordset[0],mode : 2,ptype:ptype,modes:modes,source_of_fund:source_of_fund});
                                                    })    
                                        
                                        
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
                        .input('ptype', sql.Int, 2)
                        .execute('get_total_ABC_CC', (err, result4) => {

                        data4 = result4.recordset;
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
                        html = html+` <tr class = "row-hover procurement_data" id="total_pbid" data-id = "none">\
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
                                      <td class = "cells data_cell" id="PB_ABC_TOTAL">`+nullvalidation(data4[0].total_ABC)+`</td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"><b>SUB-TOTAL:</b></td>\
                                      <td class = "cells data_cell" id="PB_C_COST_TOTAL">`+nullvalidation(data4[0].total_contract_cost)+`</td> \
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
                                 
                const request2 = new sql.Request(gpool)
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
                    html=html+' <tr class = "row-hover procurement_data'+ (data2[i].cat_id ? '' : ' no_cat') +'" data-id = '+ nullvalidation(data2[i].id) +'>\
                                      <td class = "cells small_width">'+ nullvalidation(data2[i].code_PAP) +'</td>\
                                      <td class = "cells small_width">'+ nullvalidation(data2[i].pr_no) +'</td>\
                                      <td class = "cells small_width">'+ nullvalidation(data2[i].PO_JO) +'</td>\
                                      <td class = "cells program_name no-pads">'+ nullvalidation(data2[i].program_proj_name)+'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].end_user)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Mode)  +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].pre_Proc) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].ads_post_IAEB)+'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Pre_bid) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Eligibility_Check)+'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].oob) +'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Bid_Eval)+'</td>\
                                      <td class = "cells data_cell">'+ nullvalidation(data2[i].Post_Qual)+'</td>\
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

                                     html = html+` <tr class = "row-hover procurement_data" id="total_altmode" data-id = "none">\
                                      <td class = "cells small_width"></td>\
                                      <td class = "cells small_width"></td>\
                                      <td class = "cells small_width"></td> \
                                      <td class = "cells program_name no-pads"></td>  \
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td> \ 
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\ 
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"><b>SUB-TOTAL:</b></td>\
                                      <td class = "cells data_cell" id="ALT_ABC_TOTAL">`+nullvalidation(data3[0].total_ABC)+`</td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"></td>\
                                      <td class = "cells data_cell"><b>SUB-TOTAL:</b></td>\
                                      <td class = "cells data_cell" id="ALT_C_COST_TOTAL">`+nullvalidation(data3[0].total_contract_cost)+`</td> \
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
                    .execute('generate_report', (err2, result2) => {
                    // ...             
                    
                        
                            if(!result2 && result) alldata = result.recordset;
                            else if(!result && result2) alldata = result2.recordset;
                            else if(!result && !result2) alldata = []

                            else if(result && result2)      
                            alldata = result.recordset.concat(result2.recordset);
                            callback(alldata)
                    
                    
                    
                    })

            
            
        })
           
}
save_update_data = function(input_data,callback){
     var html = ''
            var d = new Date();
            var date_save = input_data.save_date;
            var working_days =(Date_caclulate(input_data.PR_Date,input_data.Acceptance_date)!=-1 ? Date_caclulate(input_data.PR_Date,input_data.Acceptance_date):undefined)
            sql.close();
		    const request = new sql.Request(gpool)
			.input('code_PAP', sql.NVarChar, input_data.code_PAP)
            .input('pr_no', sql.NVarChar, input_data.pr_no)
            .input('PR_Date', sql.NVarChar, input_data.PR_Date)
            .input('PO_JO', sql.NVarChar, input_data.PO_JO)
            .input('PO_JO_Date', sql.NVarChar,  convertDate(input_data.PO_JO_Date))
            .input('cat', sql.NVarChar, input_data.cat)
            .input('program_proj_name', sql.NVarChar, input_data.program_proj_name)
            .input('end_user', sql.NVarChar, input_data.end_user)
            .input('MOP', sql.NVarChar, parseInt(input_data.mode))
            .input('pre_Proc', sql.NVarChar,  convertDate(input_data.pre_Proc))
            .input('ads_post_IAEB', sql.NVarChar,  convertDate(input_data.ads_post_IAEB))
            .input('Pre_bid', sql.NVarChar,  convertDate(input_data.Pre_bid))
            .input('Eligibility_Check', sql.NVarChar,  convertDate(input_data.Eligibility_Check))
            .input('oob', sql.NVarChar,  convertDate(input_data.oob))
            .input('Bid_Eval', sql.NVarChar,  convertDate(input_data.Bid_Eval))
            .input('Post_Qual', sql.NVarChar,  convertDate(input_data.Post_Qual))
            .input('Notice_of_Award', sql.NVarChar,  convertDate(input_data.Notice_of_Award))
            .input('Contract_Signing', sql.NVarChar,  convertDate(input_data.Contract_Signing))
            .input('Notice_To_Proceed', sql.NVarChar,  convertDate(input_data.Notice_To_Proceed))
            .input('Del_Completion', sql.NVarChar,  convertDate(input_data.Del_Completion))
            .input('Acceptance_date', sql.NVarChar,  convertDate(input_data.Acceptance_date))
            .input('Source_of_Funds', sql.NVarChar, input_data.fund)
            .input('ABC', sql.Float,parseFloat(input_data.ABC))
            .input('ABC_MOOE', sql.Float, parseFloat(input_data.ABC_MOOE))
            .input('ABC_CO', sql.Float, parseFloat(input_data.ABC_CO))
            .input('ABC_Others', sql.Float, parseFloat(input_data.ABC_Others))
            .input('Contract_Cost', sql.Float, parseFloat(input_data.Contract_Cost))
            .input('Contract_Cost_MOOE', sql.Float, parseFloat(input_data.Contract_Cost_MOOE))
            .input('Contract_Cost_CO', sql.Float, parseFloat(input_data.Contract_Cost_CO))
            .input('Contract_Cost_Others', sql.Float, parseFloat(input_data.Contract_Cost_Others))
            .input('Invited_Observers', sql.NVarChar, input_data.Invited_Observers)
            .input('DRP_Pre_Proc_conf', sql.NVarChar,  convertDate(input_data.DRP_Pre_Proc_conf))
            .input('DRP_Pre_Bid_conf', sql.NVarChar,  convertDate(input_data.DRP_Pre_Bid_conf))
            .input('DRP_Eligibility_check', sql.NVarChar,  convertDate(input_data.DRP_Eligibility_check))
            .input('DRP_OOP', sql.NVarChar,  convertDate(input_data.DRP_OOP))
            .input('DRP_Bid_Eval', sql.NVarChar,  convertDate(input_data.DRP_Bid_Eval))
            .input('DRP_Post_Qual', sql.NVarChar,  convertDate(input_data.DRP_Post_Qual))
            .input('DRP_Notice_of_Award', sql.NVarChar,  convertDate(input_data.DRP_Notice_of_Award))
            .input('DRP_Contract_Signing', sql.NVarChar,  convertDate(input_data.DRP_Contract_Signing))
            .input('DRP_Delivery_Accept', sql.NVarChar,  convertDate(input_data.DRP_Delivery_Accept))
            .input('Remarks', sql.NVarChar, input_data.Remarks)
            .input('date_today', sql.NVarChar, date_save)
            .input('ptype', sql.Int, input_data.ptype)
            .input('id', sql.Int, input_data.id)
            .input('supplier', sql.NVarChar, input_data.Supplier)
            .input('working_days', sql.Int, working_days)
            .execute('save_update_procurement', (err, result) => {
                    // ...
                inserted_id = result.recordset[0].id;
                inserted_data =  result.recordset[0];
                if(!err){
                  
                    getdropdownvalues(input_data.fund,input_data.mode,function(ret_data){
                        html=' <tr class = "row-hover procurement_data cell_hover" data-id = '+ nullvalidation(inserted_id) +'>\
                                        <td class = "cells small_width">'+ nullvalidation(input_data.code_PAP) +'</td>\
                                        <td class = "cells small_width">'+ nullvalidation(input_data.pr_no) +'</td>\
                                        <td class = "cells small_width">'+ nullvalidation(input_data.PO_JO) +'</td>\
                                        <td class = "cells program_name no-pads">'+ nullvalidation(input_data.program_proj_name)+'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(input_data.end_user)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(ret_data.mode)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.pre_Proc) +'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.ads_post_IAEB)+'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Pre_bid) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Eligibility_Check)+'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.oob) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Bid_Eval)+'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Post_Qual)+'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Notice_of_Award) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Contract_Signing)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Notice_To_Proceed)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Del_Completion)+'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Acceptance_date) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(ret_data.fund)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.ABC)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.ABC_MOOE) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.ABC_CO)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.ABC_Others) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Contract_Cost) +'</td> \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Contract_Cost_MOOE) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Contract_Cost_CO) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Contract_Cost_Others)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Invited_Observers) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Pre_Proc_conf)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Pre_Bid_conf) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Eligibility_check)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_OOP) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Bid_Eval) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Post_Qual) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Notice_of_Award)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Contract_Signing) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Delivery_Accept) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(input_data.Remarks)  +'</td>\
                                    </tr>';
                
                        callback(html)
                      
                    })
                }
               else{
                    callback(err); 
                }
          
			})
}
delete_procurement = function(input_data,callback){
        input_data.id = parseInt(input_data.id)
        console.log(input_data)
      const request = new sql.Request(gpool)
        .input('id', sql.Int, input_data.id)
            .execute('Delete_Procurement', (err, result) => {
                console.log(err)
                 callback(err); 
                
            })
}
save_data = function(input_data,callback){
            var html = ''
            var d = new Date();
            var date_save = input_data.save_date;
            input_data.PR_Date = (input_data.PR_Date=="" ? input_data.save_date : input_data.PR_Date);
            sql.close();
          
		    const request = new sql.Request(gpool)
			.input('code_PAP', sql.NVarChar, input_data.code_PAP)
            .input('pr_no', sql.NVarChar, input_data.pr_no)
            .input('PR_Date', sql.NVarChar, input_data.PR_Date)
            .input('PO_JO', sql.NVarChar, input_data.PO_JO)
            .input('PO_JO_Date', sql.NVarChar, input_data.PO_JO_Date)
            .input('program_proj_name', sql.NVarChar, input_data.program_proj_name)
            .input('cat_id', sql.Int, input_data.cat)
            .input('end_user', sql.NVarChar, input_data.end_user)
            .input('MOP', sql.NVarChar, parseInt(input_data.mode))
            .input('pre_Proc', sql.NVarChar,  convertDate(input_data.pre_Proc))
            .input('ads_post_IAEB', sql.NVarChar,  convertDate(input_data.ads_post_IAEB))
            .input('Pre_bid', sql.NVarChar,  convertDate(input_data.Pre_bid))
            .input('Eligibility_Check', sql.NVarChar,  convertDate(input_data.Eligibility_Check))
            .input('oob', sql.NVarChar,  convertDate(input_data.oob))
            .input('Bid_Eval', sql.NVarChar,  convertDate(input_data.Bid_Eval))
            .input('Post_Qual', sql.NVarChar,  convertDate(input_data.Post_Qual))
            .input('Notice_of_Award', sql.NVarChar,  convertDate(input_data.Notice_of_Award))
            .input('Contract_Signing', sql.NVarChar,  convertDate(input_data.Contract_Signing))
            .input('Notice_To_Proceed', sql.NVarChar,  convertDate(input_data.Notice_To_Proceed))
            .input('Del_Completion', sql.NVarChar,  convertDate(input_data.Del_Completion))
            .input('Acceptance_date', sql.NVarChar,  convertDate(input_data.Acceptance_date))
            .input('Source_of_Funds', sql.NVarChar, input_data.fund)
            .input('ABC', sql.Float,parseFloat(input_data.ABC))
            .input('ABC_MOOE', sql.Float, parseFloat(input_data.ABC_MOOE))
            .input('ABC_CO', sql.Float, parseFloat(input_data.ABC_CO))
            .input('ABC_Others', sql.Float, parseFloat(input_data.ABC_Others))
            .input('Contract_Cost', sql.Float, parseFloat(input_data.Contract_Cost))
            .input('Contract_Cost_MOOE', sql.Float, parseFloat(input_data.Contract_Cost_MOOE))
            .input('Contract_Cost_CO', sql.Float, parseFloat(input_data.Contract_Cost_CO))
            .input('Contract_Cost_Others', sql.Float, parseFloat(input_data.Contract_Cost_Others))
            .input('Invited_Observers', sql.NVarChar, input_data.Invited_Observers)
            .input('DRP_Pre_Proc_conf', sql.NVarChar,  convertDate(input_data.DRP_Pre_Proc_conf))
            .input('DRP_Pre_Bid_conf', sql.NVarChar,  convertDate(input_data.DRP_Pre_Bid_conf))
            .input('DRP_Eligibility_check', sql.NVarChar,  convertDate(input_data.DRP_Eligibility_check))
            .input('DRP_OOP', sql.NVarChar,  convertDate(input_data.DRP_OOP))
            .input('DRP_Bid_Eval', sql.NVarChar,  convertDate(input_data.DRP_Bid_Eval))
            .input('DRP_Post_Qual', sql.NVarChar,  convertDate(input_data.DRP_Post_Qual))
            .input('DRP_Notice_of_Award', sql.NVarChar,  convertDate(input_data.DRP_Notice_of_Award))
            .input('DRP_Contract_Signing', sql.NVarChar,  convertDate(input_data.DRP_Contract_Signing))
            .input('DRP_Delivery_Accept', sql.NVarChar,  convertDate(input_data.DRP_Delivery_Accept))
            .input('Remarks', sql.NVarChar, input_data.Remarks)
            .input('date_today', sql.NVarChar, date_save)
            .input('ptype', sql.Int, input_data.ptype)
            .input('supplier', sql.NVarChar, input_data.Supplier)
            .execute('insert_procurement', (err, result) => {
                    // ...
                inserted_id = result.recordset[0].id;
                inserted_data =  result.recordset[0];
                if(!err){
                  
                    getdropdownvalues(input_data.fund,input_data.mode,function(ret_data){
                        html=' <tr class = "row-hover procurement_data" data-id = '+ nullvalidation(inserted_id) +'>\
                                        <td class = "cells small_width">'+ nullvalidation(input_data.code_PAP) +'</td>\
                                        <td class = "cells small_width">'+ nullvalidation(input_data.pr_no) +'</td>\
                                        <td class = "cells small_width">'+ nullvalidation(input_data.PO_JO) +'</td>\
                                        <td class = "cells program_name no-pads">'+ nullvalidation(input_data.program_proj_name)+'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(input_data.end_user)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(ret_data.mode)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.pre_Proc) +'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.ads_post_IAEB)+'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Pre_bid) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Eligibility_Check)+'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.oob) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Bid_Eval)+'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Post_Qual)+'</td>  \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Notice_of_Award) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Contract_Signing)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Notice_To_Proceed)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Del_Completion)+'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Acceptance_date) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(ret_data.fund)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.ABC)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.ABC_MOOE) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.ABC_CO)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.ABC_Others) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Contract_Cost) +'</td> \
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Contract_Cost_MOOE) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Contract_Cost_CO) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Contract_Cost_Others)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.Invited_Observers) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Pre_Proc_conf)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Pre_Bid_conf) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Eligibility_check)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_OOP) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Bid_Eval) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Post_Qual) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Notice_of_Award)  +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Contract_Signing) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(inserted_data.DRP_Delivery_Accept) +'</td>\
                                        <td class = "cells data_cell">'+ nullvalidation(input_data.Remarks)  +'</td>\
                                    </tr>';
                
                        callback(html)
                      
                    })
                }
               else{
                    callback(err); 
                }
          
			})
}

mode_of_proc_graph = function(input_data,callback){
    
    var dates = getDate();
    var datefrom = new Date(dates[0])
    var dateto = new Date(dates[1])
    from = moment(datefrom).format('LL')
    to = moment(dateto).format('LL')
  
        sql.close();
    	 const request = new sql.Request(gpool)
            .input('from', sql.NVarChar, from)
            .input('to', sql.NVarChar, to)
            .execute('get_Mode_Filter', (err, result) => {
                var data =  {
                                type: 'pie',
                                data: {
                                    datasets: [{
                                        data: initialize_graphdata(result.recordset),
                                    backgroundColor: initialize_graphdatacolor(result.recordset),
                                        label: 'Dataset 1'
                                    }],
                                    labels: initialize_graphdatalabel(result.recordset),
                                },
                                options: {
                                    responsive: true
                                }
                            };
                               callback(data)

             })
                     
                 

}


get_Supplier_filter_graph = function(input_data,callback){
    var dates = getDate();
    var datefrom = new Date(dates[0])
    var dateto = new Date(dates[1])
    from = moment(datefrom).format('LL')
    to = moment(dateto).format('LL')
        sql.close();
    	 const request = new sql.Request(gpool)
            .input('from', sql.NVarChar, from)
            .input('to', sql.NVarChar, to)
            .execute('get_Supplier_filter', (err, result) => {
                 var barChartData = {
                                        labels:  initialize_graphdatalabel(result.recordset),
                                        datasets: [{
                                            data: initialize_graphdata(result.recordset)
                                        }],
                                        tbl_html:setsupplier_tbl_html(result.recordset)
                                    };


                               callback(barChartData)

             })
                     
                 

}

function setsupplier_tbl_html(data){
var html='';
  for(i=0;i<data.length;i++){
      html = html+'<tr>'
      html = html+'<td>'+data[i].Label+'</td>'
      html = html+'<td>'+data[i].Count+'</td>'
      html = html+'</tr>'  
    }
    return html;
}
function initialize_graphdata(data){
    var Newdata=[];
    for(i=0;i<data.length;i++){
        Newdata[i]=data[i].Count

    }

    return Newdata;
}

function initialize_graphdatacolor(data){
    var Newdata=[];
    for(i=0;i<data.length;i++){
        Newdata[i] = getRandomColor()

    }

    return Newdata;
}
function initialize_graphdatalabel(data){
    var Newdata=[];
    for(i=0;i<data.length;i++){
        Newdata[i]=data[i].Label

    }

    return Newdata;
}
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



function setRandomColor() {
  $("#colorpad").css("background-color", getRandomColor());
}


checkIfisNaN = function(value){
    if(isNaN(parseFloat(value))==true){
        return '';
    }
    else
        return value;
}

getdropdownvalues = function(id1,id2,callback){
        id1 = checkIfisNaN(parseInt(id1))
        id2 = checkIfisNaN(parseInt(id2)) 
        const request = new sql.Request(gpool)
            .input('fund_ID', sql.Int, id1)
            .input('mode_id', sql.Int, id2)
            .execute('getDropdown', (err, result) => {
                    if(result)
                        callback(result.recordset[0])
                    else{
                        callback({Fund_Name:null,mode:null})
                        console.log("dito")
                    }
            })
}

get_total = function(datefrom,dateto,search_str,ptype,callback){         
    const request = new sql.Request(gpool)
        .input('from', sql.NVarChar, datefrom)
        .input('to', sql.NVarChar, dateto)
        .input('search_str', sql.NVarChar, search_str)
        .input('ptype', sql.Int, ptype)
        .execute('get_total_ABC_CC', (err, result) => {
            if(result)
                callback(result)

        })
}


Date_caclulate = function(from,to){
var holidays = 
[
	'01/01/2017','01/02/2017','01/28/2017'
	,'02/25/2017','03/20/2017','04/09/2017'
	,'04/13/2017','04/14/2017','04/16/2017'
	,'04/24/2017','05/01/2017','06/12/2017'
	,'06/21/2017','06/27/2017','08/21/2017'
	,'08/28/2017','09/02/2017','09/03/2017'
	,'09/22/2017','10/31/2017','11/01/2017'
	,'11/13/2017','11/14/2017','11/15/2017'
	,'11/30/2017','12/01/2017'
	,'12/08/2017','12/21/2017','12/24/2017'
	,'12/25/2017','12/30/2017','12/31/2017'

];
holidays = convert_to_date(holidays);

		
	var start = new Date(from),
		finish = new Date(to),
		dayMilliseconds = 1000 * 60 * 60 * 24;
	var sday = start
	var weekDays = 0;

	while (start <= finish) {
		var day = start.getDay()
		
		
		if ((day == 1 || day == 2 || day == 3  || day == 4  || day == 5) && (holidays.indexOf(start.getTime()) == -1)) {
			weekDays++;
		}
		start = new Date(+start + dayMilliseconds);
		
	}

	weekDays = ((holidays.indexOf(finish.getTime()) == -1 && sday.getDay() != 0 && sday.getDay() != 6 ) ? weekDays -1 : weekDays)
	return weekDays
}
convert_to_date = function(dates){
	for(var i=0;i<dates.length;i++){
		dates[i] =  new Date(dates[i]).getTime();
	}
	return dates;

}
          exports.proc_data = proc_data;
          exports.filter_proc_data = filter_proc_data;
          exports.procurement_details = procurement_details;
          exports.excel_data = excel_data;
          exports.save_data  = save_data;
          exports.get_total = get_total;
          exports.save_update_data = save_update_data;
          exports.delete_procurement = delete_procurement;
          exports.mode_of_proc_graph = mode_of_proc_graph;
          exports.get_Supplier_filter_graph = get_Supplier_filter_graph;