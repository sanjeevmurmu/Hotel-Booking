import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from "cookie-parser"
import cors from "cors"
import redis from 'redis'
import RedisStore from 'connect-redis';
import expressSession from 'express-session';



const app=express()
dotenv.config()

const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB")
        await redisClient.connect();
        console.log('Connected to Redis');
    }catch(error){
        throw error
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected!")
})

mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected!")
})

const redisClient = redis.createClient({
    url: process.env.REDIS_URL, // Replace with your Redis connection URL
  });
  


  const sessionStore = new RedisStore({
    client: redisClient,
  });

  var corsOptions = {
    origin:['http://localhost:3000','https://lodgeluxe-rose.vercel.app','https://lodgeluxeadmin-rose.vercel.app'],
    credentials:true
  }


const sessionOptions = {
    secret: process.env.JWT,
    resave: false,
    saveUninitialized: true,
    store: sessionStore, // Use RedisStore for session storage
    cookie: {
      secure: true, // Enforce secure cookies for production
      sameSite: 'none'
    },
  };
  
app.use(expressSession(sessionOptions));  
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)



app.use((err,req,res,next)=>{
    const errorStatus=err.status||500
    const errorMessage=err.message||"Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})

app.listen(8800,()=>{
    connect()
    console.log("Connected to backend!")
})

