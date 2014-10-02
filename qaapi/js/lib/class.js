'use strict';


function $class(superclass, overrides)
{
	var subclass
		, F
		, supp
		, subp
		, i
		, s
		, d;

	// normalize params
	i=superclass instanceof Function;
	overrides=overrides || !i && superclass || {};
	superclass=i && superclass || null;

	// find subclass constructor
	if(overrides.constructor!=Object.prototype.constructor)
		subclass=overrides.constructor, delete overrides.constructor;
	else if(superclass)
		subclass=function(){ arguments.callee.$super.apply(this,arguments); };
	else
		subclass=function(){};

	if(!superclass){
		subclass.prototype=overrides;
	}else{
		// prototyping
		F=function(){};
		supp = F.prototype = superclass.prototype;

		subp = subclass.prototype = new F();
		subp.constructor = subclass;
		subclass.$super = superclass;

		if(supp.constructor==Object.prototype.constructor)
			supp.constructor = superclass;

		for(i in overrides){
			s = overrides[i];
			d = subp[i];
			if(s instanceof Function && d instanceof Function)
				s.$super = d;
			subp[i] = s;
		}
	}

	return this.constructor==arguments.callee ? new subclass() : subclass;
}


function $super(ctx, args) {
	return args.callee.$super.apply(ctx,args);
}

