proc.model = (function () {
  'use strict';
  var curryFetchData,curryStoreData,navigation, monitoring;
  
  
  
  curryFetchData = function ( url ) {
    return function ( fn, id ) {
      id = id || '';
      $.get( url + id )
        .done( fn )
        .fail( function( jqxhr, text_status, error ) {
         console.log( 'Error occured.' );
        });
    }
  };

  curryStoreData = function ( url ) {
    return function ( data_map, fn ) {
      $.post( url, data_map )
        .done( fn )
        .fail( function( jqxhr, text_status, error ) {
          console.log( 'Error occured.' );
        });
    }
  };




navigation = (function(){
  
   var get_nav;

     get_nav = curryFetchData("/getnav");
     

    return {
    get_nav:get_nav
    }

   }());

monitoring  = (function(){
  
   var get_proc,get_filter_proc,view_proc,generate;

     get_proc = curryFetchData("/get_procurement");
     get_filter_proc = curryStoreData("/filter_proc");
     view_proc  = curryStoreData("/view_procurement");
     generate  = curryStoreData("/generate_excel");
    return {
    get_proc : get_proc,
    get_filter_proc:get_filter_proc,
    view_proc  : view_proc,
    generate    : generate
    }

}());

    return {
    navigation : navigation,
    monitoring : monitoring
  };
  }());
