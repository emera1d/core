'use strict';

var xhr = (function(){

	function xhr(url, opt){
		this.url = url;
		this.opt = opt;
		// this._onload = this._onload.bind(this);
		this._onreadystatechange = this.onreadystatechange.bind(this);

		this.request(this.url, this.opt);
	};

	xhr.prototype = {
		cfg: {
			method: 'get'
		}

		// , _onload: function(res) {
		// 	if(this.opt) {
		// 		if(this.opt.ok) this.opt.ok(res);
		// 	}
		// }

		, onreadystatechange: function() {
			var r = this.xhr;
			if (r.readyState == 4){
				if(r.status == 200) {
					if(this.opt) {
						if(this.opt.ok) this.opt.ok(r.responseText);
					}
				}
			}
		}

		, makeQueryString: function(ds) {
			var list = [];


			if(!ds) return '';

			for(var k in ds)
				list.push(k+'='+ds[k]);

			return list.join('&');
		}

		, request: function(url, opt) {
			opt = opt || {};

			
			this.xhr = new XMLHttpRequest();
			// this.xhr.onload = this._onload;
			this.xhr.onreadystatechange = this._onreadystatechange;

			this.xhr.open(	opt.method||this.cfg.method
						 , url + (opt.param? '?'+this.makeQueryString(opt.param): '')
						 , true
			);

			this.xhr.send();
		}
	}

	return xhr;

})();
