const express = require('express');
const router = express.Router();

const User = require("../models/Users")
const bcrypt = require('bcryptjs')



router.post("/", async (req,res) =>{
    try {
        console.log("Hit the login")
        const foundUser = await User.findOne({username: req.body.username})
        if (foundUser) {
            console.log(foundUser)
            console.log(req.body.password,"=========")
            if(foundUser.validPassword(req.body.password)) {
                console.log(foundUser,"++++++=======")
                console.log(req.session,"HIT SESSION")
                req.session.logged = true;
                req.session.username = req.body.username;
                res.json({
                    user: foundUser,
                    status: 200,
                    success: foundUser ? true : false
                })
            } else {
                req.session.message = "Invaild Username or Password"
                res.json({
                    message: req.session.message
                })
            }
        } else {
            req.session.message = "Invaild Username or Password"
            res.json({
                message: req.session.message
            })
        }
    } catch (error) {
        res.json({
            error
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
      console.log(newUser)
    } catch (error) {
      res.json(error)
    } 
  });

module.exports = router;
