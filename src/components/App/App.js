import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import GlobalStyles from "../GlobalStyles";
import ArtistRoute from '../ArtistRoute';
import {useDispatch} from "react-redux";
import {requestAccessToken, receiveAccessToken, receiveAccessTokenError} from '../../actions';

const DEFAULT_ARTIST_ID='6fWVd57NKTalqvmjRd2t8Z'; //24kGoldn
const defaultPath = "/artists/"+DEFAULT_ARTIST_ID;

const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res)=>res.json())
      .then((res)=>{
        dispatch(receiveAccessToken(res.access_token));
      })
      .catch((error)=>{
        console.error(error);
        dispatch(receiveAccessTokenError());
      })
},[]);

  return <Router>
    <GlobalStyles/>
    <Switch>
    <Route exact path='/'>
        <Redirect to={defaultPath}/>
      </Route>
      <Route exact path='/artists/:id'>
        <ArtistRoute/>
      </Route>
    </Switch>
  </Router>;
};



export default App;
