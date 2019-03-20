chrome.alarms.onAlarm.addListener(function() {
    chrome.browserAction.setBadgeText({text: ''});
    chrome.storage.sync.get("message", function(val) {
        chrome.notifications.create({
            type: 'basic',
            title: 'Be Awesome!',
            iconUrl:  'stay_hydrated.png',
            message: val.message,
            buttons: [
                {title: 'Remind me tomorrow :)'}
            ],
            priority: 0
        })
    })
    
});

chrome.webNavigation.onCompleted.addListener(function(val) {
    if (val.url && val.url.match(/www\.google\.com/)) {
        console.log("This is the google chrome: ", val)
    }
})