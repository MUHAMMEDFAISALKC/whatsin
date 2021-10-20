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
const mockMessages = [ {
    createdBy: "Jack Blue",
    createdOn: function () { 
        let value = new Dates(08, 12, 2018, 17, 24, 00);
        return value.fulldates();
    },
    channel: "000001",
    own: false,
    text: "how are you guys!"
    },

    {
    createdBy: "Jafer",
    createdOn: function () { 
        let value = new Dates(09, 12, 2018, 18, 24, 00);
        return value.fulldates();
    },
    channel: "000002",
    own: false,
    text: "what about you!"
    },

    {
    createdBy: "Sajid",
    createdOn: function () { 
        let value = new Dates(10, 12, 2018, 19, 24, 00);
        return value.fulldates();
    },
    channel: "000001",
    own: false,
    text: "well guys!"
    },

    {
    createdBy: "Faisal",
    createdOn: function () { 
        let value = new Dates(11, 12, 2018, 20, 24, 00);
        return value.fulldates();
    },
    channel: "000001",
    own: true,
    text: "fine guys!"
    },

    {
    createdBy: "Javid",
    createdOn: function () { 
        let value = new Dates(12, 12, 2018, 22, 24, 00);
        return value.fulldates();
    },
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

