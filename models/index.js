const Volunteer = require("./Volunteer");
const Opportunity = require("./Opportunities");

Volunteer.hasMany(Opportunity, {
    as: "Creator",
    foreignKey: "CreatorId"
});

Opportunity.belongsTo(Volunteer, {
    as: "Creator"
});

Volunteer.belongsToMany(Opportunity, {
    through: "Volunteeropportunities",
    as: "Attendee"
});

Opportunity.belongsToMany(Volunteer, {
    through: "Volunteeropportunities",
    as: "Attendee"
});

module.exports = {
    Volunteer, 
    Opportunity,
}