'use strict';


var xhr = (function(){

	function xhr(url, opt){
		this.url = url;
		this.opt = opt || {};
		// this._onload = this._onload.bind(this);
		this._onreadystatechange = this.onreadystatechange.bind(this);

		this.request(this.url, this.opt);
	};

	xhr.prototype = {
		cfg: {
			method: 'GET'
		}

		// , _onload: function(res) {
		// 	if(this.opt) {
		// 		if(this.opt.ok) this.opt.ok(res);
		// 	}
		// }

		, onreadystatechange: function() {
			var r = this.xhr;
			if (r.readyState == 4){
				switch (r.status) {
					case 200:
						this.opt.ok && this.opt.ok(r.responseText);
						break;
					case 0:
						this.opt.error && this.opt.error(r.responseText);
						break;
				}
			}
		}

		, request: function(url, opt) {
			var method;

			opt = opt || {};

			
			this.xhr = new XMLHttpRequest();

			// this.xhr.onload = this._onload;
			this.xhr.onreadystatechange = this._onreadystatechange;


			method = opt.method||this.cfg.method;

			if(method=='GET') {
				if(opt.params) url += '?' + xhr.search(opt.params);
			}

			this.xhr.open( method, url, true );

			this.xhr.send();
		}
	}

	_add(xhr, {
		search: function(ds) {
			var val
				, qsp = [];

			for(var key in ds) {
				val = ds[key];

				qsp.push(key + (val===undefined||val===null||val===''? '' : '='+val) );
			}

			return qsp.join('&');;
		},

		makeUrl: function(url, params) {
			return url + '?' + this.search(params);
		}

		, parseUrl: function() {
			// ^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?
		}
	});

	return xhr;

})();
