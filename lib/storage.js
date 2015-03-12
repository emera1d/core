'use strict';


var storage = (function(){

	function storage(){
		var args = arguments;

		switch (args.length) {
			case 1:
				return this.get.apply(this, args);
			case 2:
				return this.set.apply(this, args);
		}
	}

	storage._api = localStorage;

	storage.set = function(key, val) {
		return this._api.setItem(key, val);
	};

	storage.get = function(key) {
		return this._api.getItem(key);
	};

	storage.del = function(key) {
		return this._api.removeItem(key);
	};

	return storage;
})();

var mdb = (function() {

	function mdb(key) {
		this.key = key;
		this.ds  = {};

		this.storage = storage;
		this.load();
	}

	mdb.prototype.get = function (name) {
		return this.ds[name];
	}

	mdb.prototype.set = function (name, val) {
		this.ds[name] = val;
		this.save();
	}

	mdb.prototype.del = function (name) {
		delete this.ds[name];
		this.save();
	}

	mdb.prototype.save = function () {
		this.storage.set(this.key, JSON.stringify(this.ds));
	}

	mdb.prototype.load = function () {
		this.ds = JSON.parse(this.storage.get(this.key)) || {};
	}

	return mdb;

})();


/*

 function saveChanges() {
        // Get a value saved in a form.
        var theValue = textarea.value;
        // Check that there's some code there.
        if (!theValue) {
          message('Error: No value specified');
          return;
        }
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'value': theValue}, function() {
          // Notify that we saved.
          message('Settings saved');
        });
      }
      
If you're interested in tracking changes made to a data object, you can add a listener to its onChanged event. Whenever anything changes in storage, that event fires. Here's sample code to listen for saved changes:

      chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
      });
*/