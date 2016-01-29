'use strict';


var cookie = (function(){

	function cookie(id){
		if(arguments.length==1){
			return document.cookie.match(new RegExp('(^|; )'+name+'=(.*?)(;|$)')) ? decodeURIComponent(RegExp.$2) : undefined;
		}
		document.cookie =
			name + '=' + encodeURIComponent(value)
			+ (expires ? '; expires=' + (expires instanceof Date ? expires.toGMTString() : expires):'')
			+ (path ? '; path=' + path:'')
			+ (domain ? '; domain=' + domain:'')
			+ (secure ? '; secure':'');
	};

	cookie.parse = function(line) {
		var list = line.split(';')
			, val
			, obj = {};

		for(var i=0;i<list.length;i++) {
			val = list[i].split('=');
			obj[ tpl.trim(val[0]) ] = tpl.trim(val[1]);
		}

		return obj;
	};

	return cookie;

})();
