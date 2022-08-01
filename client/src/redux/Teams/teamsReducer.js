import { CREATE_TEAM, GET_TEAM_USER } from "./teamsActions";// aca traer las variables de las actions

const initialState ={
    userTeams:[],
}

const teamsReducer = (state = initialState , action)=>{
    switch (action.type) {
        case CREATE_TEAM:
            console.log("lo que llego",action.payload)
            return{
                ...state,
                userTeams: [...state.teams, action.payload],
                
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