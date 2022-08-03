import { CREATE_TEAM, GET_TEAM_USER } from "./teamsActions";// aca traer las variables de las actions

const initialState ={
    userTeams:[],
}

const teamsReducer = (state = initialState , action)=>{
    switch (action.type) {
        case CREATE_TEAM:
            return{
                ...state,
                userTeams: [...state.userTeams, action.payload],
                
            }
        case GET_TEAM_USER:
            return {
                ...state,
                userTeams: action.payload
            }
            
        default:
            return state
    }
}

export default teamsReducer;