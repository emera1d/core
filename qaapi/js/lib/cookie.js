'use strict';

var cookie = (function(){

	function cookie(id){
		return document.getElementById(id);
	};

	cookie.parse = function(line) {
		var list = line.split(';')
			, val
			, obj = {};

		for(var i=0;i<list.length;i++) {
			val = list[i].split('=');
			obj[ _.trim(val[0]) ] = _.trim(val[1]);
		}

		return obj;
	};

	return cookie;

})();
