chrome.alarms.onAlarm.addListener(function(val) {
    if(val.name === 'turnOnAlert') {
        chrome.browserAction.setBadgeText({text: 'ON'});
        chrome.storage.sync.get("message", function(val) {
            chrome.notifications.create({
                type: 'basic',
                title: 'Be Awesome!',
                iconUrl:  'stay_hydrated.png',
                message: val.message,
                priority: 0
            })
        })
    }
});
