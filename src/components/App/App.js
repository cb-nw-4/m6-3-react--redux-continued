import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import GlobalStyles from '../GlobalStyles';
import ArtistRoute from '../ArtistRoute';
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError
} from '../../actions';

const DEFAULT_ARTIST_ID = '11Y54BxlxC3UIAUkU2eadQ';

const App = () => {
  const dispatch = useDispatch();

  // Grab an access token from the backend
  useEffect(() => {
    dispatch(requestAccessToken());
    fetch('/spotify_access_token')
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        dispatch(receiveAccessTokenError());
      })
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to={'/artists/' + DEFAULT_ARTIST_ID} />
          </Route>
          <Route exact path="/artists/:id">
            <ArtistRoute />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
