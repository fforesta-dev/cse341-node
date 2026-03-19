const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const oauthConfigured =
  !!process.env.GITHUB_CLIENT_ID &&
  !!process.env.GITHUB_CLIENT_SECRET &&
  !!process.env.GITHUB_CALLBACK_URL;

if (oauthConfigured) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        const user = {
          id: profile.id,
          username: profile.username,
          displayName: profile.displayName || profile.username,
          provider: 'github',
        };

        return done(null, user);
      }
    )
  );
} else {
  console.warn(
    'GitHub OAuth is not configured. Set GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, and GITHUB_CALLBACK_URL.'
  );
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
