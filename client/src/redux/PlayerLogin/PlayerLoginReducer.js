import { POST_PLAYER } from "./PlayerLoginActions";

const initialState = {
  player: {}
}

export default function playerLoginReducer(state = initialState, action) {
  switch (action.type) {
    case POST_PLAYER:
      return {
        ...state
      }
    default:
      return state 
  }
}