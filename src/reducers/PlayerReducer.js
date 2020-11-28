
// 下のuserReducerの引数actionは
// dispatch関数を用いて送られてきたオブジェクトが入ります
export const PlayerReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_PLAYURL':
          return ({
            ...state,
            current_url: action.payload
          })
        case 'RESET_PLAYURL':
          return({
            ...state,
            current_url: ""
          })
        case 'UPDATE_VIDEOLIST':
          return({
            ...state,
            videolist: action.payload,
            visibleList: action.payload
          })
        case 'UPDATE_VISIBLE_LIST':
          return({
            ...state,
            visibleList: action.payload
          })
        case 'REVERSE_VIDEO_LIST':
          return({
            ...state,
            videolist: state.videolist.reverse()
          })

        default:
          return state
    }
}
