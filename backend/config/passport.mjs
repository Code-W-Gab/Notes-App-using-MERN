import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userSchema from '../models/userSchema.mjs';
import crypto from 'crypto';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const googleId = profile.id;

        // Check if user exists
        let user = await userSchema.findOne({ email });

        if (user) {
          // User exists - update googleId if not present
          if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
          }
          return done(null, user);
        }

        // Create new user with random password
        const randomPassword = crypto.randomBytes(32).toString('hex');
        
        user = await userSchema.create({
          name,
          email,
          password: randomPassword, // They'll never use this
          googleId,
          role: 'user',
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userSchema.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;