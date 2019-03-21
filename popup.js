chrome.runtime.onInstalled.addListener(function() {
    // let currentButton = document.getElementById("onOff");

    // chrome.browserAction.setBadgeText({text: ''});
    // chrome.storage.sync.set({'buttonValue': 'OFF'});
    // chrome.storage.sync.set({'buttonClassName': 'btn btn-outline-danger btn-sm'})

    // currentButton.value = "OFF";
    // currentButton.className = "btn btn-outline-danger btn-sm";
    alert("This is the event")
});

chrome.storage.sync.get("message", function(val) {
    // Check if there 'message' in the user's local storage
    if(!val.message) {
        // Not found: implement this message to the 'message'
        chrome.storage.sync.set({'message': "Let's write something to remind yourself tomorrow..."});
    } else {
        // Found: Use the previous message they type in
        chrome.storage.sync.get("message", function(val) {document.getElementById('quoteListArea').innerHTML = val.message;});
    }
})

/**
 * Alert section
 */

 function setAlert() {
    let now = new Date();
    let day = now.getDate();
    let timestamp = +new Date(now.getFullYear(), now.getMonth(), day, 14, 40, 0, 0);
     
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#125e4c'});
    chrome.storage.sync.set({'buttonValue': 'ON'});
    chrome.storage.sync.set({'buttonClassName': 'btn btn-outline-success btn-sm'})
    chrome.alarms.create('turnOnAlert', {
        when: timestamp
    });
 }

function clearAlert () {
    // set the text on the badge to nothing
    chrome.browserAction.setBadgeText({text: ''});
    chrome.storage.sync.set({'buttonValue': 'OFF'});
    chrome.storage.sync.set({'buttonClassName': 'btn btn-outline-danger btn-sm'})
    // clear the alarm
    chrome.alarms.clearAll();
    window.close();
}

/**
 *  Form Submit section
 */
function formSubmit(e) {
    e.preventDefault();
    message = document.getElementById('textField').value;
    
    document.getElementById('quoteListArea').innerHTML = message;
    chrome.storage.sync.set({'message': message}, function(i) {
        console.log('Saved')
    });
}

function formClear(e) {
    // Just clear out the input area for the form
    // Not doing too much here
     document.getElementById('textField').value = '';
}

window.addEventListener('keypress', function(e) {
    let quote = document.getElementById('quoteListArea').innerHTML;
    let text = document.getElementById('textField').value;
    if(e.keyCode === 13) {
        document.getElementById('quoteListArea').innerHTML = document.getElementById('textField').value;
    }
    chrome.storage.sync.set({'message': text});
});

/**
 *  On and off button visibility
 */
function on_and_off_button_visibility(id) {
    let currentButton = document.getElementById("onOff");
    // clearAlert();
    chrome.storage.sync.get(['buttonValue', 'buttonClassName'], function(val) {
        if(currentButton.value == 'OFF') {
            setAlert();
            currentButton.value = val.buttonValue;
            currentButton.className = val.buttonClassName;
        } else {
            clearAlert();
            currentButton.value = val.buttonValue;
            currentButton.className = val.buttonClassName;
        }
    })
}

/**
 *  Document selectors
 */
document.getElementById('onOff').addEventListener('click', on_and_off_button_visibility); // On and Off button
document.getElementById('submitMessage').addEventListener('click', formSubmit); // Submit button
document.getElementById('clearMessage').addEventListener('click', formClear); // Clear button
