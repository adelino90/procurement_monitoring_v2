proc.nav = (function () {
  'use strict';
  //---------------- BEGIN MODULE SCOPE VARIABLES --------------
  var
    configMap = {
      main_html : String() + Handlebars.templates.navigation({}),

	 settable_map : {
		account_model:true,
        menu_model        : true,
        set_option_anchor : true,
        user_model        :true,
        $container:true
      },
	  account_model		: null,
      menu_model        : null,
      set_option_anchor : null,
      user_model        : null,
      $container :null
    },
    stateMap  = {
      $append_target : null
    },
    jqueryMap = {},
    setJqueryMap, configModule, initModule, set_navigation, onTapMenu,onlogout,signIn,helper;
	

	
	
	
   setJqueryMap = function () {
    var
      $append_target = stateMap.$append_target,
      $nav           = $append_target.find( '#proc_navigation' ),
    jqueryMap = {
    $nav      : $nav,
      $window   : $(window)
    };
  };
	
	
  configModule = function ( input_map ) {
    ebulletin.util.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };

  helper = function(){

    Handlebars.registerHelper('list', function(items, options) {
      var out = '';
      for(var i=0, l=items.length; i<l; i++) {
        out = out +'<li class="ebulletin-dropdown-li" data-id="'+items[i].option+'"><a>'+items[i].nCaption+'</a></li>';
      }
      
      return out;
    });
  }



  
  set_navigation = function(){
	  	
 jqueryMap.$append_target.html(Handlebars.templates.navigation());
	  
  }

	/*
  onTapMenu = function (event) {
      var option;
    try {  
		option = $(this).attr('data-id')
				 $(this).siblings().removeClass('active');
         jqueryMap.$options.children().removeClass('active');
         jqueryMap.$right_options_li.children().removeClass('active');
				 $(this).parent().parent().removeClass('open');
		 $(this).addClass('active');
	
				configMap.set_option_anchor(option,'ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ));
	
			
		
		
    }
    catch ( error ) {
      return false;
    }
 
    return false; 
  };*/
	
   initModule = function ( $append_target ) {
    helper();//set handlebars helper
    // load nav html and jquery cache
    stateMap.$append_target = $append_target;
    console.log( $append_target)
    $append_target.html( Handlebars.templates.navigation({}));
    setJqueryMap();
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
