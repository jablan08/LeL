const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");


/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const tournamentsRunning = await fetch(`https://api.pandascore.co/lol/tournaments/running?token=${process.env.MY_SECRET}`)
    const tournamentsRunningJson = await tournamentsRunning.json()

    const tournamentsUpcoming = await fetch(`https://api.pandascore.co/lol/tournaments/upcoming?token=${process.env.MY_SECRET}`)
    const tournamentsUpcomingJson = await tournamentsUpcoming.json()
    
    const tournamentsPast = await fetch(`https://api.pandascore.co/lol/tournaments/past/?per_page=5&token=${process.env.MY_SECRET}`)
    const tournamentsPastJson = await tournamentsPast.json()

    console.log(tournamentsRunningJson)
    res.json({
      dataRunning: tournamentsRunningJson,
      dataUpcoming: tournamentsUpcomingJson,
      dataPast: tournamentsPastJson,
      success: true
    }) 
  } catch (error) {
    console.log(error)
  }

});

router.post('/', (req, res) => {
  return res.json({
    body: req.body
  });
});

router.put('/', (req, res) => {
  return res.json({data: 'Received a PUT HTTP method'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a DELETE HTTP method'});
});


module.exports = router;
