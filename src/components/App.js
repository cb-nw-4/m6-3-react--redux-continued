import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import { useDispatch } from "react-redux";
import ArtistRoute from "../ArtistRoute";
import GlobalStyles from "../GlobalStyles";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../actions";
const DEFAULT_ARTIST_ID = "5DpSoH5zCXNRqYai7pmcGG";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        console.log(json);
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/artists/:id">
            <ArtistRoute />
          </Route>
          <Route path="/">
            <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
          </Route>
        </Switch>
      </div>
      <GlobalStyles />
    </Router>
  );
};

export default App;
