import React from 'react';
import {  Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import GlobalStyles from "../../GlobalStyles";
import ArtistRoute from "../../ArtistRoute";
import { useDispatch } from "react-redux";
import { requestAccessToken, receiveAccessToken, receiveAccessTokenError } from '../../actions';


const DEFAULT_ARTIST_ID = '37i9dQZF1DX8GjsySWIS1x';

const App = () => {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveAccessToken(json.access_token));
        console.log(json,"xxxxxxxxxxxxxxxxx");
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError(err));
      });
  }, []);
  return (
    <BrowserRouter>
    <GlobalStyles />

      <Switch>
        {/* <Main> */}
          <Route exact path="/artists/:id">
          <ArtistRoute />
          </Route>
          <Redirect to="/artists/${DEFAULT_ARTIST_ID}" />
        {/* </Main> */}
      </Switch>
    </BrowserRouter>
  )
  
};

export default App;
