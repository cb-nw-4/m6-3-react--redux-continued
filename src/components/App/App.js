import React, { useEffect } from 'react';
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ArtistRoute from './ArtistRoute';
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from '../../actions';

const App = () => {
  const DEFAULT_ARTIST_ID= '1HY2Jd0NmPuamShAr6KMms';
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(requestAccessToken());

    fetch('/spotify_access_token')
      .then(res=>res.json())
      .then(res=>dispatch(receiveAccessToken(res.access_token)))
      .catch(err=>{
        console.log(err);
        dispatch(receiveAccessTokenError());
      });
  },[]);

  return (
    <>
      <Router>
        <Switch>
        <Router path='/artists/:id'>
          <ArtistRoute />
        </Router>
        <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`}/>
        </Switch>
      </Router>
      
    </>
  );
};

export default App;
