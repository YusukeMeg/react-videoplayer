// import './App.css';
import React, { useState , useEffect , useContext , Fragment} from 'react';
import {PlayerContext} from "../contexts/PlayerContext.js";
import Player from "../components/Player.js"
import { Link, useHistory } from 'react-router-dom'


function VideoList() {
  const {state:{current_url,videolist,visibleList}, dispatch} = useContext(PlayerContext);
  const history = useHistory();
  useEffect(async () => {
    const result = await fetch(
      'http://localhost:3000/api/videolist.json',
    ).then(res=>{
      return res.json()
    });
    await new Promise((resolve)=>{
      setTimeout(()=>{
        resolve()
      },3000)
    })
    dispatch({
      type:"UPDATE_VIDEOLIST",
      payload:result.data
    })
  }, []);

  const updateCurrentPlay = (e)=>{
    const url = `video/${e}.MOV`;
    dispatch({
      type: "UPDATE_PLAYURL",
      payload: url
    })

    history.push("/player")
  }
  const sortList = (e)=>{
    dispatch({
      type:"UPDATE_VISIBLE_LIST",
      payload:[...videolist.slice(0,2)]
    })
  }

  return (
    <Fragment>
      <Link to='/player'>link</Link>
      <button onClick={sortList}>limit</button>
      {visibleList.map((e,i)=>{
        const thumbs_url = `thumbs/${e}.jpg`
        return(
          <img key={i} src={thumbs_url} onClick={()=>updateCurrentPlay(e)} width="320" height="240"/>
        )
      })}
      {current_url &&
        <Player />
      }
    </Fragment>

  );
}

export default VideoList;
