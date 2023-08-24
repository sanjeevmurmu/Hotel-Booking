import express from "express";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin,verifyUser } from "../utils/verifyToken.js";

const router=express.Router()

//create
router.post("/:hotelid",verifyAdmin,createRoom)

// update
router.put("/:id",verifyAdmin,updateRoom)
// update room availability
router.put("/availability/:id",updateRoomAvailability)

// delete
router.delete("/:hotelid/:id",verifyAdmin,deleteRoom)

// get
router.get("/:id",getRoom)

// get all
router.get("/",getRooms)

export default router 