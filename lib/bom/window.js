// left/top		Расстояние от левой/верхней границы окна операционной системы до границы нового окна. Новое окно не может быть создано за границами экрана
// height/width	Высота/ширина в пикселях внутренности нового окна, включая полосы прокрутки, если они есть. Минимальное значение: 100

// yes|no|1|0

// left				The left position of the window. Negative values not allowed
// top				The top position of the window. Negative values not allowed
// width			The width of the window. Min. value is 100
// height			The height of the window. Min. value is 100

// fullscreen		Whether or not to display the browser in full-screen mode. Default is no. A window in full-screen mode must also be in theater mode. IE only
// location			Whether or not to display the address field. Opera only
// menubar			Whether or not to display the menu bar
// status			Whether or not to add a status bar
// titlebar			Whether or not to display the title bar. Ignored unless the calling application is an HTML Application or a trusted dialog box
// toolbar			Whether or not to display the browser toolbar. IE and Firefox only
// scrollbars		Whether or not to display scroll bars. IE, Firefox & Opera only
// resizable		Whether or not the window is resizable. IE only
// directories		Obsolete. Whether or not to add directory buttons. Default is yes. IE only
// channelmode		Whether or not to display the window in theater mode. Default is no. IE only



// onresize – событие изменения размера окна.
// onscroll – событие при прокрутке окна.
// onload – полностью загрузилась страница со всеми ресурсами.
// onfocus/onblur – получение/потеря фокуса.

// window.closed
// window.close()

// win.moveBy(x,y)				Перемещает окно относительно текущего положения на x пикселей вправо и y пикселей вниз. Допускаются отрицательные значения.
// win.moveTo(x,y)				Передвигает окно в заданную координатами x и y точку экрана монитора.
// win.resizeBy(width,height)	Изменяет размер окна на заданную величину width/height (ширина/высота). Допускаются отрицательные значения.
// win.resizeTo(width,height	Изменяет размер окна на заданное значение.



'use strict';

var windowManager = (function(){

	function manager(url, name, params) {
		var wnd = new CWindow(url, name, params);

		wnd.open();

		return wnd;
	}

	function CWindow(url, name, params) {
		if(url) {
			this._url = url;
		}

		if(name) {
			this._name = name;
		}

		if(params) {
			this._params = {};
			this._props.forEach(function(propName) {
				if(params.hasOwnProperty(propName)) {
					this._params[propName] = params[propName];
				}
			}, this);
		}
	}

	CWindow.prototype._DEFAULT_NAME = 'CWindow';

	CWindow.prototype._props = [
		  'left'
		, 'top'
		, 'width'
		, 'height'
		, 'menubar'
		, 'titlebar'
		, 'toolbar'
		, 'location'
		, 'directories'
		, 'status'
		, 'resizable'
		, 'scrollbars'
		, 'fullscreen'
	];

	CWindow.prototype.isClosed = function() {
		return this._wnd.closed;
	};

	CWindow.prototype.open = function() {
		var url = this._url;
		var name = this._name || this._DEFAULT_NAME;
		var params;

		if(this._params) {
			params = this._makeParamString();
		}

		this._wnd = window.open(url, name, params);
	};

	CWindow.prototype.close = function() {
		this._wnd.close();
	};

	CWindow.prototype._makeParamString = function() {
		var list = [];
		var prop;

		for(var key in this._params) {
			prop = (key + '=' + this._params[key]);
			list.push(prop);
		}

		return list.join(',');
	};

	return manager;

})();
