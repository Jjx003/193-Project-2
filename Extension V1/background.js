// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

/*
chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
});
*/

var current_url = "None"
var bigport = null;

chrome.runtime.onConnect.addListener(port => {
  console.log("we have a port");
  bigport = port;
  port.onMessage.addListener(msg => {
    console.log("wack");
    port.postMessage({answer: current_url});
  });
});


function run() {
    chrome.tabs.query({'active': true}, function (tabs) {
        if (tabs.length > 0) {
            current_url = tabs[0].url;
           // Send a message to change the text of the popup html 
            if (bigport != null) {
                console.log("wow!");
                port.postMessage({answer: current_url});
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", run);

chrome.tabs.onActivated.addListener( function (changeInfo) {
  console.log("Test?")

    chrome.tabs.query({'active': true}, function (tabs) {
        if (tabs.length > 0) {
            console.log("sending msg");
            current_url = tabs[0].url;
            if (bigport != null) {
                console.log("wow!");
                port.postMessage({answer: current_url});
            }
        }
    });

});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'developer.chrome.com'},
    })
    ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.received)
      //sendResponse({farewell: "goodbye"});
      console.log("handshake");
});
