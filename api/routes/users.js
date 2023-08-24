import express from "express";
import User from "../models/User.js";
import { createError } from "../utils/error.js";
import {deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyToken,verifyUser } from "../utils/verifyToken.js";

const router=express.Router()

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("hello user, you are now logged in")
// })
// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello user, you are now logged in and you can delete your account")
// })

// update
router.put("/:id",verifyUser,updateUser)
// delete
router.delete("/:id",verifyUser,deleteUser)
// get
router.get("/:id",verifyUser,getUser)

// get all
router.get("/",verifyUser,getUsers)
export default router