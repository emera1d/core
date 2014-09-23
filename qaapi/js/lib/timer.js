'use strict';

var timer = function(fn,delay){

	function timer(){
		return timer.set.apply(timer);
	};

	timer.id = null;
	timer.delay = delay || 100;
	timer.fn = fn;

	timer._set = (function() {
		this.fn();
	}).bind(timer);

	timer.set = function() {
		this.clear();
		this.id = setTimeout(this._set, this.delay);
	};

	timer.clear = function() {
		clearTimeout(this.id);
	};

	return timer;
};
