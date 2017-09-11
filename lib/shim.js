'use strict';


function _add(dst, src) {
	for(var k in src) {
		dst[k] = src[k];
	}
}

function _clone(src) {
	var dst;

	if(Object.prototype.toString.call(o) == '[object Array]') {
		throw 'not an object';
	}

	dst = {};

	for(var key in src) {
		dst[key] = src[key];
	}

	return dst;
}
