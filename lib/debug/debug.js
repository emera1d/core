/*
	bug.help = function(){
		1 frame log
		2 debugger
	};
*/

var bug = (function(){

	var _ = window._ = function() { return _.qs.apply(_, arguments); };
	_.qs = function(selector, node) { return (node || document).querySelector(selector); }
	_.on = function(node, eventName, fn) { return node.addEventListener(eventName, fn); }
	_.el = function(tag, attr, html) {
		var el = document.createElement(tag);

		if(typeof attr == 'string') html = attr;
		if(html) el.innerHTML = html;

		return el;
	}

	// processing
	function bug( _msg ){
		bug.processing.apply( bug, arguments );
	}

	bug.storageFlagName = 'bugGuiIsVisible';
	bug.evalCode = ' return {code};'
	bug.cookie_name = '__d';

/* debugging */
	bug.style = [
		  ".debugging.guiLog { position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; border-bottom: 1px #00ff00 solid; font-size: 11px; text-align: left; color: #00aa00; background: rgba(0,0,0,.9); z-index: 999999; }"
		, ".debugging.guiLog .clear { position:absolute; top: 3px; right: 2px; width: 15px; height: 15px; text-align: center; line-height: 10px; border-radius: 2px; background: rgba(0,0,0,.9); cursor: pointer; z-index:2; }"
		, ".debugging.guiLog .body { box-sizing: border-box; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; padding: 25px 0 25px 0; }"
		, ".debugging.guiLog .log { box-sizing: border-box; -moz-box-sizing: border-box; position: relative; top: 0px; left: 0px; height: 100%; width: 100%; font-family: Courier; font-size: 14px; border-top: 1px #006400 solid; border-bottom: 1px #006400 solid; padding: 5px 5px 25px 5px; overflow-y: auto; z-index: 1; }"
		, ".debugging.guiLog .body .log_data {overflow: hidden; }"
		, ".debugging.guiLog .dbgMsg {position: relative; float: left; width: 100%; min-height: 15px; }"
		, ".debugging.guiLog .cmd { position: absolute; bottom: 0px; left: 0px; width: 100%; height: 25px; z-index: 10; }"
		, ".debugging.guiLog .cmd .fld {box-sizing: border-box; -moz-box-sizing: border-box; position: absolute; bottom: 0px; left: 0px; width: 100%; height: 25px; padding: 0 0 0 10px; border: none; font-family: Courier /*Consolas*/; font-size: 14px; color: #00aa00; background: transparent; }"
	].join('');

	bug.cookie = function(name) {
		var re = new RegExp('(?:(?:^|.*;\\s*)' + this.cookie_name + '\\s*\\=\\s*([^;]*).*$)|^.*$');

		return document.cookie.replace(re, '$1');
	};

	bug.addStyle = function() {
		document.body.appendChild( _.el('style', this.style) );
	};

	bug.buildDom = function() {
		this.log = [];
		this.tmpl = '<div class="dbgMsg">{msg}</div>';

		this.frame = _.el('div', '<div class="clear">c</div><div class="cmd"><input type="text" class="fld"></div><div class="body"><div class="log"><div class="logData"></div></div></div>' );
		this.frame.className = 'debugging guiLog';

		this.fld   = _('.fld', this.frame);
		this.clear = _('.clear', this.frame);

		this.logEl = _('.log', this.frame);
		this.data  = _('.logData',this.logEl);

		_.on(document.body, 'keydown', function(e){
			if( e.ctrlKey && e.keyCode == 106 ){ // *
				e.preventDefault();
				bug.toggleCmd();
				return false;
			}
		});

		_.on(this.fld, 'keydown', function(e){
			var result;
			var fn

			if( e.keyCode == 13 ){ // enter
				fn = new Function( bug.evalCode.replace(/\{code\}/, this.value) );
				bug( fn() );
			}
		});

		_.on(this.clear, 'click', bug.clearLog.bind(bug) );

		if( localStorage.getItem( this.storageFlagName ) == 1 )
			this.toggleCmd();

		this( new Date().toString() );
		this.addStyle();
	};

	// init
	bug.init = function(){
		this.mode = +this.cookie(this.cookie_name)||0;

		if( this.mode & 1 ){
			this.__buffer = _.el('div');
			this.buildDom();
		} else {
			this.processing = function(){};
		}
	};

	bug.clearLog = function() {
		this.log = [];
		bug.data.innerHTML = '';
	}

	//
	bug.tm = function( _stamp ){
		var d = _stamp ? new Date( _stamp ) : new Date();
		var o = {h: d.getHours(), m: d.getMinutes(), s: d.getSeconds(), ms: d.getMilliseconds()};

		o.h =(o.h<10?'0':'')+o.h;
		o.m =(o.m<10?'0':'')+o.m;
		o.s =(o.s<10?'0':'')+o.s;
		o.ms=(o.ms<10?'0':'')+(o.ms<100?'0':'')+o.ms;

		return o.h+':'+o.m+':'+o.s+'.'+o.ms;
	}

	// operations per second
	bug.ops = function( _fn ){
		var d1 = Date.now();
		_fn();
		return 1000 / (Date.now() - d1);
	}

	//
	bug.logitem = function(_line){
		this.__buffer.innerHTML = this.tmpl.replace(/\{msg\}/, _line );
		return this.__buffer.firstChild;
	};

	//
	bug.logtm = function( _line ){
	   return '['+this.tm()+'] '+_line;
	}

	//
	bug.processing = function( _msg, _tag ){
		var msg =  this.logtm(_msg); 


		_tag = _tag || 'defaultBugTag'; 

		//
		this.log.push( msg );

		if( this.mode && 1 ){
			this.data.appendChild( this.logitem(msg) );
			this.logEl.scrollTop = this.data.offsetHeight
		}

		// if( this.mode & 4 ){ debugger; } // for the HORDE
	}

/*
*/
	bug.chainLogMark = '';
	bug.timeMark = {};
	bug.profiler = {};

	bug.time = function( _id ){ this.timeMark[_id]=new Date().getTime(); }
	bug.timeEnd = function( _id ){ console.info( _id + ': ' + (Date.now() - this.timeMark[_id]) ); }

	bug.chain = function( _key, _mode ){   // 1 start, 2 end
		if( _mode == 1 )
			console.log( '...Start chain...' );
		else
			this.timeEnd( this.chainLogMark );

		if( _mode == 2 )
			console.log( '...End chain...' );
		else
			this.time( _key );

		this.chainLogMark = _key;
	}


	bug.view = function(){
		var ttl=0;


		for(var key in this.profiler ){
			console.log( key + ': ' + this.profiler[key].time );
			ttl += this.profiler[key].time;
		}

		console.log('Total: ' + ttl);
	}

	bug.collect = function( _key, _mode ){
		var curTime = Date.now();

		if( ! (_key in this.profiler) )
		  this.profiler[_key] = { time: 0 };

		if( _mode == 1)
			this.profiler[_key].last = curTime;
		else if( _mode == 2)
			this.profiler[_key].time += curTime - this.profiler[_key].last;
	}

/*
	UI
*/
	bug.toggleCmd = function(){
		if(bug.frame.parentNode){
			bug.frame.parentNode.removeChild(bug.frame);
			localStorage.setItem( this.storageFlagName, 0 );
		} else {
			
			document.body.appendChild(bug.frame);
			localStorage.setItem( this.storageFlagName, 1 );
			this.fld.focus();
		}
	}

	bug.init();

	return bug;

})();
