/* background.js */

// Create a simple JSON object to retain webpage visits and durations.
var dataBundle = {};

// Listen for message from contentscript.js
/*
    {
        url: "<document.url>",
        duration: "<milliseconds>"
    }
*/

chrome.runtime.onMessage.addListener(function messageHandler(payload, sender, senderResp) {
    console.dir(payload);
    dataBundle.entries = dataBundle.entries || [];
    dataBundle["entries"].push(payload);
});

// Push data bundle once every 15 minutes to web service.
setInterval(sendDataToServer, 15*60*1000);

function sendDataToServer() {
    var uploadRequest = new XMLHttpRequest();
    uploadRequest.open(
        "POST", // Method
        "http://localhost:8080/myMonitoringService", // URL
        true // Async
    );
    
    uploadRequest.onreadystatechange = function() {
       if (uploadRequest.status == "200" && uploadRequest.readyState == uploadRequest.DONE) {
           // Data uploaded, go ahead and wipe local duplicates.
           dataBundle = {};
       }
    };
    
    uploadRequest.send(JSON.stringify(dataBundle)); 
}

/* Mock data...
function jsonBrowsingData() {
    var sampleData = {};
    sampleData.entries = [];
    sampleData.entries.add({ url: "digg.com", duration: "1000"});
    sampleData.entries.add({ url: "gmail.com", duration: "2000"});
    sampleData.entries.add({ url: "steepandcheap.com", duration: "3000"});
    return sampleData;
}
*/