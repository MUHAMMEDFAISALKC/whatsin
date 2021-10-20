const mockMessages = [ {
    createdBy: "Jack Blue",
    createdOn: new Date('December 08, 2018 17:24:00'),
    channel: "000001",
    own: false,
    text: "how are you guys!"
    },

    {
    createdBy: "Jafer",
    createdOn: new Date('December 09, 2018 18:24:00'),
    channel: "000002",
    own: false,
    text: "what about you!"
    },

    {
    createdBy: "Sajid",
    createdOn: new Date('December 10, 2018 19:24:00'),
    channel: "000001",
    own: false,
    text: "well guys!"
    },

    {
    createdBy: "Faisal",
    createdOn: new Date('December 11, 2018 20:24:00'),
    channel: "000001",
    own: true,
    text: "fine guys!"
    },

    {
    createdBy: "Javid",
    createdOn: new Date('December 12, 2018 22:24:00'),
    channel: "000003",
    own: false,
    text: "i think everyone feeling good!"
    }
];

function Message (createdBy, createdOn, channel, own, text ) {
    this.createdBy = createdBy;
    this.createdOn = createdOn;
    this.channel = channel;
    this.own = own;
    this.text = text;
}