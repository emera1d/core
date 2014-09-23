'use strict';

var _ = (function(){

	function _(id){
		return document.getElementById(id);
	};

	_.re_trim = /^\s+|\s$/gm
	_.trim = function(line) {
		return line.replace(this.re_trim, '');
	};

	return _;

})();
