/*
ClipboardEvent.clipboardData

The Clipboard.clipboardData read-only property is a DataTransfer object the data affected by the user-initialed cut, copy, or paste operation, along with its MIME type.

See also
Copy-related events: copy, cut, paste
The ClipboardEvent interface it belongs to.

dropEffect: "none"
effectAllowed: "uninitialized"
files: FileList
items: DataTransferItemList
types: Array

*/


var events = ['copy', 'cut', 'paste'];

document.body.addEventListener('paste', function(e) {
	debugger;
	console.log(e.clipboardData);
});
