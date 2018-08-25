const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google')
    );

    app.get('/api/logout', (req, res, next) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user',(req,res,next) => {
        res.send(req.user);
    })
}