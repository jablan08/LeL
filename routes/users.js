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

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);  
    res.json({deletedUser})  
  } catch (error) {
    res.json({error})
    
  }



  return res.json({data: 'Received a DELETE HTTP method user'});
});


module.exports = router;
