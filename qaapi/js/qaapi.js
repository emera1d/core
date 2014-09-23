'use strict';

/**	
	http://qaapi.ikudinov.d3.staffpass.msk/
	http://qaapi.staffpass.com/
*/

var qa = (function(){

	function qa() {
		qa.request.apply(qa, arguments);
	};


	qa.setMeta = function(meta) {
		this._meta = meta;
		this.prepare();
	};

	qa.prepare = function() {
		var m=this._meta
			, cmd, prm, list;

		for(var command in m) {
			cmd = m[command];
			list = [];
			for(var param in cmd.params) {
				prm = cmd.params[param];
				prm.name = param;
				list.push(prm);
			}

			cmd.params = list;
		}
	};

	qa.getParams = function(cmd) {
		return (cmd in this._meta ? this._meta[cmd].params : null);
	};

	qa.getList = function() {
		return Object.keys(this._meta);
	};

	qa.find = function(val) {
		var list = []
			, meta = this._meta;

		val = val.toLowerCase();

		for(var k in meta) {
			if( k.toLowerCase().indexOf(val)==0 ) {
				list.push(k);
			}
		}

		return list;
	};

	qa.request = function(url, data, fn) {
		var params=[];

		if(arguments.length==2) fn=data;

		if(data) {
			for(var k in data)
				params.push(k+'='+data[k]);

			url += '?' + params.join('&')
		}

		xhr(url, {
			
		});
	}

	return qa;

})();
