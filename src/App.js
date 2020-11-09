
import './App.css';
import React, { useState , useEffect, useContext} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PlayerContextProvider from "./contexts/PlayerContext.js";
import {PlayerContext} from "./contexts/PlayerContext.js";
import VideoList from "./components/VideoList.js";
import Player from './components/Player.js'

function App() {

  return (
      <PlayerContextProvider>
        <Router>
          <Route exact path='/' component={VideoList}/>
          <Route path='/player' component={Player}/>
        </Router>
      </PlayerContextProvider>

  );
}

export default App;
