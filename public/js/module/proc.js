var proc = (function () {
'use strict';
var initModule = function ( $container ) {
//e-bulletin.model.initModule();
proc.shell.initModule( $container );
};
return { initModule: initModule };
}());