chrome.storage.sync.get("message", function(val) {
    // Check if there 'message' in the user's local storage
    if(!val.message) {
        // Not found: implement this message to the 'message'
        chrome.storage.sync.set({'message': "Let's write something to remind yourself tomorrow..."});
        chrome.storage.sync.get("message", function(val) {document.getElementById('quoteListArea').innerHTML = val.message;});
    } else {
        // Found: Use the previous message they type in
        chrome.storage.sync.get("message", function(val) {document.getElementById('quoteListArea').innerHTML = val.message;});
    }
})

chrome.storage.sync.set({'buttonOn': '<input type="button" id="buttonOn" class="btn btn-outline-success btn-sm" value="ON" onclick="setAlert()">'});
    chrome.storage.sync.set({'buttonOff': '<input type="button" id="buttonOff" class="btn btn-outline-danger btn-sm" value="OFF" onclick="clearAlert()">'});

    chrome.storage.sync.get(['buttonOn', 'buttonOff'], function(val) {
        document.getElementById('buttonContainerOn').innerHTML = val.buttonOn;
        document.getElementById('buttonContainerOff').innerHTML = val.buttonOff;
    })

/**
 * Alert section
 */
 function setAlert() {
    // When alert has been turned on
    let now = new Date();
    let day = now.getDate();
    let timestamp = +new Date(now.getFullYear(), now.getMonth(), day, 11, 39, 0, 0);

    let currentButton = document.getElementById("buttonContainerOn");
    // chrome.storage.sync.set({'buttonOn': '<input type="button" id="buttonOn" class="btn btn-outline-success active btn-sm" value="ON" onclick="seAlert()">'});
    // chrome.storage.sync.set({'buttonOff': '<input type="button" id="buttonOff" class="btn btn-outline-danger btn-sm" value="OFF" onclick="clearAlert()">'})
     
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.browserAction.setBadgeBackgroundColor({color: '#125e4c'});
    // Get the stored value and change it from OFF to ON
    chrome.alarms.create('turnOnAlert', {
        when: timestamp
    });
    
 }

function clearAlert () {
    // let currentButton = document.getElementById("buttonOff");
  
    // set the text on the badge to nothing
    chrome.browserAction.setBadgeText({text: ''});
    // chrome.storage.sync.set({'buttonValue': 'OFF'});
    // chrome.storage.sync.set({'buttonClassName': 'btn btn-outline-danger btn-sm'})

    currentButton.value = "OFF";
    currentButton.className = 'btn btn-outline-danger active btn-sm';
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

function buttonActive() {
    chrome.browserAction.getBadgeText({}, function(val) {
        console.log(val)
    })
}

/**
 *  Document selectors
 */
document.getElementById('buttonOn').addEventListener('click',  setAlert)
document.getElementById('buttonOff').addEventListener('click', clearAlert); // On and Off button
document.getElementById('submitMessage').addEventListener('click', formSubmit); // Submit button
document.getElementById('clearMessage').addEventListener('click', formClear); // Clear button
