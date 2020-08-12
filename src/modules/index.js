import { combineReducers } from 'redux';
import newsList from './newsList';

const rootReducer = combineReducers({
  newsList,
});

export default rootReducer;
