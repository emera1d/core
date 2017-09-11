
class CChromeConnect {
    constructor (channel, handlers) {
        this.channel = channel;
        this.handlers = handlers;

        this._init();
    }

    send (...args) {
        this.postMessageHandler(...args);
    }

    _init () {
        if( this.channel == null ) { 
            /* background script */
            this.ports = {};
            chrome.extension.onConnect.addListener(function(port) { this._onConnect(port); }.bind(this));
            this.postMessageHandler = this._postMessage2Ext;
        } else { 
            /* content script */
            this.port = chrome.extension.connect({ 'name': this.channel });
            this.port.onMessage.addListener(function(msg, port) {
                this._onMessage2Ext(msg, port);
            }.bind(this));
            this.postMessageHandler = this._postMessage2Back;
        }
    }

    _onConnect (port) {
        var channel = port.name;

        if( this.ports[channel] === undefined ) {
            this.ports[channel] = [];
        }

        this.ports[channel].push(port);

        port.onDisconnect.addListener(function(port) { this._onDisconnect(port); }.bind(this));
        port.onMessage.addListener(function(msg, port) { this._onMessage2Back(msg, port); }.bind(this));

        if( this.handlers.onConnect !== undefined ) {
            this.handlers.onConnect(channel, port);
        }
    }

    _onDisconnect (port) {
        var channel = port.name;

        this.ports[channel] = this.ports[channel].filter(function(p) {
            return p != port;
        });

        if( this.handlers.onDisconnect !== undefined ) {
            this.handlers.onDisconnect(channel, port);
        }
    }

    _postMessage2Back (name, data) {
        let msg = {
            name: name
        };

        if(data) {
            msg.data = data;
        }

        this.port.postMessage(msg);
    }

    _postMessage2Ext (channel, name, data) {
        let msg = {
            name: name
        };

        if(data) {
            msg.data = data;
        }

        this.ports[channel].forEach(function(port) {
            port.postMessage(msg);
        });
    }

    _onMessage2Ext (msg, port) {
        let method = this.handlers[msg.name];

        if(method) {
            method(msg.data);
        }
    }

    _onMessage2Back (msg, port) {
        let method = this.handlers[msg.name];

        if(method) {
            method(msg.data, port.name);
        }
    }
}
