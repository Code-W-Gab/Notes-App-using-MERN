import noteSchema from "../models/noteSchema.mjs"

const noteController = {
  // Create Note
  async CreateNote (req, res, next){
    try {
      const { note, content } = req.body
      const newNote = await noteSchema.create({ note, content })
      res.status(201).json(newNote)
    } catch (error) {
      next(error)
    }
  },
  // Get Note
  async GetNote (req, res, next){
    try {
      const note = await noteSchema.find()
      res.status(200).json(note)
    } catch (error) {
      next(error)
    }
  },
  // Delete Note
  async DeleteNote (req, res, next){
    try {
      const deletedNote = await noteSchema.findByIdAndDelete(req.params.id)
      if (!deletedNote) return res.status(404).json({ message: "Note not found" });
      res.json({ message: "Note deleted successfully" });
    } catch (error) {
      next(error)
    }
  },
  // Get Note By Id
  async GetNoteById (req, res, next){
    try {
      const note = await noteSchema.findById(req.params.id)
      if (!note) return res.status(404).json({ message: "Note not found!"})
      res.status(200).json(note)
    } catch (error) {
      next(error)
    }
  },
  // Update Note
  async UpdateNote (req, res, next){
    try {
      const { id } = req.params;
      const { note, content } = req.body
      const updatedNote = await noteSchema.findByIdAndUpdate(
        id,
        { note, content },
        { new: true }
      );
      if (!updatedNote) return res.status(404).json({ message: "Note not found!"})
      res.status(200).json(updatedNote)
    } catch (error) {
      next(error)
    }
  }
}

export default noteController