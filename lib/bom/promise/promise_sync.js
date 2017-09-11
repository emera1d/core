'use strict';



function createPromise(name, failure) {
	return new Promise(function(resolve, reject) {
		setTimeout( () => failure ? reject(name) : resolve(name), 1000 );
	});
}

function initLoading(callback, key, __forcedStates) {
	var promiseList = [
		createPromise('one', __forcedStates[0]),
		createPromise('three', __forcedStates[1]),
		createPromise('two', __forcedStates[2])
	];

	var promiseAll = Promise.all(promiseList);

	promiseAll
		.then(() => {
			console.log('then');
			callback(true);
		})
		.catch(() => {
			console.log('reject');
			callback(false);
		});
}


function CFetcher(callback, index, __forcedStates) {
	this.id = index;
	this._callback = callback;
	this.__forcedStates = __forcedStates || [];
}

CFetcher.prototype = {
	id: null,
	_callback: null,
	_aborted: false,

	fetch: function() {
		initLoading(this._complete.bind(this), this.id, this.__forcedStates);
	},

	abort: function() {
		this._aborted = true;
		this._callback = null;
	},

	_complete: function(stt) {
		if(this._aborted) {

		} else {
			this._callback(stt, this.id);
		}
	}
};


function CSyncPromise () {

}

CSyncPromise.prototype = {
	_counter: 0,
	_states: {
		IDLE: 0,
		FETCHING: 1,
		ABORTED: 2,
		COMPLETE: 3
	},

	_state: 0,
	_heap: {},

	fetch: function(callback, __forcedStates) {
		if(this._state == this._states.FETCHING) {
			throw 'Fetching in progress';
		}

		this._state = this._states.FETCHING;

		var index = this._counter;
		this._counter += 1;

		this._current = new CFetcher(this._onReady.bind(this, callback), index, __forcedStates);
		this._heap[index] = this._current;

		this._current.fetch();
	},

	abort: function() {
		if(this._state == this._states.IDLE
		|| this._state == this._states.ABORTED
		|| this._state == this._states.COMPLETE
		) {
			throw 'Nothing to abort';
		}

		this._state = this._states.ABORTED;

		this._current.abort();
		delete this._heap[this._current.id];

		this._current = null;
	},

	_onReady: function(callback, stt, id) {
		this._state = this._states.COMPLETE;

		[].slice();

		callback(stt, id);
	}
}

var fetcher = new CSyncPromise();

function onReady(stt, key) {
	console.log('Success: ' + stt, 'Index: ' + key);
}


fetcher.fetch(onReady, [false, false, false]);

// Sample with 4 fetch
// fetcher.fetch(onReady, [false, false, false]); // fetch first
// fetcher.abort();
// fetcher.fetch(onReady, [false, false, false]); // fetch second
// fetcher.abort();
// fetcher.fetch(onReady, [false, false, false]); // fetch third
// fetcher.abort();

// fetcher.fetch(onReady, [false, false, false]); // fetch forth