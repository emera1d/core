'use strict';


(function(G) {

	//
	G.$class = function $class(superclass, overrides)
	{
		var subclass
			, _child
			, is_func
			, supp
			, subp
			, i
		;

		// normalize params
		is_func = superclass instanceof Function;
		overrides = overrides || !is_func && superclass || {};
		superclass = is_func && superclass || null;

		// find subclass constructor
		if(overrides.constructor != Object.prototype.constructor) {
			subclass = overrides.constructor;
			delete overrides.constructor;
		} else if(superclass) {
			subclass = function (){ arguments.callee.$super.apply(this, arguments); };
		} else {
			subclass = function (){};
		}

		if(!superclass) {
			subclass.prototype=overrides;
		} else {
			// prototyping
			_child = function _child(){};

			supp = _child.prototype = superclass.prototype;

			subp = subclass.prototype = new _child();
			subp.constructor = subclass;
			subclass.$super = superclass;

			if(supp.constructor == Object.prototype.constructor)
				supp.constructor = superclass;

			for(var i in overrides){
				if(overrides[i] instanceof Function && subp[i] instanceof Function) {
					overrides[i].$super = subp[i];
				}

				subp[i] = overrides[i];
			}
		}

		return subclass;
	};

	G.$super = function $super(ctx, args) {
		return args.callee.$super.apply(ctx,args);
	}

})(window);

