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
  
   var get_proc,get_filter_proc,view_proc,generate,add_proc,update_proc,save,save_update,refresh_total,delete_proc,mode_of_proc_graph,get_Supplier_filter_graph;
     add_proc = curryStoreData("/add_proc");
     update_proc = curryStoreData("/update_proc");
     get_proc = curryFetchData("/get_procurement");
     get_filter_proc = curryStoreData("/filter_proc");
     view_proc  = curryStoreData("/view_procurement");
     generate  = curryStoreData("/generate_excel");
     save = curryStoreData("/save");
     save_update = curryStoreData("/save_update");
     refresh_total = curryStoreData("/get_total");
     delete_proc = curryStoreData("/delete_proc");
     mode_of_proc_graph = curryStoreData("/mode_of_proc_graph")
     get_Supplier_filter_graph = curryStoreData("/get_Supplier_filter_graph")
     return {
        get_proc : get_proc,
        get_filter_proc:get_filter_proc,
        view_proc  : view_proc,
        generate    : generate,
        add_proc   : add_proc,
        update_proc  : update_proc,
        save    :save ,
        save_update :save_update,
        refresh_total :refresh_total,
        delete_proc :delete_proc,
        mode_of_proc_graph : mode_of_proc_graph,
        get_Supplier_filter_graph:get_Supplier_filter_graph
    }

}());

    return {
    navigation : navigation,
    monitoring : monitoring
  };
  }());
