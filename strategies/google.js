const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const { googleClient, googleSecret } = require('../config');
const User = require('../models/usersModel')
const passport = require('passport')

passport.use(new GoogleStrategy({
    clientID: googleClient,
    clientSecret: googleSecret,
    callbackURL: "http://localhost:4040/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
      console.log('profile', profile)
    User.find({ googleID: profile.id })
    .then(user => {
        if (user) { console.log('user exists', user); done(user)}
        else { console.log('user does not exist')}
    })
  }
));