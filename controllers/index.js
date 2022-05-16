const express = require('express');
const router = express.Router();
const volunteerRoutes = require("./volunteerRoutes");
const opportunityRoutes = require("./opportunityRoutes");
const frontEndRoutes = ("./frontEndRoutes");
// using the router to get the opportunity 
    // ("api route", the route name);
router.use("/api/volunteers", volunteerRoutes);
router.use("/api/volunteers", opportunityRoutes);
router.use("/", frontEndRoutes);

// getting the session request
router.get ("/sessions", (req,res) => {
    res.json(req.session)
});

module.exports = router;