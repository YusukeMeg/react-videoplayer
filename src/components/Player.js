// import './App.css';
import React, { useState , useEffect} from 'react';
import AppContext from "../contexts/AppContext.js";

function Player(props) {
  const player = AppContext;
  return (
    <AppContext.Consumer>
      <video controls>
        <source src={player.current_play}></source>
      </video>
    </AppContext.Consumer>

  );
}

export default Player;
