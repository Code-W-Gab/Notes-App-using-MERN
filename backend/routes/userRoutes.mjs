import express from 'express';
import authController from '../controllers/authControllers.mjs';
import auth from '../middleware/auth.mjs';
import isAdmin from '../middleware/isAdmin.mjs';
const router = express.Router()

// Create Account
router.post('/register', authController.Register)
// User Login
router.post('/login', authController.Login)

router.get('/user', auth, isAdmin, authController.User)

router.get("/profile", auth, (req, res) => {
  res.json({ message: "Protected profile", userId: req.user.id });
});



export default router