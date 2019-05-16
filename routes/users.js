const express = require('express');
const router = express.Router();

const User = require("../models/Users")



// FIND ALL
router.get('/', async (req, res) => {
  
  try {
    const users = await User.find({});
    res.json({users})
    
  } catch (error) {
    res.json({error})
  }

  return res.json({data: 'Received a GET HTTP method users'});
});

// SHOW
router.get("/:id", async (req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    console.log(user, "show user")
    res.json({user})
  } catch (error) {
    res.json(error)
  }
})



// EDIT
router.put('/:id', async (req, res) => {
  try {
    const editedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.json({editedUser});
  } catch (error) {
    res.json({error})
  }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);  
    res.json({deletedUser})  
    } catch (error) {
      res.json({error})
    }
});

// ADD TO WATCHLIST
router.post("/add", async (req,res)=> {
  try {
    const foundUser = await User.findById(req.session.userDbId)
    console.log(req.session)
    console.log(foundUser, "I FOUNDDDDDD==================")
    console.log(req.body)
    const team ={
      title:req.body.name,
      image:req.body.image_url,
      id: req.body.id

    }
    foundUser.watchList.push(team)
    await foundUser.save()
    res.json({
      updatedUser: foundUser,
      success: true
    })
  } catch (error) {
    console.log(error)
  }
})


// DELETE FROM WATCHLIST
router.delete('/watchlist/:id', async (req, res) => {
  try {
    const foundUser = await User.findById(req.session.userDbId);
    console.log(req.params.id, "FOUND YOU MONKEY")
    // for (let i = 0; i < foundUser.watchList.length; i++) {
    //   if (foundUser.watchList[i].id === Number(req.params.id)){

    //     foundUser.watchList.splice(i,1)
    //   }
    // }
    foundUser.watchList.splice(i,1)
    await foundUser.save();
    
    res.json({
      status: 200,
      foundUser
    });
  } catch(err) {
    res.send(err)
  }
});





module.exports = router;
