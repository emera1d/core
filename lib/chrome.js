'use strict';


var chm = (function(){

	function chm(id){
		
	};

	chm.exec = function(code) {
		chrome.tabs.executeScript(null, {code: code}/*, function(res) {}*/);
	}

	chm.cookie = function(fn) {
		chrome.tabs.executeScript(null, {code:'document.cookie;'}, function(res) {
			fn(cookie.parse(res[0]));
		});
	};

	chm.on = function(node, eventname, fn) {
		return node.addEventListener(eventname, fn, false);
	}

	return chm;

})();
