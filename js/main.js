// start the external action 
// console log s app is live
function init() {
    console.log("App is initialized");
    getChannels();
    getMessages();
    loadMessagesIntoChannel();
    displayChannels();
    //loadEmojis();
    document.getElementById("send-button").addEventListener("click", sendMessage);
    /*document
        .getElementById("emoticon-button")
        .addEventListener("click", toggleEmojiArea);
    */
    /*document
        .getElementById("close-emoticon-button")
        .addEventListener("click", toggleEmojiArea);
    */
}

console.log("App is alive");

let selectedChannel;

function switchChannel(selectedChannelID) {
    const channels = mockChannels;
    if (!!selectedChannel) {
        document.getElementById(selectedChannel.id).classList.remove("selected");
    }
    document.getElementById(selectedChannelID).classList.add("selected");

    channels.forEach((channel) => {
        if (channel.id === selectedChannelID) {
            selectedChannel = channel;
        }
    });
    showHeader();
    showMessages();
}

function showHeader() {
    document.getElementById('channelName').innerHTML = selectedChannel.name;
    document.getElementById('favorite-button').innerHTML = (selectedChannel.favorite) ? "favorite" : "favorite_border";
}

//function showMessages() {
//    document.getElementById('chat-area').innerHTML = selectedChannel.messages;
//}

function showMessages() {
    reset();
    const messages = mockMessages;
    messages.forEach((message) => {
        if (selectedChannel.id === message.channel) {
            let currentMessageHtmlString;
            if (message.own) {
                currentMessageHtmlString =
                    `<div class="message-wrapper">
                        <div class="message-content">
                            <p>` + message.text + `</p>
                        </div>
                        <i class="material-icons">account_circle</i>
                    </div>
                    <span class="timestamp">` + message.createdOn + `</span>`
                //console.log(currentMessageHtmlString);
                $('<div class="message outgoing-message">').html(currentMessageHtmlString).appendTo('#chat-area');
            } else {
                currentMessageHtmlString =
                    `<div class="message-wrapper">
                        <i class="material-icons">account_circle</i>
                        <div class="message-content">
                            <h3>` + message.createdBy + `</h3>
                            <p>` + message.text + `</p>
                        </div>
                    </div>
                    <span class="timestamp">` + message.createdOn + `</span>`
                //console.log(currentMessageHtmlString);
                $('<div class="message incoming-message">').html(currentMessageHtmlString).appendTo('#chat-area');
            }
        } else {
            console.log("No more messages")
        }
    });
}
function reset() {
    $('#chat-area').empty();
}




function sendMessage() {
    const 
    const messagetext = document.getElementById("message-input").value;
    let date = new Date();
    let time = date.getDate()+'/'+ (date.getMonth()+ 1) +'/'+date.getFullYear();

    if (!!selectedChannel) {
        if (!!messagetext) {
            const message = {createdBy: , "Faisal", createdOn: time, channel: selectedChannel.id, own: true, text: messagetext};
            console.log("New message: ", message);
            mockMessages.push(message);
            //console.log("The following message was send: " +messageText); 
            //$("<div class='message outgoing-message'>").html(messageString).appendTo("#chat-area"); 
            document.getElementById("message-input").value = "";
            showMessages();
            displayChannels();
        } else {
            return;
        }
    } else {
        console.log("please select channel");
        return;
    } 
}

function getChannels() {
    const channels = mockChannels;
}

function getMessages() {
    const messages = mockMessages;
}
function displayChannels() {
    const favoriteList = document.getElementById('favorite-channels');
    const regularList = document.getElementById('regular-channels');
    favoriteList.innerHTML = "";
    regularList.innerHTML = "";

    const channels = mockChannels;
    channels.forEach((channel) => {
            const currentChannelHtmlString =
                `    <li id="` +
                channel.id + 
                `" onclick="switchChannel(this.id);">
                <i class="material-icons">group</i>
                <span class="channel-name">` +
                channel.name +
                `</span>
                <span class="timestamp">` +
                
                channel.latestMessage + 
                `</span> 
                </li>`;
            if (channel.favorite) {
                favoriteList.innerHTML += currentChannelHtmlString;
            } else {
                regularList.innerHTML += currentChannelHtmlString;
            }
    });
}

function loadMessagesIntoChannel() {
    const channels = mockChannels;
    channels.forEach((channel) => {
        const messages = mockMessages;
        messages.forEach((message) => {
            if (channel.id === message.channel) {
                channel.messages.push(message);
            } else {
                return false;
            }

        });
    }); 
}

