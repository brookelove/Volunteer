const express = requrie('express');
const router = express.Router();
const {Opportunity, Volunteer} = require('../models');

// get all opportunities
router.get("/", (req, res) => {
    Opportunity.findAll().then(allOpts => {
        res.json(allOPts);
    }).catch (err => {
        console.log(err);
        res.status(400).json({msg:"invalid info", err});
    })
})

// get one opportunity
router.get("/:id", (req, res) => {
    Opportunity.findByPk().then(oneOpts => {
        include: [
            {
                model:Volunteer,
                as:"Creator"
            },
            {
                model:Volunteer,
                as: "Attendee"
            },
        ]
    }).then(oneOpts => {
        res.json(oneOPts);
    }).catch (err => {
        console.log(err);
        res.status(400).json({msg:"invalid info", err});
    })
});


router.post ("/", (req,res) => {
    // if the user is not logged ion and wanted to make an opportunity they can't 
    if (!req.session.user) {
        return res.status(403).json({msg: "You have to login first!"});
    };
    // create a new opportunity 
    Opportunity.create({
        ...req.body,
        CreatorId: req.session.user?.id,
        lat: req.session.user.lat,
        long: req.session.user.long

    }).then (newOppt => {
        res.json(newOppt);
    }).catch (err => {
        console.log(err)
        res.status(400).json({msg:"invalid info", err});
    })
});
// update an opportunity
router.put ("/", (req,res) => {
    // if the user is not logged ion and wanted to make an opportunity they can't 
    if (!req.session.user) {
        return res.status(403).json({msg: "You have to login first!"});
    };
    // update an opportunity
    Opportunity.update(req.body,{
        where: {
            id: req.params.id
        }

    }).then (updateOppt => {
        res.json(updateOppt);
    }).catch (err => {
        console.log(err)
        res.status(400).json({msg:"invalid info", err});
    })
});

// delete opportunity 
router.delete ("/:id", (req, res) => {
    // if the user is not logged in then they cannot delete if they are logged in
    if (!req.session.user) {
        return res.status(403).json({msg: "You have to login first!"});
    };
    Opportunity.findByPk(req.params.id).then(foundOppt => {
        if(req.session.user.id !== foundOppt.CreatorId) {
            return res.status(403).json({msg: "this isnt yours"})
        }
        Opportunity.destroy({
            where: {
                id:req.params.id
            }
        }).then(delOppt => {
            res.json(delOppt)
        })
    })
})

module.exports = router;