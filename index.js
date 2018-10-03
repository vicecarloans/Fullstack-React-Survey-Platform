const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/key');
require('./models/User');
require('./models/Surveys');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey],
        httpOnly:true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
// Route hookup
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
if(process.env.NODE_ENV === 'production'){
    // Express will serve up production assets, main.js, main.css
    app.use(express.static('client/build'));
    // Express will serve index.html if route not recognized
    //Order of operation
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);