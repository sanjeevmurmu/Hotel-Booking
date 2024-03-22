// import jwt  from "jsonwebtoken";
// import { createError } from "./error.js";

// export const verifyToken=(req,res,next)=>{
//     const token=req.cookies.access_token
//     if(!token){
//         return next(createError(401,"You are not authenticated!"))
//     }

//     jwt.verify(token,process.env.JWT,(err,user)=>{
//         if(err) return next(createError(403,"Token is not valid!"))
//         req.user=user
//         // console.log("verifyToken",user)
//         next()
//     })
// }

// export const verifyUser=(req,res,next)=>{
//     verifyToken(req,res,/*next,*/ ()=>{
//         if(req.user.id===req.params.id || req.user.isAdmin){
//             // console.log("verifyUser",req.user)
//             next()
//         }else{
//             return next(createError(403,"You are not authorized"))
//         }
//     })
// }

// export const verifyAdmin=(req,res,next)=>{
//     verifyToken(req,res,/*next,*/ ()=>{
//         if(req.user.isAdmin){
//             // console.log("verifyAdmin",req.user)
//             next()
//         }else{
//             return next(createError(403,"You are not authorized"))
//         }
//     })
// }

import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next, callback) => {
  // const token = req.cookies.access_token;
  const token=req.session.userId
  if (!token) {
    return next(createError(401, `You are not authenticated! ${JSON.stringify(req.cookies)}`));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    console.log("verifyToken", user);
    if (callback) callback();
    else next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      console.log("verifyUser", req.user);
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      console.log("verifyAdmin", req.user);
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

