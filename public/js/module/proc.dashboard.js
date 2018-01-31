proc.dashboard = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
	

	change_option_anchor:null,	
    settable_map : {change_option_anchor:true,procurement_model:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined ,procurement_model : undefined },
jqueryMap = {},
copyAnchorMap,setJqueryMap,configModule,onClickChat,setcontent,helper,randomScalingFactor, initModule;

// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
	var $container = stateMap.$container;
	jqueryMap = {

				}
};

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

setcontent = function(id){
  $("#page-wrapper").css({ 'width' : '' });
	stateMap.$container.html(Handlebars.templates.dashboard({}))
    setJqueryMap();
    configMap.procurement_model.mode_of_proc_graph({},function(response){
      var ctx = document.getElementById("chart-area").getContext("2d");
      window.myPie = new Chart(ctx, response);
    })  
    configMap.procurement_model.get_source_of_fund_filter_graph({},function(response){
      var ctx = document.getElementById("source").getContext("2d");
      window.myPie = new Chart(ctx, response);
    })  
     configMap.procurement_model.get_Supplier_filter_graph({},function(response){
       var color = Chart.helpers.color;
       response.datasets[0].label = 'Supplier'   
       response.datasets[0].backgroundColor= color(window.chartColors.red).alpha(0.5).rgbString()     
       response.datasets[0].borderColor= window.chartColors.red
       response.datasets[0].borderWidth= 1
       var ctx = document.getElementById("supplier_graph").getContext("2d");
       window.myHorizontalBar = new Chart(ctx, {
                type: 'line',
                data: response,
                options: {
                    // Elements options apply to all of the options unless overridden in a dataset
                    // In this case, we are setting the border of each horizontal bar to be 2px wide
                    elements: {
                        rectangle: {
                            borderWidth: 2,
                        }
                    },
                    responsive: true,
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Horizontal Bar Chart'
                    }
                }
            });
         $("#Supplier_Tbody").html(response.tbl_html)     

    }) 
        
     configMap.procurement_model.Pr_Per_Month({},function(response){
        var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var progress = document.getElementById('animationProgress');
        response.options = {
                            title:{
                                display:true,
                                text: "Numbers Of PRs Per month"
                            },
                            animation: {
                                duration: 2000,
                                onProgress: function(animation) {
                                    progress.value = animation.currentStep / animation.numSteps;
                                },
                                onComplete: function(animation) {
                                    window.setTimeout(function() {
                                        progress.value = 0;
                                    }, 2000);
                                }
                            }
                        }
        var ctx = document.getElementById("Pr_Progress").getContext("2d");
        window.myLine = new Chart(ctx, response);
    })  


}

randomScalingFactor = function() {
		return Math.round(Math.random() * 100);
};

initModule = function ( $container ) {
	stateMap.$container = $container;
	stateMap.$container.off().empty();
    setcontent();

};
    return { initModule : initModule,configModule:configModule };
}());