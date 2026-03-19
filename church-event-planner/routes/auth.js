const router = require('express').Router();
const passport = require('passport');
const requireAuth = require('../middleware/requireAuth');

const oauthReady = () =>
  !!process.env.GITHUB_CLIENT_ID &&
  !!process.env.GITHUB_CLIENT_SECRET &&
  !!process.env.GITHUB_CALLBACK_URL;

const ensureOauthReady = (req, res, next) => {
  if (!oauthReady()) {
    return res.status(500).json({ error: 'GitHub OAuth is not configured on this server' });
  }

  return next();
};

router.get('/status', (req, res) => {
  res.status(200).json({
    loggedIn: req.isAuthenticated && req.isAuthenticated(),
    user: req.user || null,
  });
});

router.get('/github', ensureOauthReady, passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  ensureOauthReady,
  passport.authenticate('github', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

router.get('/success', (req, res) => {
  if (!(req.isAuthenticated && req.isAuthenticated())) {
    return res.status(401).json({ error: 'Login not complete' });
  }

  return res.status(200).json({
    message: 'Login successful',
    user: req.user,
  });
});

router.get('/failed', (req, res) => {
  res.status(401).json({ error: 'GitHub authentication failed' });
});

router.get('/private', requireAuth, (req, res) => {
  res.status(200).json({
    message: 'This is protected content',
    user: req.user,
  });
});

router.get('/logout', (req, res) => {
  req.logout((logoutError) => {
    if (logoutError) {
      return res.status(500).json({ error: 'Could not log out' });
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return res.status(500).json({ error: 'Could not clear session' });
      }

      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;
