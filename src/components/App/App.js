import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import GlobalStyles from "./GlobalStyles";
import ArtistRoute from "./ArtistRoute";
import { requestAccessToken, receiveAccessToken, receiveAccessTokenError } from "../../actions";
import { authReducer } from "../../reducers/auth-reducer";

const DEFAULT_ARTIST_ID = '4lpCk4elOX2vusSgqHVT56';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token", {
      method: "GET",
    })
    .then((res) => res.json())
    .then((json) => {
      dispatch(receiveAccessToken(json.access_token));
    })
    .catch((err) => {
      console.log(err);
      dispatch(receiveAccessTokenError());
    });
  }, []);

  return (
    <Router>
      <GlobalStyles />
        <Switch>
          <Route path={'/artists/:id'}>
            <ArtistRoute />
          </Route>
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`}/>
        </Switch>  
    </Router>
  );
};

export default App;
