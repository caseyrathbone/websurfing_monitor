/* contentscript.js */

// Monitor visibility state.
var visible = true;

// Current viewing duration data.
var start = Date.now();
var duration = 0;

// Any time a user navigates to a different tab stop the count and add to total duration.
document.addEventListener("visibilitychange", function(evt) {    
    if (visible) {
        // Returning the page and restart the count.
        duration += Date.now() - start;
    }
    else {
        // Returning to the page and restart the count.
        start = Date.now();
    }
    visible = !visible;
});

// Send notification to backend service of total duration of time spent on page when its closed.
window.onbeforeunload = function updateDurationAndNotifyBackend() {
    // Add final portion of duration on page.
    duration += Date.now() - start;
    
    var webpageVisitEntry = {};
    webpageVisitEntry.url = document.URL;
    webpageVisitEntry.duration = duration;
    
    chrome.runtime.sendMessage(webpageVisitEntry);
}
