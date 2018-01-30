/*
* spa.shell.js
* Shell module for SPA
*/
/*jslint browser : true, continue : true,
devel : true, indent : 2, maxerr : 50,
newcap : true, nomen : true, plusplus : true,
regexp : true, sloppy : true, vars : false,
white : true
*/
/*global $, spa */
proc.shell = (function () {
			'use strict';
//---------------- BEGIN MODULE SCOPE VARIABLES --------------
var 
configMap = {
	anchor_schema_map : {
	option:{dashboard:true,monitoring:true},
	datef:{from:true},
	_datef:{id:true},
	datet:{to:true},
	_datet:{id:true},
	_option : {id : true},
	filter:{search:true},
	_filter :{search_str:true}
	},resize_interval : 200,
	main_html : String() + Handlebars.templates.content({})
},
stateMap = {$container : undefined, anchor_map : {} ,resize_idto : undefined},
jqueryMap = {},
initModule,copyAnchorMap,setJqueryMap, changeAnchorPart,randomScalingFactor, onHashchange, setOptionAnchor,setfilterOptionAnchor;
//----------------- END MODULE SCOPE VARIABLES ---------------
//-------------------- BEGIN UTILITY METHODS -----------------
//--------------------- END UTILITY METHODS ------------------
//--------------------- BEGIN DOM METHODS --------------------

// Returns copy of stored anchor map; minimizes overhead
copyAnchorMap = function () {
	return $.extend( true, {}, stateMap.anchor_map );
};


// Begin DOM method /setJqueryMap/
setJqueryMap = function () {
    var $container = stateMap.$container;
    var $wrapper = $container.find('.proc_wraper')
	jqueryMap = { $container : $container,
	//$main : $container.find('.spa-shell-main'),
	 $content   : $container.find('.proc_content'),	
	$nav : $container.find('#proc_navigation')
    };
};
// End DOM method /setJqueryMap/
// Begin DOM method /toggleChat/
// Purpose : Extends or retracts chat slider
// Arguments :
// * do_extend - if true, extends slider; if false retracts
// * callback - optional function to execute at end of animation
// Settings :
// * chat_extend_time, chat_retract_time
// * chat_extend_height, chat_retract_height
// Returns : boolean
// * true - slider animation activated
// * false - slider animation not activated
//

//--------------------- END DOM METHODS ----------------------
// Begin DOM method /changeAnchorPart/
// Purpose : Changes part of the URI anchor component
// Arguments:
// * arg_map - The map describing what part of the URI anchor
// we want changed.
// Returns : boolean
// * true - the Anchor portion of the URI was update
// * false - the Anchor portion of the URI could not be updated
// Action :
// The current anchor rep stored in stateMap.anchor_map.
// See uriAnchor for a discussion of encoding.
// This method
// * Creates a copy of this map using copyAnchorMap().
// * Modifies the key-values using arg_map.
// * Manages the distinction between independent
// and dependent values in the encoding.
// * Attempts to change the URI using uriAnchor.
// * Returns true on success, and false on failure.
//


changeAnchorPart = function ( arg_map ) {
	var
	anchor_map_revise = copyAnchorMap(),
	bool_return = true,
	key_name, key_name_dep;
	// Begin merge changes into anchor map
	KEYVAL:
	for ( key_name in arg_map ) {
		if ( arg_map.hasOwnProperty( key_name ) ) {
			// skip dependent keys during iteration
			if ( key_name.indexOf( '_' ) === 0 ) { continue KEYVAL; }
			// update independent key value
			anchor_map_revise[key_name] = arg_map[key_name];
			// update matching dependent key
			key_name_dep = '_' + key_name;
			if ( arg_map[key_name_dep] ) {
				anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
			}
			else {
				delete anchor_map_revise[key_name_dep];
				delete anchor_map_revise['_s' + key_name_dep];
			}
		}
	}
// End merge changes into anchor map
// Begin attempt to update URI; revert if not successful
	try {
		$.uriAnchor.setAnchor( anchor_map_revise );
	}
	catch ( error ) {
		// replace URI with existing state
		$.uriAnchor.setAnchor( stateMap.anchor_map,null,true );
		bool_return = false;
	}
	// End attempt to update URI...
	return bool_return;
};


// End Event handler /onResize/

// Begin Event handler /onHashchange/
// Purpose : Handles the hashchange event
// Arguments:
// * event - jQuery event object.
// Settings : none
// Returns : false
// Action :
// * Parses the URI anchor component
// * Compares proposed application state with current
// * Adjust the application only where proposed state
// differs from existing
//
onHashchange = function ( event ) {
	var
	_s_chat_previous, _s_chat_proposed, s_chat_proposed,
	anchor_map_proposed,_s_b_previous, _s_b_proposed,
	is_ok = true,s_option_proposed,
	anchor_map_previous = copyAnchorMap();
	// attempt to parse anchor
	try { anchor_map_proposed = $.uriAnchor.makeAnchorMap();}
	catch ( error ) {
		$.uriAnchor.setAnchor( anchor_map_previous, null, true );
		return false;
	}

	_s_b_previous = anchor_map_previous._s_option;
	_s_b_proposed = anchor_map_proposed._s_option;

	if (! anchor_map_previous || _s_b_previous !== _s_b_proposed )
	{
			s_option_proposed = anchor_map_proposed.option;
		switch(s_option_proposed){
			case "dashboard":
				proc.dashboard.initModule( jqueryMap.$content );
			break;
			case "monitoring":
			// /console.log(anchor_map_proposed);
				proc.monitoring.initModule( jqueryMap.$content,anchor_map_proposed._option.id,anchor_map_proposed._option.id2,anchor_map_proposed._option.id3);
			break;
			
		    default :
				delete anchor_map_proposed.option;
				delete anchor_map_proposed.chat;
				$.uriAnchor.setAnchor( anchor_map_proposed, null, true );
		}
	}
	
	
	stateMap.anchor_map = anchor_map_proposed;
	// convenience vars
	_s_chat_previous = anchor_map_previous._s_chat;
	_s_chat_proposed = anchor_map_proposed._s_chat;
	// Begin adjust chat component if changed
	//console.log(anchor_map_previous);
	if ( ! anchor_map_previous
	|| _s_chat_previous !== _s_chat_proposed
	) 
	 {
		s_chat_proposed = anchor_map_proposed.chat;
		
		switch ( s_chat_proposed ) {
			case 'opened' :
				is_ok = spa.chat.setSliderPosition( 'opened' );
			break;
			case 'closed' :
				is_ok = spa.chat.setSliderPosition( 'closed' );
			break;
			case 'hidden' :
				is_ok = spa.chat.setSliderPosition( 'hidden' );
			break;
			default :
				spa.chat.setSliderPosition( 'closed' );
				delete anchor_map_proposed.chat;
				$.uriAnchor.setAnchor( anchor_map_proposed, null, true );
		}
	  }
// End adjust chat component if changed
// Begin revert anchor if slider change denied
	if ( ! is_ok ){
		if ( anchor_map_previous ){
			$.uriAnchor.setAnchor( anchor_map_previous, null, true );
			stateMap.anchor_map = anchor_map_previous;
		} 
		else {
			delete anchor_map_proposed.chat;
			$.uriAnchor.setAnchor( anchor_map_proposed, null, true );
		}
	}
// End revert anchor if slider change denied
	return false;
};
// End Event handler /onHashchange/

//-------------------- END EVENT HANDLERS --------------------

//---------------------- BEGIN CALLBACKS ---------------------
// Begin callback method /setChatAnchor/
// Example : setChatAnchor( 'closed' );
// Purpose : Change the chat component of the anchor
// Arguments:
// * position_type - may be 'closed' or 'opened'
// Action :
// Changes the URI anchor parameter 'chat' to the requested
// value if possible.
// Returns :
// * true - requested anchor part was updated
// * false - requested anchor part was not updated
// Throws : none
//

  setOptionAnchor = function ( option, id, id2, id3) {
    return changeAnchorPart({ option : option, _option : { id : id, id2 : id2 ,id3 : id3} });
  };
  randomScalingFactor = function() {
		return Math.round(Math.random() * 100);
  };

// End callback method /setChatAnchor/
//----------------------- END CALLBACKS ----------------------

// Begin Event handler /onClickChat/

// End Event handler /onClickChat/
//------------------- BEGIN PUBLIC METHODS -------------------
// Example : spa.shell.initModule( $('#app_div_id') );
// Purpose :
// Directs the Shell to offer its capability to the user
// Arguments :
// * $container (example: $('#app_div_id')).
// A jQuery collection that should represent
// a single DOM container
// Action :
// Populates $container with the shell of the UI
// and then configures and initializes feature modules.
// The Shell is also responsible for browser-wide issues
// such as URI anchor and cookie management.
// Returns : none
// Throws : none
//
// Begin Public method /initModule/
initModule = function ( $container ) {
	// load HTML and map jQuery collections
	 var wait_popup;


	stateMap.$container = $container;
	
	$container.html( configMap.main_html );
	proc.model.monitoring.mode_of_proc_graph({},function(response){
		var ctx = document.getElementById("chart-area").getContext("2d");
		window.myPie = new Chart(ctx, response);
	})  
	 proc.model.monitoring.get_Supplier_filter_graph({},function(response){
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
	setJqueryMap();
	// initialize chat slider and bind click handler

    $.ajaxSetup({
      cache: false // Defeat browser cache by adding a timestamp to the URL.
    });

	// configure uriAnchor to use our schema
	$.uriAnchor.configModule({
	schema_map : configMap.anchor_schema_map
	});

	proc.dashboard.configModule({
	  change_option_anchor:setOptionAnchor,
		procurement_model : proc.model.monitoring,
	});
	proc.monitoring.configModule({
	  change_option_anchor:setOptionAnchor,
	  proc_model : proc.model.monitoring,
		keys : proc.field_keys.keys
    });
	proc.nav.configModule({
	  set_option_anchor : setOptionAnchor,
	  $container :jqueryMap.$nav,
	  menu_model : proc.model.navigation
    });
    proc.nav.initModule(jqueryMap.$nav);


	 	//setOptionAnchor('home','ebulletin',( ( new Date() ).getSeconds() + 10000 ).toString( 36 ))	
	// configure and initialize feature modules
	// Handle URI anchor change events.
	// This is done /after/ all feature modules are configured
	// and initialized, otherwise they will not be ready to handle
	// the trigger event, which is used to ensure the anchor
	// is considered on-load
	//

	$(window)
		.bind( 'hashchange', onHashchange )
		.trigger( 'hashchange' );
		
;
	};
// End PUBLIC method /initModule/
return { initModule : initModule };
//------------------- END PUBLIC METHODS ---------------------
}());