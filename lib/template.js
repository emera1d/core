'use strict';

class CTemplate {}

var tpl = (function(){

	function tpl(){
		return tpl.parse.apply(tpl, arguments);
	};

	/**
		base
	 */
	tpl._re_trim = /^\s+|\s+$/gm;
	tpl._list_separator = /<!--@([A-z0-9_]+)@-->/gm;
	tpl.re = /\{([A-z0-9_]+)\}/gm;

	tpl.__div = document.createElement('div');

	tpl.trim = function(line) {
		return line.replace(this._re_trim, '');
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

	tpl.add = function(line) {
		var list = line.split(this._list_separator);

		list.shift();
		for(var i=0;i <list.length;i+=2) {
			tpl.__templates[ list[i] ] = list[i+1].replace(this._re_trim, '');
		}
	}

	tpl.get = function(key) {
		return this.__templates[key];
	}

	tpl.make = function(key, ds) {
		return this.parse( this.get(key), ds );
	}

	tpl.tpl2el = function(tmpl){
		this.__div.innerHTML = tmpl;

		return this.__div.firstChild;
	}

	return tpl;

})();
