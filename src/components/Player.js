// import './App.css';
import React, { useState , useEffect , useContext ,Fragment} from 'react';
import {PlayerContext} from "../contexts/PlayerContext.js";

function Player() {
  // const player = PlayerContext;
  const {state:{current_url}, dispatch} = useContext(PlayerContext);
  return (
    <Fragment>
      <video controls >
        <source src={current_url}></source>
      </video>
    </Fragment>

  );
}

export default Player;
