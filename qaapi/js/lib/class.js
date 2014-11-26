'use strict';


(function(G) {

	function __tmpl(){};

	//
	G.$class = function $class(superclass, overrides)
	{
		var subclass
			, supp
			, subp
			, i;

		// normalize params
		i = superclass instanceof Function;
		overrides = overrides || !i && superclass || {};
		superclass = i && superclass || null;

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
			supp = __tmpl.prototype = superclass.prototype;

			subp = subclass.prototype = new __tmpl();
			subp.constructor = subclass;
			subclass.$super = superclass;

			if(supp.constructor == Object.prototype.constructor)
				supp.constructor = superclass;

			for(i in overrides){
				if(overrides[i] instanceof Function && subp[i] instanceof Function) {
					overrides[i].$super = subp[i];
				}

				subp[i] = overrides[i];
			}
		}

		return this.constructor==arguments.callee ? new subclass() : subclass;
	};

	G.$super = function $super(ctx, args) {
		return args.callee.$super.apply(ctx,args);
	}

})(window);

