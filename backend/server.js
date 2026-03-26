// Import dependencies
import 'dotenv/config'
import exp from 'express'
import {connect} from 'mongoose'
import { userRoute} from './APIs/UserAPI.js'
import { authorRoute } from './APIs/AuthorAPI.js'
import { adminRoute } from './APIs/AdminAPI.js'
import { commonRouter } from './APIs/CommonAPI.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app=exp()

app.use(cors({origin:["http://localhost:5173"], credentials: true}))

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
app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // strict mode unknown field error
  if (err.name === "StrictModeError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  // ✅ HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});