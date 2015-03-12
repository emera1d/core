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

	dom.id = function(id) {
		return document.getElementById(id);
	}

	dom.on = function(node, type, fn) {
		return node.addEventListener(type, fn, false);
	}

	dom.un = function(node, type, fn) {
		return node.removeEventListener(type, fn, false);
	}

	dom.bind = function(ctx, selector, type, fn) {

		selector = selector.substr(1); // only class

		dom.on(ctx, type, function(e) {
			var el = e.target||e.srcElement;
			if(el.classList.contains(selector)) {
				fn({el: el, e: e});
			}
		});
	}

	return dom;

})();

/*
	.prefix

	.parentNode
	.parentElement

	.closest	The closest(selectors) method, when invoked, must run these steps:
	.matches	The matches(selectors) method, when invoked, must run these steps:

	.normalize


	new DocumentFragment
	new Range
*/