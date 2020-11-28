import './Player.css';
import React, { useState , useEffect , useContext ,Fragment, createRef} from 'react';
import {PlayerContext} from "../contexts/PlayerContext.js";
import { Link, Redirect, useHistory } from 'react-router-dom'
// import VideoPlayer from 'react-video-js-player';

function Player() {
  // const player = PlayerContext;
  
  const history = useHistory();
  const {state:{current_url}, dispatch} = useContext(PlayerContext);

  const ref = createRef();
  const refs = [...Array(6)].map(_=>createRef())
 
  useEffect(function(){
    ref.current.load();
  })

  const loadedmetadata = async()=>{
    const duration = (ref.current.duration);
    console.log(duration);
    console.log(ref);
    await new Promise(resolve => ref.current.addEventListener('canplay',event=>{
      resolve();
    },{once:true}));
    for(const [index, r]  of refs.entries()){
      ref.current.currentTime = duration/refs.length*(index);
      await new Promise(resolve => ref.current.addEventListener('canplay',event=>{
        r.current.getContext('2d').drawImage(ref.current, 0, 0,500, 300);
        resolve();
      },{once:true}));

    }

    // await new Promise(resolve => ref.current.addEventListener('canplay',event=>{
    //   resolve();
    // },{once:true}));
    // ref.current.currentTime = duration/5*0*10;
    // await new Promise(resolve => ref.current.addEventListener('canplay',event=>{
    //   ref1.current.getContext('2d').drawImage(ref.current, 0, 0,500, 300);
    //   resolve();
    // },{once:true}));
     
    // ref.current.currentTime = duration/5*1;
    // await new Promise(resolve => ref.current.addEventListener('canplay',event=>{
    //   ref2.current.getContext('2d').drawImage(ref.current, 0, 0,500, 300);
    //   resolve();
    // },{once:true}));

    // ref.current.currentTime = duration/5*2;
    // await new Promise(resolve => ref.current.addEventListener('canplay',event=>{
    //   ref3.current.getContext('2d').drawImage(ref.current, 0, 0,500, 300);
    //   resolve();
    // },{once:true}));

    // ref.current.currentTime = duration/5*3;
    // await new Promise(resolve => ref.current.addEventListener('canplay',event=>{
    //   ref4.current.getContext('2d').drawImage(ref.current, 0, 0,500, 300);
    //   resolve();
    // },{once:true}));

    // ref.current.currentTime = duration/5*4;
    // await new Promise(resolve => ref.current.addEventListener('canplay',event=>{
    //   ref5.current.getContext('2d').drawImage(ref.current, 0, 0,500, 300);
    //   resolve();
    // },{once:true}));

    // ref.current.currentTime = parseInt(duration/5*4.5);
    // await new Promise(resolve => ref.current.addEventListener('canplay',event=>{
    //   ref6.current.getContext('2d').drawImage(ref.current, 0, 0,500, 300);
    //   ref.current.currentTime = 0;
    //   resolve();
    // },{once:true}));

    // ref5.current.getContext('2d').drawImage(ref.current, 0, 0,100, 100);
   
    
  }
  const onclickpreview =(i)=>{
    const duration = (ref.current.duration);
    ref.current.currentTime = duration/refs.length*i;
  }
  return (
    <Fragment>
      
      <div className="player">
        <div className="canvas">
          {
            refs.map((r,i)=>(
              <canvas ref={r} className="preveiw2" width="500px" height="300px" onClick={()=>onclickpreview(i)}/>
            ))
          
          }
          {/* <canvas ref={ref1} className="preveiw1" width="500px" height="300px" onClick={()=>onclickpreview(0)}/>
          
          <canvas ref={ref3} className="preveiw3" width="500px" height="300px" onClick={()=>onclickpreview(2)}/>
          <canvas ref={ref4} className="preveiw4" width="500px" height="300px" onClick={()=>onclickpreview(3)}/>
          <canvas ref={ref5} className="preveiw5" width="500px" height="300px" onClick={()=>onclickpreview(4)}/>    */}
          
          {/* <canvas ref={ref6} className="preveiw5" width="500px" height="300px" onClick={()=>onclickpreview(4.5)}/>      */}
        </div>
        <video id="videoplayer" controls autoplay ref={ref} onLoadedMetadata={loadedmetadata}>
          <source src={current_url}></source>
        </video>
      </div>
     
         
    </Fragment>

  );
}

export default Player;
