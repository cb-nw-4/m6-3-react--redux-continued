import React, {useEffect} from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {useDispatch} from "react-redux";

import GlobalStyle from '.././GlobalStyles';
import ArtistRoute from './ArtistRoute.js';
import { requestAccessToken, receiveAccessToken, receiveAccessTokenError } from '../.././actions.js';

const DEFAULT_ARTIST_ID = '3WrFJ7ztbogyGnTHbHJFl2';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestAccessToken());

    fetch('/spotify_access_token')
    .then((res) => res.json())
    .then((response) => {
      dispatch(receiveAccessToken(response.access_token));
    })
    .catch((error) => {
      dispatch(receiveAccessTokenError());
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/artists/:id">
            <ArtistRoute />
          </Route>
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Switch>
      </Router>
    </>
  
    );
};

export default App;