import express from 'express';
import authController from '../controllers/authControllers.mjs';
import auth from '../middleware/auth.mjs';
import jwt from 'jsonwebtoken'
// Remove this line - don't import passport here
// import passport from '../config/passport.mjs';
const router = express.Router()

// Create Account
router.post('/register', authController.Register)
// User Login
router.post('/login', authController.Login)

router.get("/profile", auth, (req, res) => {
  res.json({ message: "Protected profile", userId: req.user.id });
});

// Google OAuth Routes - passport will be available from server.mjs
router.get(
  '/google',
  (req, res, next) => {
    req.app.locals.passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  }
);

router.get(
  '/google/callback',
  (req, res, next) => {
    req.app.locals.passport.authenticate('google', { 
      session: false,
      failureRedirect: `${process.env.FRONTEND_URL}/` 
    })(req, res, next);
  },
  (req, res) => {
    try {
      // Generate JWT token
      const token = jwt.sign(
        { id: req.user._id, email: req.user.email, role: req.user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    } catch (error) {
      res.redirect(`${process.env.FRONTEND_URL}/?error=authentication_failed`);
    }
  }
);  

export default router