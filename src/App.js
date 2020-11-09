
import './App.css';
import React, { useState , useEffect} from 'react';
import Player from "./components/Player.js";
import AppContext from "./contexts/AppContext.js";

function App() {
  const [list,setList] = useState([]);
  const [player,setPlayer]= useContext(AppContext);
  const [visibleList,setVisibleList] = useState([]);

  // const onclick = ()=>({data:[...list.data,"bbb"]})
  // const imageList =(l)=>(<p>l.data[0]</p>)
  useEffect(async () => {
    const result = await fetch(
      'http://localhost:3000/api/videolist.json',
    ).then(res=>{
      return res.json()
    });
    setList(result.data);
    setVisibleList(result.data)
  }, []);

  const updateCurrentPlay = (e)=>{
    const url = `video/${e}.ts`
    setPlayer({...player,current_play:url})
  }
  const sortList = (e)=>{
    setVisibleList([...list.slice(0,2)])
  }

  return (
    <AppContext.Provider>
      <div>
        <button onClick={sortList}>limit</button>
        {visibleList.map((e,i)=>{
          const thumbs_url = `thumbs/${e}.jpg`
          return(
            <img key={i} src={thumbs_url} onClick={()=>updateCurrentPlay(e)} width="320" height="240"/>
          )
        })}
        {player.current_play &&
          <Player />
        }
      </div>
      </AppContext.Provider>

  );
}

export default App;
