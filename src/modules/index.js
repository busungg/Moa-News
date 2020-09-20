import { combineReducers } from 'redux';
import newsList from './newsList';
import newsCategory from './newsCategory';

const rootReducer = combineReducers({
  newsList,
  newsCategory,
});

export default rootReducer;
