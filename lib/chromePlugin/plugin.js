'use strict';


var plugin = (function(){

	function plugin(){
		// ...
	};

	plugin.execInActiveTab = function(code, fn) {
		this.getActiveTab(function(tab) {
			if(tab) {
				chrome.tabs.executeScript(tab.id, {code: code}, function(res) {
					fn && fn(res);
				});
			}
		}.bind(this));
	};

	plugin.tryExec = function(code, fn) {
		code = [
			'(function (){',
			'var value;',
			'try {',
			code,
			'} catch (er){}',
			'return value;',
			'})();'
		].join('\n');

		this.execInActiveTab(code, fn);
	};

	plugin.cookie = function(fn) {
		this.getActiveTab(function(tab) {
			chrome.cookies.getAll({
				url: tab.url
			}, function(cookies) {
				var cookies = cookies || [];
				var data = {};

				cookies.forEach(function(cookie) {
					data[cookie.name] = cookie.value;
				});

				fn(data);
			});
		});
	};

	plugin.getActiveTab = function(fn) {
		// since only one tab should be active and in the current window at once
		// the return variable should only have one entry
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs) {
			fn(tabs[0]);
		});
	};

	plugin.extension = {
		getUrl: function(path) {
			return chrome.extension.getURL(path);
		},

		getBackgroundPage: function() {
			return chrome.extension.getBackgroundPage();
		},

		getInjectUrl: function() {
			return chrome.extension.getURL('/contentPlugin.html');
		}
	};

	plugin.windows = {
		create: function(options, fn) {
			chrome.windows.create({
				type: 'popup', // "normal", "popup", "panel", or "detached_panel"
				url: options.url,
				left: options.left,
				top: options.top,
				width: options.width,
				height: options.height
			}, fn);
		}
	};


	return plugin;

})();
