import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.mjs'
import noteRoutes from './routes/noteRoutes.mjs'
import adminRoutes from './routes/adminRoutes.mjs'
import userRoutes from './routes/userRoutes.mjs'

const app = express()
app.use(express.json())
app.use(cors()) 

// Import and initialize passport AFTER dotenv and app creation
const { default: passport } = await import('./config/passport.mjs')
app.use(passport.initialize());
app.locals.passport = passport; // Make passport available to routes

// MongoDb
connectDB()

// Routes
app.use('/notes', noteRoutes)
app.use('/auth', userRoutes)
app.use('/admin', adminRoutes)

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})