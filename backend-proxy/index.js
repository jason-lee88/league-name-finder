require("dotenv").config();

var express = require("express");
var cors = require("cors");
const axios = require("axios");
const {
  compareAsc,
  differenceInMilliseconds,
  intervalToDuration,
  addMilliseconds,
  formatDuration,
  add,
} = require("date-fns");

const apiKey = process.env.RIOT_API_KEY;
const port = 3001;

const riotFetch = async (url) => {
  try {
    const res = await axios.get(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Riot-Token": apiKey,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

var app = express();
app.use(cors());

app.get("/availability", async (req, res) => {
  const username = req.query.username;
  const years = req.query.years;
  const months = req.query.months;
  const days = req.query.days;

  const user = await riotFetch(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}`
  );
  if (!user) {
    return res.status(200).send({
      username: username,
      available: true,
      withinTime: true,
    });
  }
  const resUsername = user.name;
  const revisionDate = user.revisionDate;
  const summonerLevel = user.summonerLevel;
  const puuid = user.puuid;

  /* COMMENTED LOGIC BELOW IS TO FIND THE PLAYER"S LAST GAME. */
  /* UNCOMMENT THIS AND REMOVE INSTANCES revisionDate AND USE trueMatchEndDate TO USE THIS LOGIC */

  // // Get the end timestamp of the player's last League game (if they have played one before)
  // let leagueMatchEndDate;
  // const lastLeagueMatch = await riotFetch(
  //   `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=1`
  // );
  // if (lastLeagueMatch.length > 0) {
  //   const lastLeagueMatchId = lastLeagueMatch[0];
  //   const leagueMatchDetails = await riotFetch(
  //     `https://americas.api.riotgames.com/lol/match/v5/matches/${lastLeagueMatchId}`
  //   );
  //   if (leagueMatchDetails.info.gameEndTimestamp) {
  //     leagueMatchEndDate = new Date(leagueMatchDetails.info.gameEndTimestamp);
  //   } else {
  //     leagueMatchEndDate = new Date(
  //       leagueMatchDetails.info.gameStartTimestamp +
  //         leagueMatchDetails.info.gameDuration
  //     );
  //   }
  // }

  // // Get the end timestamp of the player's last TFT game (if they have played one before)
  // let tftMatchEndDate;
  // const lastTftMatch = await riotFetch(
  //   `https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?start=0&count=1`
  // );
  // if (lastTftMatch.length > 0) {
  //   const lastTftMatchId = lastTftMatch[0];
  //   const tftMatchDetails = await riotFetch(
  //     `https://americas.api.riotgames.com/tft/match/v1/matches/${lastTftMatchId}`
  //   );
  //   tftMatchEndDate = new Date(
  //     tftMatchDetails.info.game_datetime +
  //       Math.floor(tftMatchDetails.info.game_length * 1000)
  //   );
  // }

  // // Determine if the end timestamp of the player's last game was in League or TFT
  // let trueMatchEndDate;
  // if (leagueMatchEndDate && tftMatchEndDate) {
  //   trueMatchEndDate =
  //     compareAsc(leagueMatchEndDate, tftMatchEndDate) >= 0
  //       ? leagueMatchEndDate
  //       : tftMatchEndDate;
  // } else if (!tftMatchEndDate) {
  //   trueMatchEndDate = leagueMatchEndDate;
  // } else {
  //   trueMatchEndDate = tftMatchEndDate;
  // }

  // Get the number of milliseconds of inactivity for an account to be inactive
  const oneMonth = 2629800000;
  const sixMonths = oneMonth * 6;
  const twentyFourMonths = oneMonth * 24;
  const threshold =
    sixMonths + Math.floor(twentyFourMonths, oneMonth * (summonerLevel - 6));

  const now = new Date();

  if (differenceInMilliseconds(now, revisionDate) > threshold) {
    return res.status(200).send({
      username: resUsername,
      available: true,
      withinTime: true,
    });
  }

  const expireDate = addMilliseconds(revisionDate, threshold);

  return res.status(200).send({
    username: resUsername,
    available: false,
    withinTime:
      compareAsc(
        add(now, { years: years, months: months, days: days }),
        expireDate
      ) >= 0,
    remainingTime: formatDuration(
      intervalToDuration({
        start: now,
        end: expireDate,
      }),
      { format: ["years", "months", "weeks", "days"] }
    ),
  });
});

app.listen(port, () => {
  console.log(`Backend proxy started on port ${port}`);
});
