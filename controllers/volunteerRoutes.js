const express = require('express');
const router = express.Router();
const {Volunteer, Opportunity} = require("../models");
const bcrypt = require("bcrypt");
const res = require('express/lib/response');
const req = require('express/lib/request');

// find all volunteers!
router.get("/", (req,res) => {
    Volunteer.findAll().then(allUsers=> {
        res.json(allUsers);
    }).catch(err => {
        console.log(err);
        res.status(400).json({msg: "invalid info", err});
    })
});

// find one volunteer!creating 
router.get("/:id", (req,res) => {
    Volunteer.findByPk(req.params.id, {
        include:[
            {
                model: Opportunity,
                as:"Creator"
            },
            {
                model: Opportunity,
                as:"Attendee"
            }
        ]
    }).then(OneUser=> {
        res.json(OneUser);
    }).catch(err => {
        console.log(err);
        res.status(400).json({msg: "invalid info", err})
    })
});

// create a volunteer
router.post("/", (req,res) => {
    Volunteer.create(req.body).then(newVol => {
        res.json(newVol)
    }).catch(err =>{
        console.log(err);
        res.status(400).json({msg: "invalid info", err})
    })
});

// find the correct volunteer
router.post("/login", (req,res) => {
    Volunteer.findOne({
        where: {
            username:req.body.username
        }
    }).then(foundUser => {
        if(!foundUser){
            return res.status(400).json({msg: "invalid credintials, please try again"})
        }
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.user = {
                id: foundUser.id,
                username: foundUser.username,
                lat: req.body.lat,
                long: req.body.long
            }
            return res.json(foundUser)
        }
        return res.status(400).json({msg:"invalid credintials, please try again"})
    }).catch (err => {
        console.log(err);
        return res.status(400).json({msg:"invalid info, please try again", err})
    })
})

// log out!
router.delete("/logout", (req,res) => {
    req.session.destroy();
    res.send("logged out!")
})

module.exports = router;