const express = require('express');
const router = express.Router();

const User = require("../models/Users")
const bcrypt = require('bcryptjs')



router.post("/", async (req,res) =>{
    try {
        
        const foundUser = await User.findOne({username: req.body.username})
       
            if(foundUser.validPassword(req.body.password)) {
          
                
                req.session.logged = true;
                req.session.username = req.body.username;
                req.session.userDbId = foundUser._id;
                
                res.json({
                    user: foundUser,
                    status: 200,
                    success: foundUser ? true : false
                })
            } else {
                req.session.message = "Invalid Username or Password"
                res.json({
                    message: req.session.message
                })
            }
    } catch (error) {
        req.session.message = "Invalid Username or Password"
        res.json({
            message: req.session.message
        })
    }

   
})
// CREATE
router.post('/new', async (req, res) => {
    try {
      const newUser = await User.create(req.body)
      res.json({
        newUser,
        success: newUser ? true : false
      })
      
    } catch (error) {
      res.json(error)
    } 
  });

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
    if(err){
    res.json(err);
    } else {
    res.redirect('/');
    }
    })
})

module.exports = router;
