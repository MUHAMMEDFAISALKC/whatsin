const mockMessages = [ {
    createdBy: "Jack Blue",
    createdOn: new Date('10-01-2021 01:1:53'),
    channel: '000001',
    own: false,
    text: "how are you guys!",
    yesterdayOrOlder() {
        return new Date().getDate() - this.createdOn.getDate() >1
    }
    },

    {
    createdBy: "Jafer",
    createdOn: new Date('10-02-2021 02:2:53'),
    channel: '000002',
    own: false,
    text: "what about you!",
    yesterdayOrOlder() {
        return new Date().getDate() - this.createdOn.getDate() >1
    }
    },

    {
    createdBy: "Sajid",
    createdOn: new Date('10-03-2021 03:3:53'),
    channel: '000001',
    own: false,
    text: "well guys!",
    yesterdayOrOlder() {
        return new Date().getDate() - this.createdOn.getDate() >1
    }
    },

    {
    createdBy: "Faisal",
    createdOn: new Date('10-04-2021 04:4:53'),
    channel: '000001',
    own: true,
    text: "fine guys!",
    yesterdayOrOlder() {
        return new Date().getDate() - this.createdOn.getDate() >1
    }
    },

    {
    createdBy: "Javid",
    createdOn: new Date('10-05-2021 05:5:53'),
    channel: '000003',
    own: false,
    text: "i think everyone feeling good!",
    yesterdayOrOlder() {
        return new Date().getDate() - this.createdOn.getDate() >1
    }
    }
];



