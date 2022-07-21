import { combineReducers } from 'redux';
import reducer from './Profiles/profiles-reducer';
import playerLoginReducer from './PlayerLogin/PlayerLoginReducer';

export const reducers = combineReducers({
    reducer: reducer,
    playerLoginReducer: playerLoginReducer
})

export default reducers;
 