'use strict';


var tpl = (function(){

	function tpl(){
		return tpl.parse.apply(tpl, arguments);
	};

	/**
		base
	 */
	tpl.re_trim = /^\s+|\s+$/gm;
	tpl.re = /\{([A-z0-9_]+)\}/gm;

	tpl.trim = function(line) {
		return line.replace(this.re_trim, '');
	};

	tpl.parse = function(str, ds) {
		return str.replace(this.re, function(match, p1, index, line) {
			return (p1 in ds ? ds[p1] : '');
		});
	};

	/**
		template storage
	 */
	tpl.__templates = {};

	tpl.load = function(re, line) {
		var list = line.split(re);

		list.shift();
		for(var i=0;i <list.length;i+=2) {
			tpl.__templates[ list[i] ] = list[i+1].replace(this.re_trim, '');
		}
	}

	tpl.get = function(key) {
		return this.__templates[key];
	}

	tpl.make = function(key, ds) {
		return this.parse( this.get(key), ds );
	}

	return tpl;

})();
