const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const allRoutes = require('./controllers');

const seqelize = require('./config/connection');
const SeqelizeStore = requre('connect-session-sequelize')(session.Store);

// Set up the express app
const app = express();
const PORT = porcess.env.PORT || 3000;

// requre models for syncing 
const {User} = require('./models');
const { cookie } = require('express/lib/response');
const sequelize = require('./config/connection');

const sess = {
    secret: 'process.env.SECRECT_SESSION',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SeqelizeStore ({
        db: seqelize
    })

};

app.use(session(sess));
// Sets upp the express app to handle data parsing 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// static directory: what is the definition of this
app.use(express.static('public'))

// const hbs = exphbs.create({});
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

app.use('/', allRoutes);

sequelize.sync({ force: true}).then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT' + PORT)
    });
});