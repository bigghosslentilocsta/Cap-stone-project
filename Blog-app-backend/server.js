// Import dependencies
import exp from 'express'
import {connect} from 'mongoose'
import { config } from 'dotenv'
import { userRoute} from './APIs/UserAPI.js'
import { authorRoute } from './APIs/AuthorAPI.js'
import { adminRoute } from './APIs/AdminAPI.js'
import { commonRouter } from './APIs/CommonAPI.js'
import cookieParser from 'cookie-parser'

// Load environment variables from .env file
config()

const app=exp()

app.use(exp.json())

app.use(cookieParser())

// Register route handlers for different user roles
app.use('/users', userRoute)
app.use('/authors', authorRoute)
app.use('/admins', adminRoute)
app.use('/common', commonRouter)

// Connect to MongoDB and start server
async function connectDB() {
    try {
        await connect(process.env.DB_URL)
        console.log("DB connected") 
        
        // Start HTTP server after successful DB connection
        app.listen(process.env.PORT,()=>{
            console.log(process.env.PORT,"port connected")
        })
    } catch(err){
        console.log("DB connection failed", err)
    }
}

connectDB()

//dealing with invalid path
app.use((req,res,next)=> {
    res.json({message: `${req.url}is invalid path`});
});




// Global error handling middleware
app.use((err,req,res,next)=>{
    console.log(err)
    res.json({Message:"error", reason:err.message})
})