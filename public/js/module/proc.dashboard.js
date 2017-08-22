proc.dashboard = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var
configMap = {
	

	change_option_anchor:null,	
    settable_map : {change_option_anchor:true}
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined },
jqueryMap = {},
copyAnchorMap,setJqueryMap,configModule,onClickChat,setcontent,helper, initModule;

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

}



initModule = function ( $container ) {
	stateMap.$container = $container;
	stateMap.$container.off().empty();

	
			setcontent();

};
    return { initModule : initModule,configModule:configModule };
}());