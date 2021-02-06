import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { requestAccessToken, receiveAccessToken, receiveAccessTokenError } from "../../actions";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ArtistRoute from "./ArtistRoute";

const DEFAULT_ARTIST_ID = "06HL4z0CvFAxyc27GXpf02";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        dispatch(receiveAccessToken(json.access_token))  
      })
      .catch((error) => {
        console.error(error)
        dispatch(receiveAccessTokenError())
      })
  }, [])

  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path="/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Route>
        <Route exact path="/artists/:id">
          <ArtistRoute />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
