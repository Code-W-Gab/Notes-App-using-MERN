import express from 'express';
import authController from '../controllers/authControllers.mjs';
import auth from '../middleware/auth.mjs';
const router = express.Router()

// Create Account
router.post('/register', authController.Register)
// User Login
router.post('/login', authController.Login)

router.get("/profile", auth, (req, res) => {
  res.json({ message: "Protected profile", userId: req.user.id });
});

export default router