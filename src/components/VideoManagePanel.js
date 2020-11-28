// import './Player.css';
import React, { useState , useEffect , useContext ,Fragment, createRef} from 'react';
import {PlayerContext} from "../contexts/PlayerContext.js";
import { Link, useHistory } from 'react-router-dom'
// import VideoPlayer from 'react-video-js-player';

function VideoManagePanel() {
  // const player = PlayerContext;
  const [videoItem, setVideoItem] = useState([]);
  const [updateResult,setUpdateResult] = useState([]);
  const [inputLsValue,setInputLsValue] = useState("");
  const [inputNameValue,setInputNameValue] = useState("");
  const [inputIdValue,setInputIdValue] = useState(""); 

  const update_by_ls =async ()=>{
        const t = inputLsValue;

        const result =  [];
        for(const c of t.split("\n").filter(_=>_).map(e=>e.split(/\s+/)[8].replace(".mp4",""))){
            result.push(await fetch(`api/add/${c}`).then(e=>e.json()))
        }
        setUpdateResult(result);
  }
  const update_by_name =async ()=>{
      const t = inputNameValue;
      const result =  await fetch(`api/add/${t}`).then(e=>e.json());
      setUpdateResult([result]);
    }

  const delete_by_name = async (id)=>{
      const t = inputNameValue;
      const result =  await fetch(`api/delete/${id}`).then(e=>e.json());
    }

  
  return (
    <div>
        <label for="input_ls">ls *.mp4形式</label>
        <textarea value={inputLsValue} onChange={(event)=>{setInputLsValue(event.target.value)}} id="input_ls" type="text">
        </textarea>
        <button onClick={()=>{update_by_ls()}}>update</button>
        

        <label for="input_by_name">ex. 1080P_4000K_173142201</label>
        <textarea value={inputNameValue} onChange={event=>{setInputNameValue(event.target.value)}} id="input_by_name" type="text">
        </textarea>
        <button onClick={()=>update_by_name()}>update</button>
        {
            updateResult.map(result=>{
                return(
                    <>
                        <div>{result.name}</div>
                        <div>{result.status}</div>
                        {result.id&&<button onClick={()=>delete_by_name(result.id)}>削除</button>}
                    </>
                )
            })
        }
        <input value={inputIdValue} onChange={event=>{setInputIdValue(event.target.value)}}>
        </input>
        

    </div>

  );
}

export default VideoManagePanel;
