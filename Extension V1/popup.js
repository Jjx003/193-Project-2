function listen() {
console.log("Wtf");

    let header = document.getElementById("Display");


    console.log("inejcted");

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        console.log("wack");
        if (request.indexOf("update_url")) {
            console.log("recieved");
            header.innerHTML = request["update_url"];
            sendResponse({received:"1"});
        } else {
            console.log("asdsadasdsdsd");
        }
    });

chrome.runtime.onConnect.addListener(function(port) {
    console.log("reee");
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
      console.log("OMG A DOUBLE RAINBOW");
      if (msg.indexOf("answer")) {
          header.innerText = msg.answer;
      }
  });
});


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //var timer = new chrome.Interval();
        //timer.start();

        var port = chrome.tabs.connect(tabs[0].id);
        port.onMessage.addListener(function(msg) {
                console.log('recieve');
                header.innerText = msg.answer;
                });

        port.postMessage({a:"1"});

        }); 


};



document.addEventListener("DOMContentLoaded", function(event) {
    listen();
    console.log("hhoho");
})
//});


