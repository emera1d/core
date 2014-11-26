/* peep */
Game.peep = (function(){
	var peep = function(){
		return peep.collect.apply( peep, arguments );
	};

	peep.propMap = function( _data, _propList ){
		var map = {};

		// collect by array of names
		if( arguments.length == 2 && _propList instanceof Array  ){
			for(var i=0;i<_propList.length;i++)
			map[ _propList[i] ] = _data[ _propList[i] ];
		// collect all props
		} else {
			for(var key in _data)
			map[ key ] = _data[ key ];
		}

		return map;
	};

	// build filter
	peep.parseFilter = function( _filter ){
		for(var key in _filter){
			if( typeof _filter[key] == 'function' ){
			/*nothing*/
			} else if( _filter[key] instanceof RegExp ){
			} else {
				_filter[key] = new RegExp( _filter[key], 'i' );
			}
		}
	};

	// check data
	peep.check = function( _data, _filter ){
	for(var key in _filter)
		if( typeof _filter[key] == 'function' ){
			if( !_filter[key](_data) )
			return false;
		} else {
			if( !(_filter[key].test( String(_data[key]) ) ) )
			return false;
		}

		return true;
	};

	// collect
	// map   : string || Object
	// props : [] || string || null
	// filter: {} || null
	peep.collect = function collect(map,filter,props){
		var key;
		var list;

		// props 2 array
		if( typeof props == 'string' )
			props = [props];

		// data source
		if( typeof map == 'string' && map in Game.Prototypes )
			map = Game.Prototypes[ map ];

		// check valid data
		if( typeof map != 'object' )
			throw 'error';

		list=[];
		// peep
		if( arguments.length == 2 && typeof filter == 'object' ){
			this.parseFilter( filter );

			for(key in map)
				if( this.check( map[key], filter ) )
					list.push( this.propMap(map[key], props) );
		} else {
			for(key in map)
				list.push( this.propMap(map[key], props) );
		}

		return list;
	};

	return peep;
})();