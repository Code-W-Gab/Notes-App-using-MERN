import express from 'express';
import adminController from '../controllers/adminControllers.mjs';
import auth from '../middleware/auth.mjs';
import isAdmin from '../middleware/isAdmin.mjs';
const router = express.Router()

// Get All User  
router.get('/user', auth, isAdmin, adminController.GetUser)
// Delete User
router.delete('/delete/:id', auth, adminController.DeleteUser)
// Get User by Id
router.get('/get/:id', auth, isAdmin, adminController.GetUserById)
// Update a user
router.put('/update/:id', auth, isAdmin, adminController.UpdateUser)
// Get Note By User Id
router.get('/notes/:id', auth, isAdmin, adminController.GetNoteById)

export default router