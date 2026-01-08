import userSchema from "../models/userSchema.mjs";
import noteSchema from "../models/noteSchema.mjs";

const adminController = {
  // Get All User/Account 
  async GetUser (req, res, next){
    try {
      const user = await userSchema.find().select("-password");
      res.json(user)
    } catch (error) {
      next(error)
    }
  },
  // Delete Account
  async DeleteUser (req, res, next){
    try {
      const deleteUser = await userSchema.findByIdAndDelete(req.params.id)
      if (!deleteUser) return res.status(404).json({ message: "User not found" });

      // Delete all notes associated with this user
      await noteSchema.deleteMany({ user: req.params.id });
      
      res.json({ message: "User and associated notes deleted successfully" });
    } catch (error) {
      next(error)
    }
  },
  // Get Account by Id
  async GetUserById (req, res, next){
    try {
      const user = await userSchema.findOne({_id: req.params.id}).select("-password")
      if (!user) return res.status(404).json({ message: "User not found!"})
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }, 
  // Update Account
  async UpdateUser (req, res, next){
    try {
      const { id } = req.params
      const { role } = req.body
      const updateUser = await userSchema.findByIdAndUpdate(
        { _id: id },
        { role },
        { new: true }
      ).select("-password");
      if (!updateUser) return res.status(404).json({ message: "User not found!"})
      res.status(200).json(updateUser)
    } catch (error) {
      next(error)
    }
  }, 
  // Get Notes by Id
  async GetNoteById (req, res, next){
    try {
      const notes = await noteSchema.find({ 
        user: req.params.id  // Find all notes where user field matches the userId
      })
      if (!notes) return res.status(404).json({ message: "Note not found!"})
      res.status(200).json(notes)
    } catch (error) {
      next(error)
    }
  }
}

export default adminController