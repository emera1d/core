'use strict';

var xhr = (function(){

	function xhr(url, opt){
		xhr.request.apply(xhr, arguments);
	};

	xhr.cfg = {
		method: 'get'
	};

	xhr._onload = function(url, opt, res) {
		if(opt) {
			if(opt.ok) opt.ok(res);
		}
	}

	xhr.request = function(url, opt) {

		var r;

		opt = opt || {};

		r = new XMLHttpRequest();

		r.onload = this._onload.bind(this, url, opt);
		r.open(opt.method||this.cfg.method, url, true);
		r.send();
	}

	return xhr;

})();
