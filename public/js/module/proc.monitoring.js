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
copyAnchorMap,setJqueryMap,configModule,onClickChat,setcontent,helper, getDate,setEvents, data_filter,set_modal_values,clear_vals,getVals, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
    var $container = stateMap.$container,   $modal  = $container.find("#myModal"), $date_modal=$container.find("#date_modal");

	jqueryMap = {
            $content : $container,
            $modal   : $modal,
            $record_table : $container.find("#record_table"),
            $modal_close  : $container.find('.close'),
            $procurement_close : $modal.find("#procurement_cancel"),
            $procurement_save : $modal.find("#procurement_save"),
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
			$PO_JO  :$modal.find('#PO_JO'),
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
			$ptype : $modal.find('#ptype')
		}
};

getVals = function(){
    var idata = {};
    var inputdata, save_date,save_type = jqueryMap.$procurement_save.attr("save_type");
    for(var i=0;i < configMap.keys.length;i++){
            //console.log($('#'+configMap.keys[i]).val());
        idata[configMap.keys[i]] = $('#'+configMap.keys[i]).val()
    }
    save_date =  jqueryMap.$from.text();
    save_date = moment(save_date).format('L');
    idata.save_date = save_date
    inputdata = {idata:idata};
    if(save_type=="1"){
        configMap.proc_model.save(inputdata,function(data){
            if(idata.ptype == 2){
            $( data ).insertBefore( "#total_pbid" );
            }
            else{
                $( data ).insertBefore( "#total_altmode" );
            }
            clear_vals()

        })
    }
    else{
        clear_vals()
        alert("UPDATED")
    }    
}

data_filter = function(date_from,date_to,search_str){

    $(".overlay").show();
    var filter_data = {from:date_from,to:date_to,search_str:search_str}
    configMap.proc_model.get_filter_proc(filter_data,function(data){
        jqueryMap.$record_table.find('tbody').html(data.html)
        setJqueryMap();
        setEvents(date_from,date_to,search_str);
        $(".overlay").hide();
      
    })
}
clear_vals = function(){
            jqueryMap.$code_PAP.val("") 
			jqueryMap.$pr_no.val("")  
			jqueryMap.$PO_JO.val("")   
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
			jqueryMap.$ptype .val(-1) 
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
			jqueryMap.$PO_JO.val(data.PO_JO)   
			jqueryMap.$program_proj_name.text(data.program_proj_name)   
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
    })
}

setEvents = function(from,to,search_str){
    jqueryMap.$record_table.find("tr").click(function() {
    
        var proc_id;
        proc_id =  $(this).attr('data-id');
        if(proc_id!="none"){
            $('#record_table > tbody >tr').removeClass('cell_hover');
            var data_id = $(this).attr('data-id');
            $(this).addClass("cell_hover")
            $('#myModal').css("display","block");
            set_modal_values(proc_id)  
        }

    });
    // When the user clicks on <span> (x), close the modal
    jqueryMap.$modal_close.click(function() {
        $('#myModal').css("display","none");
        jqueryMap.$date_modal.css("display","none");
    })
    jqueryMap.$procurement_close.click(function(){
         $('#myModal').css("display","none");
         jqueryMap.$date_modal.css("display","none");
    })
    jqueryMap.$procurement_save.click(function(){
         $('#myModal').css("display","none");
         getVals();
    })
    jqueryMap.$from.click(function(){
        jqueryMap.$date_modal.css("display","block");
        var date =  jqueryMap.$from.text();
      date = new Date(date)
      $("#input_date").val(moment(date).format('L'));
       $("#date_save").attr('data-id','from');

    })
    jqueryMap.$generate.click(function(){

          configMap.proc_model.generate({from:from,to:to,search_str:search_str},function(response){
              window.location ="/get_excel"
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
        clear_vals();
        jqueryMap.$procurement_save.attr("save_type", "1");
        jqueryMap.$procurement_save.removeAttr("save_id");
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
                    stateMap.$container.html(Handlebars.templates.monitoring({ptype:data.ptype,source_of_fund:data.source_of_fund,modes:data.modes}));
                    setJqueryMap();
                    jqueryMap.$search.val(search_str);  
                    jqueryMap.$from.text(moment(from_Text).format('LL'));
                    jqueryMap.$to.text(moment(to_Text).format('LL'));
                    data_filter(from,to,search_str)
               
             })
    
         

}



initModule = function ( $container,from,to,search_str ) {
    stateMap.$container = $container;
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


