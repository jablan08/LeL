const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");


/* GET home page. */
router.get("/tournaments", async (req, res) => {
  try {
    const tournamentsRunning = await fetchRunningTourney();
    const tournamentsRunningJson = await tournamentsRunning.json();

    const tournamentsUpcoming = await fetchUpcomingTourney();
    const tournamentsUpcomingJson = await tournamentsUpcoming.json();
    
    const tournamentsPast = await fetchPastTourney();
    const tournamentsPastJson = await tournamentsPast.json();

    const pastMatches = await fetchPastMatches();
    const pastMatchesJson = await pastMatches.json();

    const data = {
      dataRunning: tournamentsRunningJson,
      dataUpcoming: tournamentsUpcomingJson,
      dataPast: tournamentsPastJson,
      dataPastMatches: pastMatchesJson,


    }
    res.json({
      data,
      success: true
    }) 
  } catch (error) {
    console.log(error)
  }
});

const fetchRunningTourney = () =>
  fetch(`https://api.pandascore.co/lol/tournaments/running?token=${process.env.MY_SECRET}`)
const fetchUpcomingTourney = () =>
  fetch(`https://api.pandascore.co/lol/tournaments/upcoming?token=${process.env.MY_SECRET}`)
const fetchPastTourney = () =>
  fetch(`https://api.pandascore.co/lol/tournaments/past/?per_page=5&token=${process.env.MY_SECRET}`)

const fetchPastMatches = () => 
  fetch(`https://api.pandascore.co/lol/matches/past?per_page=3&token=${process.env.MY_SECRET}`)




// GET TEAMS

// router.get("/teams", async (req,res)=>{
//   try {
//     const teams = await fetch(`https://api.pandascore.co/lol/teams?token=${process.env.MY_SECRET}`)
//     const teamsJson = await teams.Json();

//     res.json({
//       allTeams:
//     })
//   } catch (error) {
    
//   }
// })

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
