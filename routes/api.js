const express = require('express');
const router = express.Router();
const fetch = require("node-fetch");


/* GET home page. */
router.get("/tournaments", async (req, res) => {
  try {
    const tournamentsRunning = await fetchRunningTourney();
    const tournamentsRunningJson = await tournamentsRunning.json();

    const matchesUpcoming = await fetchUpcomingMatches();
    const matchesUpcomingJson = await matchesUpcoming.json();
    
    const tournamentsPast = await fetchPastTourney();
    const tournamentsPastJson = await tournamentsPast.json();

    const pastMatches = await fetchPastMatches();
    const pastMatchesJson = await pastMatches.json();

    const upcomingTourney = await fetchUpcomingTourney();
    const upcomingTourneyJson = await upcomingTourney.json();

    const data = {
      dataRunning: tournamentsRunningJson,
      dataUpcoming: matchesUpcomingJson,
      dataPast: tournamentsPastJson,
      dataPastMatches: pastMatchesJson,
      dataUpcomingTourney: upcomingTourneyJson


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
const fetchUpcomingMatches = () =>
  fetch(`https://api.pandascore.co/lol/matches/upcoming?per_page=3token=${process.env.MY_SECRET}`)
const fetchPastTourney = () =>
  fetch(`https://api.pandascore.co/lol/tournaments/past/?per_page=5&token=${process.env.MY_SECRET}`)

const fetchPastMatches = () => 
  fetch(`https://api.pandascore.co/lol/matches/past?per_page=6&token=${process.env.MY_SECRET}`)

  
  const fetchUpcomingTourney = () =>
    fetch(`https://api.pandascore.co/lol/tournaments/upcoming?token=${process.env.MY_SECRET}`)
  


// GET TEAMS

router.get("/teams", async (req,res)=>{
  try {
    console.log("HIT TRY")
    const teams = await fetchUpcomingTourney();
    // const teamsSeries = await fetch(`https://api.pandascore.co//lol/series/${req.params.id}/teams`)
    const teamsJson = await teams.json();
    res.json({
      allTeams: teamsJson,
      success: true
    })
  } catch (error) {
    console.log(error)
  }
})
router.get("/teams/:id", async (req,res)=>{
  try {
    console.log(req.params.id,"+++++++HIT TRY")
    // const teams = await fetch(`https://api.pandascore.co/lol/tournaments/upcoming?token=${process.env.MY_SECRET}`)
    const team = await fetch(`https://api.pandascore.co//teams/${req.params.id}?token=${process.env.MY_SECRET}`)
    const teamJson = await team.json();
    res.json({
      fullTeam: teamJson,
      success: true
    })
    
  } catch (error) {
    console.log(error)
  }
})

router.get('/', (req, res) => {
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
