import express from "express"
const router = express.Router()
import noteController from "../controllers/noteControllers.mjs"

// Create Note
router.post('/create', noteController.CreateNote)
// Get Note (All Notes)
router.get('/get', noteController.GetNote)
// Get Note By Id (Single Note)
router.get('/get/:id', noteController.GetNoteById)
// Delete Note
router.delete('/delete/:id', noteController.DeleteNote)
// Update Note
router.put('/update/:id', noteController.UpdateNote)

export default router

