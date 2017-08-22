proc.nav = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String() + Handlebars.templates.navigation({}),

	 settable_map : {
        menu_model        : true,
        set_option_anchor : true,
        $container:true
      },

      menu_model        : null,
      set_option_anchor : null,
      $container :null
    },
    stateMap  = {
      $append_target : null
    },
    jqueryMap = {},
    setJqueryMap, configModule, initModule, set_navigation, onTapMenu,onlogout,signIn,helper;
	

	
	
	
   setJqueryMap = function () {
    var
      $append_target = stateMap.$append_target
      jqueryMap = {
        $container : stateMap.$append_target,
        $nav      :   $append_target.find("#side-menu"),
        $window   : $(window)
      };
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



  
set_navigation = function(){
	  	
 jqueryMap.$append_target.html(Handlebars.templates.navigation());
	  
}


  onTapMenu = function (event) {
      var option;
    try {  
		option = $(this).attr('data-id')
	
				configMap.set_option_anchor(option,'procurement',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ));
	
      if(option=='monitoring')
        $("#page-wrapper").css({ 'width' : '3500px' });
      else 
        $("#page-wrapper").css({ 'width' : ''});
		
    }
    catch ( error ) {
      return false;
    }
 
    return false; 
  };
	
   initModule = function ( $append_target ) {
    helper();//set handlebars helper
    // load nav html and jquery cache
    stateMap.$append_target = $append_target;

    configMap.menu_model.get_nav(function(response){
          $append_target.html( Handlebars.templates.navigation(response));
              setJqueryMap();
              jqueryMap.$nav.children().click(onTapMenu);
              
    })
  

  	//set_navigation();

  

    // bind user input events

  };
  // End public method /initModule/

  // return public methods
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
}());
