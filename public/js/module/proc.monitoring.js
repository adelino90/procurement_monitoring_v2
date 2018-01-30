proc.monitoring = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
	

    change_option_anchor:null,
    proc_model : null,	
    keys : null,
    settable_map : {change_option_anchor:true, proc_model : true , keys:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined ,procurement_model : undefined},
jqueryMap = {},
copyAnchorMap,setJqueryMap,configModule,onClickChat,setcontent,helper, getDate,setEvents,check_date_range,
data_filter,set_modal_values,clear_vals,Date_caclulate,convert_to_date,getVals,proc_del,confirm_delete,validate,clear_events,
refresh_total, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
    var $container = stateMap.$container,   $modal  = $container.find("#myModal"), $date_modal=$container.find("#date_modal");

	jqueryMap = {
            $content : $container,
            $modal   : $modal,
            $for_bidding : $modal.find("#for_bidding"),
            $record_table : $container.find("#record_table"),
            $modal_close  : $container.find('.close'),
            $procurement_close : $modal.find("#procurement_cancel"),
            $procurement_save : $modal.find("#procurement_save"),
            $procurement_delete : $modal.find("#procurement_delete"),
            $date_modal : $date_modal,
            $from : $container.find("#from"),
            $to : $container.find("#to"),
            $procurement_add : $container.find("#procurement_add"),
            $date_save : $container.find("#date_save"),
            $date_input : $container.find("#input_date"),
            $search :   $container.find("#search"),
            $generate : $container.find("#generate"),
            $code_PAP : $modal.find('#code_PAP'),
            $pr_no : $modal.find('#pr_no'),
            $PR_Date : $modal.find('#PR_Date'),
            $PO_JO  :$modal.find('#PO_JO'),
            $PO_JO_Date  :$modal.find('#PO_JO_Date'),
            $PR_to_PO :  $modal.find('#PR_to_PO'),
            $category  :$modal.find('#cat'),
			$program_proj_name  :$modal.find('#program_proj_name'),
			$end_user  : $modal.find('#end_user'),
			$MOP  : $modal.find('#mode'),
			$pre_Proc  : $modal.find('#pre_Proc'),
			$ads_post_IAEB  : $modal.find('#ads_post_IAEB'),
			$Pre_bid : $modal.find('#Pre_bid'),
			$Eligibility_Check  : $modal.find('#Eligibility_Check'),
			$oob  : $modal.find('#oob'),
			$Bid_Eval  : $modal.find('#Bid_Eval'),
			$Post_Qual  : $modal.find('#Post_Qual'),
			$Notice_of_Award  : $modal.find('#Notice_of_Award'),
			$Contract_Signing  : $modal.find('#Contract_Signing'),
			$Notice_To_Proceed  : $modal.find('#Notice_To_Proceed'),
			$Del_Completion :$modal.find('#Del_Completion'),
			$Acceptance_date  : $modal.find('#Acceptance_date'),
			$Source_of_Funds  :$modal.find('#fund'),
			$ABC  : $modal.find('#ABC'),
			$ABC_MOOE  : $modal.find('#ABC_MOOE'),
			$ABC_CO  : $modal.find('#ABC_CO'),
			$ABC_Others  : $modal.find('#ABC_Others'),
			$Contract_Cost  : $modal.find('#Contract_Cost'),
			$Contract_Cost_MOOE : $modal.find('#Contract_Cost_MOOE'),
			$Contract_Cost_CO : $modal.find('#Contract_Cost_CO'),
            $Contract_Cost_Others  : $modal.find('#Contract_Cost_Others'),
            $supplier : $modal.find('#Supplier'),
			$Invited_Observers  : $modal.find('#Invited_Observers'),
			$DRP_Pre_Proc_conf  : $modal.find('#DRP_Pre_Proc_conf'),
			$DRP_Pre_Bid_conf  :  $modal.find('#DRP_Pre_Bid_conf'),
			$DRP_Eligibility_check  : $modal.find('#DRP_Eligibility_check'),
			$DRP_OOP : $modal.find('#DRP_OOP'),
			$DRP_Bid_Eval : $modal.find('#DRP_Bid_Eval'),
			$DRP_Post_Qual : $modal.find('#DRP_Post_Qual'),
			$DRP_Notice_of_Award  : $modal.find('#DRP_Notice_of_Award'),
			$DRP_Contract_Signing  : $modal.find('#DRP_Contract_Signing'),
			$DRP_Delivery_Accept : $modal.find('#DRP_Delivery_Accept'),
			$Remarks  :$modal.find('#Remarks'),
            $ptype : $modal.find('#ptype'),
            $PB_ABC_TOTAL : $container.find("#PB_ABC_TOTAL"),
            $PB_C_COST_TOTAL : $container.find("#PB_C_COST_TOTAL"),
            $ALT_ABC_TOTAL : $container.find("#ALT_ABC_TOTAL"),
            $ALT_C_COST_TOTAL : $container.find("#ALT_C_COST_TOTAL")
            
		}
};

validate = function(data){
    var datacheck = data.idata
    var check_obj = {message:"",flag:true};

    if(!datacheck.ptype){
        check_obj.flag = false;
        check_obj.message = check_obj.message+"Please Select A Procurement Type";
    }
        if(datacheck.ptype=="1"){
            if(datacheck.PR_Date==""){
                check_obj.flag = false;
                check_obj.message = check_obj.message+"\nPlease Set The PR Date";
            }
            if(datacheck.pr_no==""){
                check_obj.flag = false; 
                check_obj.message = check_obj.message+"\nPlease Set The PR Number";
            }
            if(!datacheck.cat){
                check_obj.flag = false; 
                check_obj.message = check_obj.message+"\nPlease Set The Procurement Category";
            }
        }
        
        else if(datacheck.ptype=="2"){
                if(datacheck.program_proj_name==""){
                    check_obj.flag = false;
                    check_obj.message = check_obj.message+"\nPlease Set The Program Name";
            }
        }
    return check_obj
}
refresh_total = function(ptype){
     var from_date =  jqueryMap.$from.text();
     from_date = moment(from_date ).format('L');
     var to_date =  jqueryMap.$to.text();
     to_date = moment(to_date).format('L');
     var search_str = jqueryMap.$search.val();
     var ref_data = {from:from_date,to:to_date,ptype:parseInt(ptype),search:search_str};
        configMap.proc_model.refresh_total(ref_data,function(data_ret){
    
            if(ptype==1){
                jqueryMap.$ALT_ABC_TOTAL.text(data_ret.total_ABC)
                jqueryMap.$ALT_C_COST_TOTAL.text(data_ret.total_contract_cost)
            }
            else{
                jqueryMap.$PB_ABC_TOTAL.text(data_ret.total_ABC)
                jqueryMap.$PB_C_COST_TOTAL.text(data_ret.total_contract_cost)
            }
        })
}

confirm_delete = function() {
    var inputdata,id = jqueryMap.$procurement_delete.attr("save_id"), procurement_type = jqueryMap.$procurement_save.attr("procurement_type");
    var row_id = jqueryMap.$procurement_save.attr('save_id');
    inputdata = {id:id,ptype:procurement_type};
    configMap.proc_model.delete_proc(inputdata,function(data){
               $(".overlay").hide();
               refresh_total(inputdata.ptype);    
               clear_vals() 
               jqueryMap.$procurement_save.off();
               jqueryMap.$procurement_delete.off();
               $('#myModal').css("display","none");
               $('tr[data-id="'+row_id+'"]').remove()
               setEvents()

            })  
}
proc_del = function(){
var C = confirm("Are you sure you wan't to delete this?");
    if (C == true) {
       confirm_delete()
    } else {
        
    }
    
}
check_date_range = function(date_to_check,from,to){
   var date_to_check = new Date(date_to_check);
   var from = new Date(from);
   var to = new Date(to);
   var flag = true;
   if(date_to_check < from || date_to_check > to)
        flag = false
   return flag
} 


getVals = function(){
    $(".overlay").show();
    var idata = {};
    var from =jqueryMap.$from.text(),to = jqueryMap.$to.text();;
    var inputdata, save_date,save_type = jqueryMap.$procurement_save.attr("save_type"), procurement_type = jqueryMap.$procurement_save.attr("procurement_type");
    for(var i=0;i < configMap.keys.length;i++){
        idata[configMap.keys[i]] = $('#'+configMap.keys[i]).val()
    }
    var date_in_range = check_date_range(idata.PR_Date,moment(from).format('L'),moment(to).format('L'))
    save_date =  jqueryMap.$from.text();
    idata.mode = (idata.mode==null ? 0 : idata.mode)
    idata.fund = (idata.fund==null ? 0 : idata.fund)
    idata.cat = (idata.cat==null ? 0 : idata.cat)
    save_date =  jqueryMap.$from.text();
    save_date = moment(save_date).format('L');
    idata.save_date = save_date
    inputdata = {idata:idata};
    var valid = validate(inputdata);
    if(valid.flag){
        if(save_type==1){
            configMap.proc_model.save(inputdata,function(data){
                if(idata.ptype == 2){
                    if(date_in_range)
                        $( data ).insertBefore( "#total_pbid" );
                }
                else{
                    if(date_in_range)
                        $( data ).insertBefore( "#total_altmode" );
                
                }

               $(".overlay").hide();
               refresh_total(idata.ptype);    
               clear_vals() 
                
               jqueryMap.$procurement_save.off();
               
               $('#myModal').css("display","none");
               setEvents()

            })
        }
        else{
            var row_id = jqueryMap.$procurement_save.attr('save_id');
            inputdata.idata.id = row_id
            configMap.proc_model.save_update(inputdata,function(data){
                clear_vals()
                alert("UPDATED")
                $(".overlay").hide();
                $('.cell_hover').replaceWith(data)
                $('#myModal').css("display","none");
                if(procurement_type==idata.ptype)                       // If Procurement type is not changed
                    $('tr[data-id="'+row_id+'"]').replaceWith(data)
                else{                                                   // If Procurement type is changed

                    $('tr[data-id="'+row_id+'"]').remove()
                    if(idata.ptype == 2){

                        $( data ).insertBefore( "#total_pbid" );
                        refresh_total(2);  
                        refresh_total(1);  
                    }

                    else{
                        $( data ).insertBefore( "#total_altmode" );
                        refresh_total(2);  
                        refresh_total(1); 
                    
                    }
                
                }
                $('tr[data-id="'+row_id+'"]').click(function(){
                    var proc_id;
                    proc_id =  $(this).attr('data-id');
                    proc_id = parseInt(proc_id);
                    if(proc_id!="none"){
                        $('#record_table > tbody >tr').removeClass('cell_hover');
                        var data_id = $(this).attr('data-id');
                        $(this).addClass("cell_hover")
                        $('#myModal').css("display","block");
                        set_modal_values(proc_id)  
                    }
                })
                refresh_total(idata.ptype);  
            });

        }   
        jqueryMap.$for_bidding.find('input').attr("disabled", false); 
    }
    else{
        alert(valid.message)
        $(".overlay").hide();
    }

}

data_filter = function(date_from,date_to,search_str){

    $(".overlay").show();
    var filter_data = {from:date_from,to:date_to,search_str:search_str}
    configMap.proc_model.get_filter_proc(filter_data,function(data){
        jqueryMap.$record_table.find('tbody').off().empty()
        jqueryMap.$record_table.find('tbody').html(data.html)
        setJqueryMap();
        setEvents(date_from,date_to,search_str);
        $(".overlay").hide();
      
    })
}
clear_vals = function(){
            $(".modal-content").scrollTop(0) 
            jqueryMap.$code_PAP.val("") 
            jqueryMap.$pr_no.val("")  
            jqueryMap.$PR_Date.val("") 
            jqueryMap.$PO_JO.val("")   
            jqueryMap.$PO_JO_Date.val("") 
            jqueryMap.$category.val(-1) 
			jqueryMap.$program_proj_name.val("")   
			jqueryMap.$end_user.val("")   
			jqueryMap.$MOP.val(-1)  
			jqueryMap.$pre_Proc .val("")  
			jqueryMap.$ads_post_IAEB .val("") 
			jqueryMap.$Pre_bid.val("")  
			jqueryMap.$Eligibility_Check .val("") 
			jqueryMap.$oob.val("") 
			jqueryMap.$Bid_Eval.val("") 
			jqueryMap.$Post_Qual.val("") 
			jqueryMap.$Notice_of_Award.val("") 
			jqueryMap.$Contract_Signing.val("") 
			jqueryMap.$Notice_To_Proceed.val("") 
			jqueryMap.$Del_Completion.val("") 
			jqueryMap.$Acceptance_date.val("") 
			jqueryMap.$Source_of_Funds.val(-1) 
			jqueryMap.$ABC.val("") 
			jqueryMap.$ABC_MOOE .val("") 
			jqueryMap.$ABC_CO  .val("") 
			jqueryMap.$ABC_Others .val("") 
			jqueryMap.$Contract_Cost .val("") 
			jqueryMap.$Contract_Cost_MOOE .val("") 
			jqueryMap.$Contract_Cost_CO .val("") 
			jqueryMap.$Contract_Cost_Others  .val("") 
			jqueryMap.$Invited_Observers .val("") 
			jqueryMap.$DRP_Pre_Proc_conf .val("") 
			jqueryMap.$DRP_Pre_Bid_conf .val("") 
			jqueryMap.$DRP_Eligibility_check  .val("") 
			jqueryMap.$DRP_OOP .val("") 
			jqueryMap.$DRP_Bid_Eval .val("") 
			jqueryMap.$DRP_Post_Qual.val("") 
			jqueryMap.$DRP_Notice_of_Award.val("") 
			jqueryMap.$DRP_Contract_Signing.val("") 
			jqueryMap.$DRP_Delivery_Accept.val("") 
			jqueryMap.$Remarks .val("") 
            jqueryMap.$ptype.val("1")
            jqueryMap.$supplier.val("")
            jqueryMap.$PR_to_PO.text("");
}
getDate = function(){
    var d = new Date();
    var n = d.getMonth();
    if(n<5){
        return ['01/01/'+d.getFullYear(),'06/30/'+d.getFullYear()]
    }
    else  return ['07/01/'+d.getFullYear(),'12/31/'+d.getFullYear()]
}

set_modal_values = function(id){
    
    configMap.proc_model.view_proc({id:id},function(data){

            jqueryMap.$code_PAP.val(data.code_PAP) 
            jqueryMap.$pr_no.val(data.pr_no)  
            jqueryMap.$PR_Date .val(data.PR_Date)  
            jqueryMap.$PO_JO.val(data.PO_JO)   
            jqueryMap.$PO_JO_Date.val(data.PO_JO_Date)   
            jqueryMap.$category.val(data.cat_id)
			jqueryMap.$program_proj_name.val(data.program_proj_name)   
			jqueryMap.$end_user.val(data.end_user)   
			jqueryMap.$MOP.val(data.MOP_id)  
			jqueryMap.$pre_Proc .val(data.pre_Proc)  
			jqueryMap.$ads_post_IAEB .val(data.ads_post_IAEB) 
			jqueryMap.$Pre_bid.val(data.Pre_bid)  
			jqueryMap.$Eligibility_Check .val(data.Eligibility_Check) 
			jqueryMap.$oob.val(data.oob) 
			jqueryMap.$Bid_Eval.val(data.Bid_Eval) 
			jqueryMap.$Post_Qual.val(data.Post_Qual) 
			jqueryMap.$Notice_of_Award.val(data.Notice_of_Award) 
			jqueryMap.$Contract_Signing .val(data.Contract_Signing) 
			jqueryMap.$Notice_To_Proceed .val(data.Notice_To_Proceed) 
			jqueryMap.$Del_Completion .val(data.Del_Completion) 
			jqueryMap.$Acceptance_date  .val(data.Acceptance_date) 
			jqueryMap.$Source_of_Funds .val(data.fund_ID) 
			jqueryMap.$ABC  .val(data.ABC) 
			jqueryMap.$ABC_MOOE .val(data.ABC_MOOE) 
			jqueryMap.$ABC_CO  .val(data.ABC_CO) 
			jqueryMap.$ABC_Others .val(data.ABC_Others) 
			jqueryMap.$Contract_Cost .val(data.Contract_Cost) 
			jqueryMap.$Contract_Cost_MOOE .val(data.Contract_Cost_MOOE) 
			jqueryMap.$Contract_Cost_CO .val(data.Contract_Cost_CO) 
			jqueryMap.$Contract_Cost_Others  .val(data.Contract_Cost_Others) 
			jqueryMap.$Invited_Observers .val(data.Invited_Observers) 
			jqueryMap.$DRP_Pre_Proc_conf .val(data.DRP_Pre_Proc_conf) 
			jqueryMap.$DRP_Pre_Bid_conf .val(data.DRP_Pre_Bid_conf) 
			jqueryMap.$DRP_Eligibility_check  .val(data.DRP_Eligibility_check) 
			jqueryMap.$DRP_OOP .val(data.DRP_OOP) 
			jqueryMap.$DRP_Bid_Eval .val(data.DRP_Bid_Eval) 
			jqueryMap.$DRP_Post_Qual.val(data.DRP_Post_Qual) 
			jqueryMap.$DRP_Notice_of_Award.val(data.DRP_Notice_of_Award) 
			jqueryMap.$DRP_Contract_Signing.val(data.DRP_Contract_Signing) 
			jqueryMap.$DRP_Delivery_Accept.val(data.DRP_Delivery_Accept) 
			jqueryMap.$Remarks .val(data.Remarks) 
			jqueryMap.$ptype .val(data.ptype_id) 
            jqueryMap.$procurement_save.attr("save_type", "2");
            jqueryMap.$procurement_save.attr("save_id", id);
            jqueryMap.$procurement_delete.attr("save_id", id);
            jqueryMap.$procurement_save.attr("procurement_type", data.ptype_id);
            jqueryMap.$supplier.val(data.winning_supplier)

            var pr_to_po = Date_caclulate(data.PR_Date,data.PO_JO_Date)
            var ptype = jqueryMap.$ptype.val();
            jqueryMap.$PR_to_PO.text(pr_to_po);
             
            if(ptype ==2)
                jqueryMap.$for_bidding.find('input').attr("disabled", false);
            else
                jqueryMap.$for_bidding.find('input').attr("disabled", true);

    })
}


clear_events = function(){


    //jqueryMap.$record_table.find("tr").off();
    jqueryMap.$modal_close.off();
    //jqueryMap.$procurement_close.off();
    jqueryMap.$procurement_save.off();
    jqueryMap.$from.off();
    jqueryMap.$generate.$search.off();
    jqueryMap.$to.off();
    jqueryMap.$procurement_add.off();
    jqueryMap.$date_save.off();
    jqueryMap.$search.off();
}   
setEvents = function(from,to,search_str){
    
    jqueryMap.$record_table.find("tr").click(function() {
    
        var proc_id;
        proc_id =  $(this).attr('data-id');
        proc_id = parseInt(proc_id);
      
        if(proc_id){
            $('#record_table > tbody >tr').removeClass('cell_hover');
            var data_id = $(this).attr('data-id');
            $(this).addClass("cell_hover")
            $('#myModal').css("display","block");
            set_modal_values(proc_id)  
        }

    });
    jqueryMap.$ptype.change(function(){
        var ptype = jqueryMap.$ptype.val();
        if(ptype ==2)
            jqueryMap.$for_bidding.find('input').attr("disabled", false);
        else{
             jqueryMap.$for_bidding.find('input').attr("disabled", true);
             jqueryMap.$for_bidding.find('input').val("")
            }
    })
    // When the user clicks on <span> (x), close the modal
    jqueryMap.$modal_close.click(function() {
        $(".modal-content").scrollTop(0) 
        $('#myModal').css("display","none");
        jqueryMap.$date_modal.css("display","none");
        
    })
    jqueryMap.$procurement_close.click(function(){
        $(".modal-content").scrollTop(0) 
         $('#myModal').css("display","none");
         jqueryMap.$date_modal.css("display","none");
         jqueryMap.$for_bidding.find('input').attr("disabled", false);
         
    })
    jqueryMap.$procurement_save.click(function(){
         getVals();
         
    })
    jqueryMap.$procurement_delete.click(function(){
         proc_del();
         
    })
    jqueryMap.$from.click(function(){
      jqueryMap.$date_modal.css("display","block");
      var date =  jqueryMap.$from.text();
      date = new Date(date)
      $("#input_date").val(moment(date).format('L'));
       $("#date_save").attr('data-id','from');

    })
    jqueryMap.$generate.click(function(){
        var from_d = jqueryMap.$from.text();
        var to_d = jqueryMap.$to.text();
          configMap.proc_model.generate({from:from,to:to,search_str:search_str},function(response){
               window.location.assign('/procurement_monitoring/'+from_d+'/'+to_d+'')
          })
    })
    jqueryMap.$to.click(function(){
        jqueryMap.$date_modal.css("display","block");
        var date =jqueryMap.$to.text();
        date = new Date(date)
        $("#input_date").val(moment(date).format('L'));
        $("#date_save").attr('data-id','to');
      

    })
    jqueryMap.$procurement_add.click(function() {
        jqueryMap.$for_bidding.find('input').attr("disabled", false);
        clear_vals();
        jqueryMap.$procurement_save.attr("save_type", "1");
        jqueryMap.$procurement_save.removeAttr("save_id");
        if(jqueryMap.$search.val()=='')
        $('#myModal').css("display","block");

    });
    jqueryMap.$date_save.click(function(){

        var date = jqueryMap.$date_input.val();
        var search_str = jqueryMap.$search.val();
        var filtertype = $(this).attr("data-id")
        var temp_date = new Date(date)
        temp_date = moment(temp_date).format('LL');   
        if(filtertype=="from" && temp_date != "Invalid date"){
          
          var to = new Date(jqueryMap.$to.text()); 
          //data_filter(moment(temp_date).format('L'),moment(to).format('L'),search_str)
          //
            configMap.change_option_anchor('monitoring',moment(temp_date).format('L'), moment(to).format('L'),search_str );
            jqueryMap.$from.text(temp_date);
        }
        else if(filtertype == "to" && temp_date != "Invalid date"){

           var from = new Date($("#from").text()); 
           //data_filter(moment(from).format('L'),moment(temp_date).format('L'),search_str)
           
           configMap.change_option_anchor('monitoring',moment(from).format('L'), moment(temp_date).format('L'),search_str);
           jqueryMap.$to.text(temp_date); 
        }
        jqueryMap.$date_modal.css("display","none");
    });

    jqueryMap.$search.keypress(function(e) {
  
        if(e.which == 13) {
            var search_str = jqueryMap.$search.val();
            var to = new Date(jqueryMap.$to.text()); 
            var from = new Date(jqueryMap.$from.text()); 
            from = new Date(from);
            to = new Date(to);
            from = moment(from).format('L')
            to = moment(to).format('L')
            if(from!="Invalid date" && to !="Invalid date")
             //data_filter(from,to,search_str);
             configMap.change_option_anchor('monitoring',from,to,search_str );
            else alert("Invalid Date")
        }
    });


}

 configModule = function ( input_map ) {
    proc.util.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
};



helper = function(){

}

setcontent = function(from,to,search_str,$container){

        $("#page-wrapper").css({ 'width' : '3500px' });
        configMap.proc_model.get_proc(function(data){
                stateMap.$container.html(Handlebars.templates.monitoring())
                    var from_Text = new Date(from);
                    var to_Text = new Date(to);
                    jqueryMap.$search.val(search_str);
                    $container.off().empty();
                    stateMap.$container = $container;
                    stateMap.$container.html(Handlebars.templates.monitoring({ptype:data.ptype,source_of_fund:data.source_of_fund,modes:data.modes,category:data.category}));
                    setJqueryMap();
                    jqueryMap.$search.val(search_str);  
                    jqueryMap.$from.text(moment(from_Text).format('LL'));
                    jqueryMap.$to.text(moment(to_Text).format('LL'));
                    data_filter(from,to,search_str)
                    
               
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




initModule = function ( $container,from,to,search_str ) {
    stateMap.$container = $container;
    $container.off().empty();
    var temp_from = from;
    var dates = getDate();
    search_str = (search_str=='undefined' ? '' :search_str)
    from = (from == 'procurement' ? dates[0] :from)
    to   = (temp_from == 'procurement' ? dates[1] :to  )
    setJqueryMap();

    
    if(jqueryMap.$record_table.length==0){
        setcontent(from,to,search_str,stateMap.$container)
    }

    else{
        var from_Text = new Date(from);
        var to_Text = new Date(to);
        jqueryMap.$search.val(search_str);
        jqueryMap.$search.val(search_str);  
        jqueryMap.$from.text(moment(from_Text).format('LL'));
        jqueryMap.$to.text(moment(to_Text).format('LL'));
        data_filter(from,to,search_str)
    }
    //stateMap.$container = $container;
	//stateMap.$container.off().empty();
   
   
    //setcontent(from,to,search_str);

    

};
    return { initModule : initModule,configModule : configModule };
}());


