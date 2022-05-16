const express = require('express');
const session = require('express-sessions');
const exphbs = require('express-handlebars');
const allRoutes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up the express app
const app = express();
const PORT = porcess.env.PORT || 3000;

// requre models for syncing 
const {Volunteer, Opportunity} = require('./models');

const sess = {
    secret: process.env.SECRECT_SESSION,
    cookie: {maxAge: 1000*60*60*2},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })

};

app.use(session(sess));
// Sets upp the express app to handle data parsing 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// static directory: what is the definition of this
app.use(express.static('public'));

 const hbs = exphbs.create({});
 app.engine('handlebars', hbs.engine);
 app.set('view engine', 'handlebars');

 app.use('/', allRoutes);

sequelize.sync({ force: true}).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT' + PORT)
    });
});