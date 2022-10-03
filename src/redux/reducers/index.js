import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import somarTodos from './somatorio';

const rootReducer = combineReducers({ user, wallet, somarTodos });

export default rootReducer;
