import{GET_PLAYERS, GET_SEARCH_PLAYER, GET_PLAYER_PROFILE,PUT_PLAYER_MODIFY, ORDER_BY_ELO} from "./GetPlayersAction"

const initialState = {
    players: [],
    playerSearch: [],
    playerProfile:{}
}

export default function getPlayersReducer (state = initialState, action){
    switch (action.type) {    
        case GET_PLAYERS:
            return {
                ...state,
                players: action.payload,
                playerSearch: [],

            }
        case GET_SEARCH_PLAYER:
            return {
                ...state,
                playerSearch: action.payload
            }
        case GET_PLAYER_PROFILE:
            return {
                ...state,
                playerProfile: action.payload[0]
            }
        case PUT_PLAYER_MODIFY:
            return {
                ...state,
                playerProfile: action.payload,
            }
        case ORDER_BY_ELO:
            let orderPlayers=[]
            if(state.playerSearch.length){
                orderPlayers= state.playerSearch.slice().sort(function (a, b) {
                    if (a.elo < b.elo) {
                      return 1;
                    }
                    if (a.elo > b.elo) {
                      return  -1;
                    }
            
                    return 0;
                  }); 
                  console.log(orderPlayers)
                  return {
                    ...state,
                    playerSearch: orderPlayers,
                }

                  
            }else{
                orderPlayers= state.players.slice().sort(function (a, b) {
                    if (a.elo < b.elo) {
                      return 1;
                    }
                    if (a.elo > b.elo) {
                      return  -1;
                    }
            
                    return 0;
                  }); 
                  console.log(orderPlayers)

                  return {
                    ...state,
                    players: orderPlayers,
                }
            }
        default:
            return state;
    }
}