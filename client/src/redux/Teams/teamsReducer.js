import { CREATE_TEAM } from "./teamsActions";// aca traer las variables de las actions

const initialState ={
    teams:[],
}

const teamsReducer = (state = initialState , action)=>{
    switch (action.type) {
        case CREATE_TEAM:
            return{
                ...state,
                teams: [...state.teams, action.payload],
                
            }
            
        default:
            return state
    }
}

export default teamsReducer;