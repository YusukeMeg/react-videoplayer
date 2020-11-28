import './VideoList.css';
import React, { useState , useEffect , useContext , Fragment} from 'react';
import {PlayerContext} from "../contexts/PlayerContext.js";
import Player from "../components/Player.js"
import { Link, useHistory } from 'react-router-dom'


function VideoList() {
  const {state:{current_url,videolist,visibleList}, dispatch} = useContext(PlayerContext);
  const history = useHistory();
  const [selectedQuality, setSelectedQuality] = useState();
  const [listReverse,setListReverse] = useState(false);
  useEffect(async () => {
    const result = await fetch(
      'api/list',
    ).then(res=>{
      return res.json()
    });
    // await new Promise((resolve)=>{
    //   setTimeout(()=>{
    //     resolve()
    //   },3000)
    // })
    dispatch({
      type:"UPDATE_VIDEOLIST",
      payload:result
    })
  }, []);

  const updateCurrentPlay = (e)=>{
    const url = `api/video/${e.name}`;
    dispatch({
      type: "UPDATE_PLAYURL",
      payload: url
    })

    // history.push("/player")
  }
  const sortList = (e)=>{
    dispatch({
      type:"UPDATE_VISIBLE_LIST",
      payload:[...videolist.slice(0,2)]
    })
  }

  const resetCurrentPlay= ()=>{
    dispatch({
      type: "RESET_PLAYURL"
    })

  }
  const toggleOrder = ()=>{
      dispatch({
        type:"REVERSE_VIDEO_LIST"
      })
      setListReverse(!listReverse)
  }

  return (
    <Fragment>
      <Link to='/manage'>link</Link>
      <div className="menu">
        <button onClick={sortList}>limit</button>
        <select onChange={(event)=>{
            console.log(event.target.value)
            setSelectedQuality(event.target.value);
            }}>
          <option value="">All</option>
          <option value="480P">480P</option>
          <option value="720P">720P</option>
          <option value="1080P">1080P</option>
          <option value="1440P">1440P</option>
        </select>
        <button onClick={toggleOrder}>{listReverse?"△":"▽"}</button>
        <button onClick={resetCurrentPlay}> close player</button>
      </div>


      { visibleList
        .filter(e=>(!selectedQuality||e.quality == selectedQuality))
        .map((e,i)=>{
          const thumbs_url = e.thumnale;
          return(
            <img key={i} src={thumbs_url} onClick={()=>updateCurrentPlay(e)} width="320" height="240"/>
          )
        }
      )}
      {current_url &&
        <Player />
      }
    </Fragment>

  );
}

export default VideoList;
