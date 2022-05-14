const sequelize = require("../config/connection");
const {Volunteer, Opportunity} = require("../models");

// creating volunteer
const volunteers = [
    {
        username: "joejoejoe",
        password: "password"
    },
    {
        username: "weAreCats",
        password: "iLoveSalmon123"
    },
    {
        username: "otherJoe",
        password: "password1"
    }
];

//creating opportunity 
const opps = [
        {
        title: 'help its hot in here',
        description:'come to the equator and help keep me cool!' ,
        lat: 0,
        lon: 0,
        date: new Date(),
        volunteersNeeded: 2,
        creatorId:1
    }, 
    {
        title: 'hang out with cats',
        description:'they need company' ,
        lat: 47.6101,
        lon: -122.16,
        date: new Date("06/01/2022"),
        volunteersNeeded: 20,
        creatorId:2
    }, 
];

// pushing seeds to the models 
const pushOut = async ()=> {
    await sequelize.sync ({force: true});
    await Volunteer.bulkCreate(volunteers, {
        individualHooks: true
    });
    const createOpps = await Opportunity.bulkCreate(opps);
    console.log(createOpps)
    // premaking atendee to include seeds
    await createOpps[1].addAttendee[1];
    await createOpps[1].addAttendee[2];
    process.exit(0);
};

// runn the seed out
pushOut();
