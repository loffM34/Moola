const express = require("express");
const router = express.Router();
const {authenticateToken} = require('../middleware/jwtMiddleware')

router.route("/")
    .post();

router.route("/protected")
    .get(authenticateToken,(req,res)=>{
        res.json({message:'Protected route accesed', user:req.user})
    });

router.route("/logout")
    .post(authenticateToken,(req,res) =>{

        res.status(200).json({message:"logout successful"})
    });

module.exports = router;
