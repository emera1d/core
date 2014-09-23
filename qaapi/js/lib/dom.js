'use strict';

var dom = (function(){

	function dom(id){
		return document.getElementById(id);
	};

	dom.qs = function(selector, node) {
		return (node||document).querySelector(selector);
	}

	dom.qsa = function(selector, node) {
		return (node||document).querySelectorAll(selector);
	}

	dom.on = function(node, eventname, fn) {
		return node.addEventListener(eventname, fn, false);
	}

	dom.bind = function(ctx, selector, eventName, fn) {

		selector = selector.substr(1); // only class

		dom.on(ctx, eventName, function(e) {
			var el = e.target||e.srcElement;
			if(el.classList.contains(selector)) {
				fn({el: el, e: e});
			}
		});
	}

	return dom;

})();
