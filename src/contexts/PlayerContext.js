import { createContext ,useReducer } from 'react';
import {PlayerReducer}  from "../reducers/PlayerReducer.js"

export const PlayerContext = createContext();

const initialState = {
  current_url: "",
  videolist:[...Array(10)].map((e,i)=>("mark_arrow_reload")),
  visibleList:[...Array(10)].map((e,i)=>("mark_arrow_reload"))
};

export const PlayerContextProvider = ({ children })=>{
  const [state, dispatch] = useReducer(PlayerReducer, initialState);
  return(
    <PlayerContext.Provider value={{state, dispatch}}>
      {children}
    </PlayerContext.Provider>
  )
}

export default PlayerContextProvider
