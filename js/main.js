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
    //document.getElementById('emoji-list').addEventListener('click', copyEmojiToinput);
}





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
    document.getElementsByTagName('h1')[1].innerHTML = selectedChannel.name;
    //document.getElementById('channelName').
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
                    <span class="timestamp">` + message.createdOn() + `</span>`
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
                    <span class="timestamp">` + message.createdOn() + `</span>`
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

function Dates(dd, MM, yyyy, hh, mm,ss) {
    this.dd = dd;
    this.MM = MM,
    this.yyyy = yyyy;
    this.hh = hh;
    this.mm = mm;
    this.ss = ss;
    this.fulldates = function () {
        return this.dd+ '/' + this.MM + '/' + this.yyyy + ' ' + this.hh + ':' + this.mm + ':' + this.ss;
    } 
}



function sendMessage() {
    const messagetext = document.getElementById("message-input").value;
    let d = new Date();
    let date = new Dates(d.getDate(), d.getMonth() + 1, d.getFullYear(), d.getHours(), d.getMinutes(), d.getSeconds());
    let time = function () {
        return date.fulldates();
    }

    if (!!selectedChannel) {
        if (!!messagetext) {
            const message = {createdBy: "Faisal", createdOn: time, channel: selectedChannel.id, own: true, text: messagetext};
            console.log("New message: ");
            mockMessages.push(message);
            //console.log("The following message was send: " +messageText); 
            //$("<div class='message outgoing-message'>").html(messageString).appendTo("#chat-area"); 
            document.getElementById("message-input").value = "";
            showMessages();
            displayChannels();
        } else {
            document.getElementById("message-input").value = "";
            return;
        }
    } else {
        document.getElementById("message-input").value = "";
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
let i = 0;
function loadEmojis() {
    emojis.forEach((emoji) => {
        i++;
        $(`<td id="emojiButton`+i+`" onclick="copyEmojiToinput(this.id)">`).html(emoji).appendTo('#emoji-list');
    });
} 

function toggleEmojiArea () {
    //$('#emoji-area').toggle();
    var emojiField = document.getElementById('emoji-area');
    var inputArea = document.getElementById('input-area');
    var chatArea = document.getElementById('chat-area')
    if (emojiField.style.display === 'none' ) {
        emojiField.style.display = 'flex';
        inputArea.style.bottom = '153px';
        inputArea.style.borderBottom = '1px solid #aaaaaa';
        chatArea.style.height = 'calc(100vh - 284px)';
    } else {
        emojiField.style.display = 'none';
        inputArea.style.bottom = '0px';
        chatArea.style.height = 'calc(100vh - 132px)';
    }
}
function copyEmojiToinput(selectedEmojiID) {
    let emojiText = document.getElementById(selectedEmojiID).innerHTML;
    let writtenText = document.getElementById('message-input').value;
    $('#message-input').val(writtenText + emojiText);
    //$(selectedEmojiID).clone().append('#message-input');
    //console.log(writtenText);
}
