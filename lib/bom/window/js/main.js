

function view(line) {
	document.querySelector('#view').innerHTML = line;
}

function viewNS(name) {
	var html = [],
		tmpl = '<div class="cell pname">{name}:</div><div class="cell pvalue">{value}</div><br>';

	if(name in window) {
		html.push(name+':', '<p>');

		for(var key in window[name])
			html.push(tpl.parse(tmpl, {
				name: key,
				value: window[name][key]
			}));
	}

	view(html.join(''))
}

function main() {
	dom.bind(document.body, '.viewer', 'click', function(e, el) {
		viewNS(el.getAttribute('data-ns'));
	});
}

function errorHTML(er) {
	var props = [
		  'name'
		, 'message'
		, 'stack'
	]
	, html = [];

	for(var i=0;i<props.length;i++) {
		html.push(props[i] + ' ::  ' + er[ props[i]]);
	}

	return html.join('<br>');
}

try {
	main();
} catch (er) {
	view( errorHTML(er) );
}
