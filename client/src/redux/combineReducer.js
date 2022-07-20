import {combineReducers } from 'redux';
import reducer from './Profiles/profiles-reducer'
import getFieldsR from './DetailField/DetailField-reducer';

export const reducers = combineReducers({
    reducer: reducer,
    getFieldsR: getFieldsR,
})

export default reducers;
 