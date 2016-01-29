'use strict';
/*
	//
*/

var async = (function(){

	//
	var async = {};

	// parallel
	async.parallel = function( _tasks, _end ){
		var results;
		var count = 0;

		var taskList = [];

		//
		function process(_fn,_key){
			_fn(function( _res ){
				results[_key] = _res; // save result

				--count;			  // dencrement
				if( count == 0 )
					_end(results);
			});
		};

		//
		if( _tasks instanceof Array ){
			results = [];
			for(var i=0;i<_tasks.length;i++)
				taskList.push({ index: i, val: _tasks[i] });

		} else if( _tasks instanceof Object ){
			results = {};
			for(var key in _tasks)
				taskList.push({ index: key, val: _tasks[key] });
		};


		count = taskList.length;
		taskList.forEach(function( _item ){
			process( _item.val, _item.index);
        })
    };

    //
    return async;

})();