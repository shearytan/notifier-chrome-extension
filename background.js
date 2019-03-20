chrome.webNavigation.onCompleted.addListener(function(val) {
    if (val.url && val.url.match(/www\.google\.com/)) {
        chrome.browserAction.setBadgeText({text: ''});
        chrome.storage.sync.get("message", function(val) {
            chrome.notifications.create({
                type: 'basic',
                title: 'Be Awesome!',
                iconUrl:  'stay_hydrated.png',
                message: val.message,
                buttons: [
                    {title: 'Got it! :)'}
                ],
                priority: 0
            })
        })
    }
})