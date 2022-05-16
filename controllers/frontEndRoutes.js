const express = require('express');
const router = express.Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const {Opportunity, Volunteer} = require('../models');


// make a distance known 
function distance (lat1, lat2, long1, long2) {
    console.log(lat1, lat2, long1, long2)
    // the math module contains a function named toRadians wich makes degrees into radians
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;
    long1 = (long1 * Math.PI) / 180;
    long2 = (long2 * Math.PI) / 180;

// haversine formula which is 

let dlon = long2 - long1;
let dlat = lat2 - lat1;
let a = Math.pow(Math.sin(dlat / 2), 2 ) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlong / 2), 2 ) 

let c = 2 * Math.asin(Math.sqrt(a));

// radius of the earth in kilo use 3956 for miles 
let r = 6371;

// calulate the result 
return c * r;
};

router.get ("/", (req, res) => {
    Opportunity.findAll(). then (oppts =>{
        const hbsOppts = oppts.map(oppt => oppt.get({plain:true}));
        if (req.session.user) {
            hbsOppt.forEach(oppt => {
                oppt.distance = distance (parseFloat (req.session.user.lat), 
                parseFloat(oppt.lat),
                parseFloat(req.sesssion.user.long), 
                parseFloat(oppt.long)
                ).toFized(2);
            });
        }
        console.log(hbsOppts)
        oppts.forEach (async (oppt, i) => {
            // the amount of attendeees going 
            const vols = await oppt.countAttendee();
            hbsOppts[i].slotLeft = hbsOppts[i].colunteersNedded - vols;
        });
    const loggedIn = req.session.user ? true : false;
    console.log(loggedIn);
    res.render("home", {
        oppts: hbsOppts,
        loggedIn: loggedIn,
        userid: loggedIn?req.session.user.id:null
    });
    });
});
// findning one opportunity
router.get ("/oppts/:id", (req,res) => {
    Opportunity.findByPk(req.params.id, {
        include: [
            {
                model: Volunteer,
                as: "Creator"
            },
            {
                model: Volunteer,
                as: "Attendee"
            }
        ]
    }).then (foundEvent => {
    if (!foundEvent) {
        return res.redirect("/notfound");
      }
      hbsData = foundEvent.get({ plain: true });
      hbsData.slotsLeft = hbsData.volunteersNeeded - hbsData.Attendee.length;
      hbsData.distance = distance(
        parseFloat(req.session.user.lat),
        parseFloat(hbsData.lattitude),
        parseFloat(req.session.user.long),
        parseFloat(hbsData.longitude)
      ).toFixed(2);
      hbsData.loggedIn = req.session.user ? true : false;
      res.render("singleOpp", hbsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "something went wrong", err });
    });
});

// if the opportunity is not found 
router.get("/notfound", (req,res) => {
    res.render("404", {
        loggedIn: req.session.user ? true : false
    });
});

// if user is logged in take them to the profile page
router.get("/login", (req,res) => {
    if(req.session.user) {
        return res.redirect("/profile")
    } ReadableStreamDefaultController("login", {
        loggedIn: res.session.user ? true : false 
    });
});

// create get the  profile of thte user
router.get("/profile", (req,res) => {
    if(!req.session.user) {
        return res.status(401).json ({msg: "login first!"});
    } 
    Volunteer.findByPk(req.session.user.id, {
        include: [
            {
                model: Opportunity,
                as: "Creator"
            },
            {
                model: Opportunity,
                as: "Attendee"
            }
        ]
    }).then(data => {
        const hbsData = data.get({plain: true});
        hbsData.loggedIn = req.session.user ? true : false;
        data.Attendee.forEach(async (oppt, i) => {
            const vols = await oppt.countAttendee();
            hbsData.Attendee[i].slotsLeft = hbsData.Creator[i].volunteersNeeded - vols;
    });
    hbsData.Attendee.forEach(oppt => {
        oppt.distance = distance (
        parseFloat(req.session.user.lat),
        parseFloat(hbsData.lattitude),
        parseFloat(req.session.user.long),
        parseFloat(hbsData.longitude)
        ).toFixed(2);
    });
    res.render("profile", hbsData)
    });
});
module.exports = router;