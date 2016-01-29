'use strict';


// 
var i18n = (function(){

	// i18n processor
	function i18n(){}

	// options
	i18n.opt = {
		dictionaryUrl: '/i18n.js'
	}

	// init
	i18n.load = function( _onLoad ){
		var beforeLoad = Date.now();

		function onLoad( _data, _needParse ){
			var loadTs = Date.now();


			if( _needParse )
				_data = $.parseJSON(_data);

			i18n.dict.setDictionary( _data );

			bug('@ i18n load: ' + (loadTs - beforeLoad) + ' ms. Parse: ' + (Date.now()-loadTs) + ' ms.', 'load' );

			if( typeof _onLoad == 'function' )
				_onLoad({ success: true });
		}

		function onError(){
			console.log('i18n: load error', arguments );
			_onLoad({ success: false });
		}

		Loader.ajax( i18n.opt.dictionaryUrl+'?'+ Game.modelVersion()
			, {
				 success: function( _ds ){ onLoad( _ds, true ); }
				, error: onError
			});
	};

/* dictionary */
	// dictionary
	i18n.dict = (function(){

		// processor
		function dict( _space, _tag, _ds ){
			var message;

			if( _space != null
			&& dict.dictionary[ _space ]
			&& dict.dictionary[ _space ][ _tag ]
			){
				if( _space != null )
					message = dict.dictionary[ _space ][ _tag ].message;

				if( _ds != null )
					for( var key in _ds )
						message = message.replace( '{'+key+'}', _ds[key] );
			} else {
				message = 'i18n: error: {'+_space+'} '+'{'+_tag+'} ';
			}

			if( message == null )
				message = 'i18n: empty message: {'+_space+'} '+'{'+_tag+'} ';

			return message;
		}

		dict.setDictionary = function( _dict ){
			this.dictionary = _dict;
		};

		dict.get = function( _opt, _data ){
			_opt = _opt || {};
			return this( _opt.categoryTag, _opt.tag, _data);
		}

		// decorator. branch by space
		dict.branch = function( _space ){
			return function( _tag, _ds ){
				// Array.prototype.unshift.call( arguments, _space );
				return dict.call( dict, _space, _tag, _ds );
			};
		};

		// find message by tag in one\all category
		dict.find = function( _opt ){
			//
			var msg;
			var stt
			var list = [];

			if( _opt.hasOwnProperty('message') )
				_opt.message = new RegExp(_opt.message, 'gim');

			if( _opt.hasOwnProperty('tag') )
				_opt.tag = new RegExp(_opt.tag, 'gim');

			for( var category in this.dictionary ){
				for( var tag in this.dictionary[category] ){
					msg = this.dictionary[category][tag];
					stt = true;

					if( _opt.hasOwnProperty('message') )
						stt &= _opt.message.test( msg.message );
					if( _opt.hasOwnProperty('tag') )
						stt &= _opt.tag.test( tag );
					if( _opt.hasOwnProperty('code') )
						stt &= (_opt.code == msg.code);

					if( stt )
						list.push({
							  category: category
							, tag: tag
							, code: msg.code
							, message: msg.message
							, obj: this.dictionary[category][tag]
						});
				}
			}

			return list;
		};

		return dict;
	})();

	return i18n;

})();
