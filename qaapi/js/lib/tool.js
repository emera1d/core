'use strict';

var _ = (function(){

	function _(id){

	};

	_.UUID = {
		  ids: 0
		, free: []

		, get: function(){ return this.ids++; }
	};

	return _;

})();
