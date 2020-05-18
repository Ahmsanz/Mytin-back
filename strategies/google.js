const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const { googleClient, googleSecret } = require('../config');
const User = require('../models/usersModel')
const passport = require('passport')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id).then((user) => {
    done(null, user.id);
  })
  
});

passport.use(new GoogleStrategy({
    clientID: googleClient,
    clientSecret: googleSecret,
    callbackURL: "http://localhost:4040/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
      console.log('profile', profile)
    User.findOne({ googleID: profile.id })
    .then(user => {
        if (user) { console.log('user exists', user); return done(null, user)}
        else { 
          console.log('user does not exist, we are going to create it');
          new User({
            googleID: profile.id,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName, 
            picture: profile.photos[0].value,
            mail: profile.emails[0].value
          }).save()
          .then( newUser => {console.log('new user created', newUser); return done(null, newUser)})
        }
    })
  }
));