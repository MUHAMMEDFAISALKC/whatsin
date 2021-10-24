function Channel (name) {
    this.id = ((Math.max(...channels.map(channel => channel.id))+1).toString()).padStart(6,0);
    this.name = name;
    this.favorite = false;
    this.messages = [];
}


const mockChannels = [{
        id: '000001',
        name: "MeetUp",
        favorite: true,
        messages: [],
        latestMessage: latestMessageTime
    },
    {
        id : '000002',
        name : "Octoberfest",
        favorite : true,
        messages: [],
        latestMessage: latestMessageTime
    },
    {
        id : '000003',
        name : "WeatherChannel",
        favorite : false,
        messages: [],
        latestMessage: latestMessageTime
    },
    {
        id : '000004',
        name : "SevenContinents",
        favorite : false,
        messages: [],
        latestMessage: latestMessageTime
    },
    {
        id : '000005',
        name : "Dlc",
        favorite : false,
        messages: [],
        latestMessage: latestMessageTime
    },
    {
        id : '000006',
        name : "pallimukku",
        favorite : true,
        messages: [],
        latestMessage: latestMessageTime
    }
]


function latestMessageTime () {
    // if message exist, dispaly timestamp
    if (!!this.messages.length) {
        const latest = new Date(Math.max(...this.messages.map(message => message.createdOn)));
        // if messages is from yesterday or older, display date , else display time
        if (new Date().getDate() - latest.getDate() > 1) {
            return latest.toLocaleDateString(browserLanguage, {year:"numeric", month:"numeric", day:"numeric"});
        } else {
            return latest.toLocaleTimeString(browserLanguage, {hour:"numeric", minute:"numeric",});
        }
    } else {
        return 'No message';
    }
}







