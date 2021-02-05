import React from 'react';
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect, } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import ArtistRoute from './ArtistRoute';
import { useDispatch, useSelector } from 'react-redux';

import { requestAccessToken, receiveAccessToken, receiveAccessTokenError } from '../../actions';


const DEFAULT_ARTIST_ID = '6M2wZ9GZgrQXHCFfjv46we';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(requestAccessToken());
    fetch('/spotify_access_token')
      .then((res)=>res.json())
      .then((json)=> {
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err)=> dispatch(receiveAccessTokenError()))
  },[]);

  const state = useSelector(state => state);
  console.log(state);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Route>
        <Route path="/artists/:id">
          <ArtistRoute/>
        </Route>
      </Switch>
      <GlobalStyles />
    </Router>
  );
};

export default App;
