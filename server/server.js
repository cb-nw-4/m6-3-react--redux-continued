require("isomorphic-fetch");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = new express();
const port = 5678;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const fetch = require("isomorphic-fetch");

app.get("/spotify_access_token", async (req, res, next) => {
  console.log("Spotify ACces TOken Get");
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_SECRET;

  const authString = Buffer.from(clientId + ":" + clientSecret).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const json = await response.json();
  console.log(json);
  return res.send(json);
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}.`);
  }
});
