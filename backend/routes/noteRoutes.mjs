import express from "express"
const router = express.Router()
import noteController from "../controllers/noteControllers.mjs"
import auth from "../middleware/auth.mjs"

// Create Note
router.post('/create', auth, noteController.CreateNote)
// Get Note (All Notes)
router.get('/get', auth, noteController.GetNote)
// Get Note By Id (Single Note)
router.get('/get/:id', auth, noteController.GetNoteById)
// Delete Note
router.delete('/delete/:id', auth, noteController.DeleteNote)
// Update Note
router.put('/update/:id', auth, noteController.UpdateNote)

export default router

