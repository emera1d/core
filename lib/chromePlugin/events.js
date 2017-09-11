// Sending a request from a content script looks like this:
chrome.runtime.sendMessage({
    greeting: 'hello'
}, function(response) {
    console.log(response.farewell);
});

// Sending a request from the extension to a content script looks very similar,
// except that you need to specify which tab to send it to.
// This example demonstrates sending a message to the content script in the selected tab.
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        greeting: 'hello'
    }, function(response) {
        console.log(response.farewell);
    });
});

// On the receiving end, you need to set up an runtime.onMessage event listener to handle the message.
// This looks the same from a content script or extension page.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (sender.tab) {
        console.log('from a content script:' + sender.tab.url);
    } else {
        console.log('from the extension');
    }

    if (request.greeting == 'hello') {
        sendResponse({
            farewell: 'goodbye'
        });
    }

    // If you want to asynchronously use sendResponse, add return true; to the onMessage event handler.
    return true;
});



// Here is how you open a channel from a content script, and send and listen for messages:
var port = chrome.runtime.connect({
    name: "knockknock"
});
port.postMessage({
    joke: "Knock knock"
});
port.onMessage.addListener(function(msg) {
    if (msg.question == "Who's there?")
        port.postMessage({
            answer: "Madame"
        });
    else if (msg.question == "Madame who?")
        port.postMessage({
            answer: "Madame... Bovary"
        });
});


//Here's what it looks like to respond to incoming connections:
chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "knockknock");

    port.onMessage.addListener(function(msg) {
        if (msg.joke == "Knock knock")
            port.postMessage({
                question: "Who's there?"
            });
        else if (msg.answer == "Madame")
            port.postMessage({
                question: "Madame who?"
            });
        else if (msg.answer == "Madame... Bovary")
            port.postMessage({
                question: "I don't get it."
            });
    });
});



'use strict';


var chm = (function(){

    function chm(id){
        
    };

    chm.exec = function(code) {
        chrome.tabs.executeScript(null, {code: code}/*, function(res) {}*/);
    }

    chm.cookie = function(fn) {
        chrome.tabs.executeScript(null, {code:'document.cookie;'}, function(res) {
            fn(cookie.parse(res[0]));
        });
    };

    chm.on = function(node, eventname, fn) {
        return node.addEventListener(eventname, fn, false);
    }

    return chm;

})();
