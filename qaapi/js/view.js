'use strict';

var view = (function() {

	function view() {

	};


	view.init = function() {
		tpl.load(/<!--@([A-z0-9_]+)@-->/gm, dom('__template').innerHTML);

		dom('htmlbody').innerHTML = '';

		qa.setMeta(qa_meta);

		this.draw();
		this.bindUI();

		this.redrawParams();

		chm.cookie(function(ck) {
			if(ck.aid)dom('user_id').value = ck.aid;
		});
	};

	view.draw = function() {
		dom('htmlbody').innerHTML = tpl.get('body');

		this.fillMethods();
	};

	view.bindUI = function() {
		var   qa_form = dom('qa_form')
			, method = dom('qa_method')
			, list = dom('method_list')
			, keyup_t= timer(function() { view.setDataList(method.value); });


		dom.on(qa_form, 'submit', function(ev){
			view.request();
			ev.preventDefault();
			return false;
		});

		dom.on(qa_form, 'keydown', function(ev){
			if(ev.keyCode == 27 && ev.ctrlKey)
				view.clearParams();
		});

		dom.bind(qa_form, '.inp_val', 'dblclick', function(e) {
			var name=e.el.getAttribute('ds-cookie');

			if(name)
				chm.cookie(function(ck) {
					if(name in ck) e.el.value=ck[name];
				});
		});

		dom.on(list, 'change', function() {
			method.value = list.value;
			view.redrawParams();
		});

		dom.on(method, 'keydown', function(ev){
			if(ev.keyCode == 13 ) {
				view.redrawParams();
				ev.preventDefault();
				return false;
			}
		});

		dom.on(method, 'keyup', keyup_t);
	};

	// view.setDataList = function(line) {
	// 	var frag = document.createDocumentFragment()
	// 		, dl = dom('method_data_list')
	// 		, list = qa.find(line);

	// 	dl.innerHTML = '';

	// 	list.map(function(_item) {
	// 		var opt = document.createElement('option');
	// 		opt.setAttribute('value', _item );
	// 		opt.setAttribute('label', _item );

	// 		frag.appendChild( opt );
	// 	});

	// 	dl.appendChild(frag);
	// };

	//
	view.redrawParams = function(name) {
		var name = name || dom('qa_method').value
			, params
			, tmpl
			, list

		if(name=='') return;

		params = qa.getParams(name);
		tmpl = tpl.get('prop_item');
		list = dom('prop_list');

		list.innerHTML = '';

		if(params)
			for(var i=0;i<params.length;i++) {
				list.innerHTML += tpl.parse(tmpl, params[i]);
			}
	};

	view.clearParams = function() {
		var els = dom.qsa('.inp_val', dom('qa_form'));
		for(var i=0;i<els.length;i++) {
			els[i].value = '';
		}
	}

	view.getParams = function() {
		var prm = {}
			, els = dom.qsa('.inp_val', dom('qa_form'));

		for(var i=0;i<els.length;i++) {
			if(els[i].value) prm[els[i].name] = els[i].value;
		}

		return prm;
	};

	view.fillMethods = function() {
		var list = qa.getList()
			, el = dom('method_list');

		list.map(function(item) {
			this.innerHTML += tpl.make('simple_option', {val: item});
		}, el);

	};

	view.request = function() {
		var url = dom('qa_hostname').value + '/' + dom('qa_method').value;
		
		qa.request(url, this.getParams());
	};

	return view;

})();
