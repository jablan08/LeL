const express = require('express');
const router = express.Router();

const User = require("../models/Users")




router.post("/", async (req,res) =>{
    try {
        console.log("Hit the login")
        const foundUser = await User.findOne({username: req.body.username})
        if (foundUser) {
            console.log(foundUser)
            console.log(req.body.password,"=========")
            if(foundUser.password === req.body.password) {
                console.log(foundUser,"++++++=======")
                console.log(req.session,"HIT SESSION")
                req.session.logged = true;
                req.session.username = req.body.username;
                res.json({
                    user: foundUser,
                    status: 200,
                    success: true
                })
            }
        }
    } catch (error) {
        res.json({
            error
        })
    }

   
})

module.exports = router;
