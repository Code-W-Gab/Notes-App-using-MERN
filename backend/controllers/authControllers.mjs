import userSchema from "../models/userSchema.mjs";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const authController = {
  // Create Account
  async Register (req, res, next){
    try {
      const { email, password } = req.body

      // Check existing user
      const userExist = await userSchema.findOne({email})
      if (userExist) return res.status(400).json({ message: "User already exists"})
      
      // Hash Password (encrypt)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await userSchema.create({ email, password:hashedPassword })
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  },
  // User Login
  async Login (req, res, next){
    try {
      const { email, password } = req.body
      const user = await userSchema.findOne({email})
      if (!user) return res.status(400).json({ message: "invalid credentials! (email)"})
      
      // decrypt hash password
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ message: "invalid credentials! (password)"})

      // Creating token
      const token = jwt.sign(
        { id: user._id,
          role: user.role  
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      )
      res.status(201).json({token, role: user.role})
    } catch (error) {
      next(error)
    }
  },
  
  async User (req, res, next){
    try {
      const user = await userSchema.find().select("-password");
      res.json(user)
    } catch (error) {
      next(error)
    }
  },
}

export default authController