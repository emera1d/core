
var CFileReader = function() {

};

CFileReader.prototype.read = function(file, callback) {
	if(!this._reader) {
		this._reader = new FileReader();

		this._reader.onload  = this._onRead.bind(this, true);
		this._reader.onabort = this._onRead.bind(this, false);
		this._reader.onerror = this._onRead.bind(this, false);
	}

	this._file = file;
	this._callback = callback;

	this._reader.readAsText(file);

	return this;
};


CFileReader.prototype.getResult = function() {
	return this._reader.result;
};

CFileReader.prototype._onRead = function(success) {
	this._callback(success);
};
