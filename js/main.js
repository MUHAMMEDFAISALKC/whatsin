// start the external action 
// console log s app is live
console.log("App is alive");

let channels = [];
let messages = [];

// create global variable for the currently selected channel.
let selectedChannel;

// get browser language for formating of timestamp
const browserLanguage = navigator.language || navigator.userLanguage;

window.initialize = function () {
    console.log("App is initialized");
    getChannels();
    getMessages();
    loadMessagesIntoChannel();
    displayChannels();
    loadEmojis();
    document.getElementById("send-button").addEventListener("click", sendMessage);
    document.getElementById("emoticon-button").addEventListener("click", toggleEmojiArea);
    document.getElementById("close-emoticon-button").addEventListener("click", toggleEmojiArea);
    document.getElementById("fab").addEventListener("click", toggleCreateNewChannel);
    document.getElementById("closeAddNewChannel").addEventListener("click", toggleCreateNewChannel);
    document.getElementById("doneAddNewChannel").addEventListener("click", createNewChannel);

};

// ----------------------- Channels -----------------------
// get existing channels from mock file or database
function getChannels() {
    channels = mockChannels;
}
// get existing messages from mock file or database
function getMessages() {
    messages = mockMessages;
}
//load existing messages into respective channel
function loadMessagesIntoChannel() {
    channels.forEach((channel) => {
        messages.forEach((message) => {
            if ( message.channel === channel.id ) {
                channel.messages.push(message);
            } else {
                return false;
            }
        });
    }); 
}

//display channels in channel area
function displayChannels() {
    const favoriteList = document.getElementById('favorite-channels');
    const regularList = document.getElementById('regular-channels');
    favoriteList.innerHTML = "";
    regularList.innerHTML = "";

    channels.forEach((channel) => {
        const currentChannelHtmlString =
            `<li id="` + channel.id + `" onclick="switchChannel(this.id);">
                <i class="material-icons">group</i>
                <span class="channel-name">` + channel.name + `</span>
                <span class="timestamp">` + channel.latestMessage() + `</span> 
            </li>`;
        if (channel.favorite) {
            favoriteList.innerHTML += currentChannelHtmlString;
        } else {
            regularList.innerHTML += currentChannelHtmlString;
        }
    });
    // always add selected class to current channel
    if (!!selectedChannel) {
        document.getElementById(selectedChannel.id).classList.add("selected");
    }
}
/*
* Switches channel
* @param {string} selectedChannelID - ID of channel to switch to.
*/

function switchChannel(selectedChannelID) {
    console.log("selected channel with id: " + selectedChannelID)
    if (!!selectedChannel) {
        document.getElementById(selectedChannel.id).classList.remove("selected");
    }
    document.getElementById(selectedChannelID).classList.add("selected");

    channels.forEach((channel) => {
        if (channel.id === selectedChannelID) {
            selectedChannel = channel;
        }
    });
    document.getElementById("message-input").disabled = false;
    document.getElementById("message-input").placeholder = 'type your message here';
    showHeader();
    showMessages();
}

// changes header name and favorite button
function showHeader() {
    document.getElementsByTagName('h1')[1].innerHTML = selectedChannel.name;
    document.getElementById('favorite-button').innerHTML = (selectedChannel.favorite) ? "favorite" : "favorite_border";
}

/*
* channel Constructor Fuction 
* @param {string} name- name of channel
*/
function Channel (name) {
    //this.id = ((Math.max(...channels.map(channel => channel.id))+1).toString()).padStart(6,0);
    this.id = Math.random().toString(36).substr(2, 10);
    this.name = name;
    this.favorite = false;
    this.messages = [];
}

// Object method that return the date of latest message (to display in channel)
Channel.prototype.latestMessage = function () {
    // if message exist, dispaly timestamp
    if (!!this.messages.length) {
        const latest = new Date(Math.max(...this.messages.map(message => message.createdOn)));
        // if messages is from yesterday or older, display date , else display time
        if (new Date().getDate() - latest.getDate() > 1) {
            return latest.toLocaleDateString(browserLanguage, {year:"numeric", month:"numeric", day:"numeric"});
        } else {
            return latest.toLocaleTimeString(browserLanguage, {hour:"numeric", minute:"numeric"});
        }
    } else {
        return 'No Messages';
    }
}

function toggleCreateNewChannel() {
    var addChannelArea = document.getElementById('addChannelArea');
    var newChannel= document.getElementById("newChannel");

    if (addChannelArea.style.display === 'none') {
        addChannelArea.style.display = 'flex'
        newChannel.focus();
    } else if (addChannelArea.style.display == 'flex') {
        addChannelArea.style.display = 'none'
    }
}




function createNewChannel() {
    var newChannel = document.getElementById("newChannel").value;
    if (!!newChannel) {
        const name = newChannel;
        const channel = new Channel(name);
        channels.push(channel);
        document.getElementById("newChannel").value = "";
        toggleCreateNewChannel()
        sortNewChannels(channel);
        selectedChannel = channel;
        displayChannels();
        switchChannel(channel.id);
    } else {
        alert('please give channel name');
    }
}

document.getElementById('newChannel').onkeydown = function(e) {
    if(e.keyCode === 13) {
        createNewChannel();
    }
};


function sortNewChannels(newChannel) {
    //remove first
    channels = channels.filter(channel => channel.id !== newChannel.id);
    // insert
    channels.unshift(newChannel);
}

function toggleFavorite() {
    if (selectedChannel.favorite === true) {
        selectedChannel.favorite = false;
    } else {
        selectedChannel.favorite = true;
    }
    displayChannels();
    switchChannel(selectedChannel.id);
    console.log(selectedChannel.favorite);
}

//simple sort fuction: insert current channel at [0] in channels array and call it if new message is sent
function sortChannels() {
    //remove first
    channels = channels.filter(channel => channel.id !== selectedChannel.id);
    // insert
    channels.unshift(selectedChannel);
}



// ----------------------- Messages -------------------
/* Message Constructor Function
* @param {string} user - Name of sender
* @param {boolean} own - Own {outgoing} message or incoming
* @param {string} text - Message text
* @param {string} channel - ID of channel in which message is sent
*/

function Message (user, channel, own, text ) {
    this.createdBy = user;
    this.createdOn = new Date(Date.now());
    this.channel = channel;
    this.own = own;
    this.text = text;
}

// Object method that returns the if message is from yesterday or older
Message.prototype.yesterdayOrOlder = function () {
    return new Date().getDate() - this.createdOn.getDate() >1;
}

// Event Listener : New message will be sent if user clicks send button or press enter.
// send button is grayed out if there is no input provided

document.getElementById('message-input').onkeyup = function(e){
    if (!!document.getElementById('message-input').value) {
        document.getElementById('send-button').style.color = '#00838f';
    } else {
        document.getElementById('send-button').style.color = '#00838f54';
    }
    if (e.keyCode == 13) {
        sendMessage();
    }
};

//function showMessages() {
//    document.getElementById('chat-area').innerHTML = selectedChannel.messages;
//}

function sendMessage() {
    const text = document.getElementById("message-input").value;
    if (!!selectedChannel) {
        if (!!text) {
            const createdBy = "Faisal";
            const channel = selectedChannel.id;
            const own = true;
            const message = new Message(createdBy, channel, own, text);
            console.log("New message send");
            selectedChannel.messages.push(message);
            //console.log("The following message was send: " +messageText); 
            //$("<div class='message outgoing-message'>").html(messageString).appendTo("#chat-area"); 
            document.getElementById("message-input").value = "";
            document.getElementById('send-button').style.color = "#00838f54";
            showMessages();
            sortChannels();
            displayChannels();
            receiveEchoMessage();
        } else {
            document.getElementById("message-input").value = "";
            return;
        }
    } else {
        document.getElementById("message-input").value = '';
        console.log("please select channel");
        return;
    } 
}

function showMessages() {
    const chatArea = document.getElementById('chat-area');
    chatArea.innerHTML = '';
    selectedChannel.messages.forEach((message) => {
        if (!!selectedChannel.messages.length) {
            // if messages are older than 24 hours, display full date
            let messageTime;
            if (message.yesterdayOrOlder()) {
                messageTime = message.createdOn.toLocaleTimeString(browserLanguage, {year:'numeric', month:'numeric', day:'numeric', hour:'numeric', minute:'numeric'});
            } else {
                messageTime = message.createdOn.toLocaleTimeString(browserLanguage, {hour:'numeric', minute:'numeric'});
            }
            let currentMessageHtmlString;
            if (message.own) {
                if(typeof message.text == 'object') {
                    var image = document.createElement("img");
                    image.style.width = '200px';
                    image.style.height = '300px';
                    image.setAttribute("type", "image/png");
                    currentMessageHtmlString1 =
                    `<div class="message outgoing-message">
                        <div class="message-wrapper">
                            <div class="message-content">
                            <img style="width:200px; height:auto;" src="/Users/MUHAMMED%20FAISAL%20KC/Documents/GitHub/whatsin/upload/gallery/`+ message.text.fname +`"/>
                            </div>
                            <i class="material-icons">account_circle</i>
                        </div>
                        <span class="timestamp">` + messageTime+ `</span>
                    </div>`
                    chatArea.innerHTML+= currentMessageHtmlString1;
                    console.log(currentMessageHtmlString1)
                    //$('#chat-area').append(currentMessageHtmlString1);
                } else {
                    currentMessageHtmlString =
                        `<div class="message outgoing-message">
                            <div class="message-wrapper">
                                <div class="message-content">
                                    <p>` + message.text + `</p>
                                </div>
                                <i class="material-icons">account_circle</i>
                            </div>
                            <span class="timestamp">` + messageTime+ `</span>
                        </div>`
                    chatArea.innerHTML += currentMessageHtmlString;
                }
            } else {
                currentMessageHtmlString =
                    `<div class="message incoming-message">
                        <div class="message-wrapper">
                            <i class="material-icons">account_circle</i>
                            <div class="message-content">
                                <h3>` + message.createdBy + `</h3>
                                <p>` + message.text + `</p>
                            </div>
                        </div>
                        <span class="timestamp">` + messageTime + `</span>
                    </div>`
                chatArea.innerHTML += currentMessageHtmlString;
            }
            
        }
    });
    chatArea.scrollTop = chatArea.scrollHeight;
    //update timestamp in channel area
    document.getElementById(selectedChannel.id).querySelector('.timestamp').innerHTML = selectedChannel.latestMessage();
}
// now it is not used
function reset(area) {
    $(area).empty();
}

// get an echo message 
function receiveEchoMessage() {
    if (!!selectedChannel) {
        const createdBy = 'Lorenz';
        const channel = selectedChannel.id;
        const own = false;
        const text = 'You wrote: ' + selectedChannel.messages.slice(-1)[0].text;
        const message = new Message(createdBy, channel, own, text);
        selectedChannel.messages.push(message);
        // set timout for a more natural response time
        setTimeout(showMessages, 1500);
    }
}

// ----------------------------- Emojis --------------------------
let i = 0;
function loadEmojis() {
    emojis.forEach((emoji) => {
        i++;
        $(`<td id="emojiButton`+i+`" onclick="copyEmojiToinput(this.id)">`).html(emoji).appendTo('#emoji-list');
    });
} 

// pop up emoji area and pop out
function toggleEmojiArea () {
    //$('#emoji-area').toggle();
    var emojiArea = document.getElementById('emoji-area');
    var inputArea = document.getElementById('input-area');
    var chatArea = document.getElementById('chat-area')
    if (emojiArea.style.display === 'none' ) {
        emojiArea.style.display = 'flex';
        inputArea.style.bottom = '153px';
        inputArea.style.borderBottom = '1px solid #aaaaaa';
        chatArea.style.height = 'calc(100vh - 284px)';
        chatArea.scrollTop = chatArea.scrollHeight;
    } else {
        emojiArea.style.display = 'none';
        inputArea.style.bottom = '0px';
        chatArea.style.height = 'calc(100vh - 132px)';
    }
}

// copy clicked emojis to input field 
function copyEmojiToinput(selectedEmojiID) {
    let emojiText = document.getElementById(selectedEmojiID).innerHTML;
    let writtenText = document.getElementById('message-input').value;
    $('#message-input').val(writtenText + emojiText);
}

// focus input field when click on emoji
document.getElementById('emoji-list').onmouseup = function(){
    document.getElementById('send-button').style.color = '#00838f';
    document.getElementById('message-input').focus();
};

// ------------------ Attach images and files ------------------ 

// to display and disappear attach area when click on attach file button
function toggleAttachArea() {
    let attachArea = document.getElementById('attach-area');
    if (attachArea.style.display === 'none') {
        attachArea.style.display = 'flex';
        toggleEmojiArea()
    } else {
        attachArea.style.display = 'none';
    }
}

document.getElementById('attach-button').addEventListener('click', toggleAttachArea);
// to open image folder
//document.getElementById('gallery-button').addEventListener("click", getFile);

function getFile() {
    document.getElementById('get-file').click();
}

//document.getElementById('get-file').addEventListener('onchange', loadFileToChatInput)





function loadFileToChatInput() {
    var x = document.getElementById('get-file');
    let attachArea = document.getElementById('attach-area');
    if (!!x.files.length) {
        console.log('file selected')
        const createdBy = "Faisal";
        const channel = selectedChannel.id;
        const own = true;
        for (var i = 0; i < x.files.length; i++) {
            var xttp = new XMLHttpRequest();
            let media = x.files[i];
            let formData = new FormData();
            let text = media.name;
            //var clone = 
            var targetl = "/upload/gallery/";
            formData.append('media', media);
            xttp.open("POST", targetl);
            xttp.setRequestHeader("Content-Type", "multipart/form-data");
            xttp.send(formData);
            console.log(formData);
            //('/Users/MUHAMMED%20FAISAL%20KC/Documents/GitHub/whatsin/upload/gallery/',
            
            //image.src = URL.createObjectURL(event.target.files[i]);
            console.log(media.slice(0, media.size, media.type));
            console.log(text);
            const message = new Message(createdBy, channel, own, text);
            /*
            selectedChannel.messages.push(message);
            console.log(image.src);
            attachArea.style.display = 'none';
            showMessages();
            sortChannels();
            displayChannels();
            */
            //chatArea.innerHTML+= `<img src="`+filePath+`">`;
        }
    } else {
        console.log('file not selected');
        /*
        var nofile = 'no files selected';
        $('#message-input') .val(nofile);  
        */
    }
}

function loadCamera() {
    let chatArea = document.getElementById('chat-area');
    var front = false;
    var video = document.createElement('video');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted','');
    video.style.width = '300px';
    video.style.height = '300px';
    video.style.alignItems = 'right';
    chatArea.append(video);
    function frontCam() { front = !front; };
    frontCam();
    var constraints = { video: {facingMode: (front? "user" : "environment")}};
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) { 
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
    })

    .catch(function(err) {console.log(err.name + ": " + err.message); })
}
//document.getElementById('camera-button').addEventListener("click", loadCamera);
