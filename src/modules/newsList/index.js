import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

//status
const SET_PARAM = 'newsList/SET_PARAM';

//http
const GET_NEWS = 'newsList/GET_NEWS';
const SET_NEWS = 'newsList/SET_NEWS';

export const setParams = createAction(SET_PARAM);
export const getNews = createAction(GET_NEWS);
export const setNews = createAction(SET_NEWS);

const initialState = {
  params: {
    page: 0,
    pageSize: 10,
  },
  results: { totalResults: 0, articles: [] },
};

const newsList = handleActions(
  {
    [SET_PARAM]: (state, { payload: params }) => {
      return produce(state, (draft) => {
        draft.params = params;
      });
    },
    [GET_NEWS]: (state, { payload }) => state,
    [SET_NEWS]: (state, { payload: datas }) => {
      return produce(state, (draft) => {
        const { totalResults, articles } = datas;
        draft.results = {
          totalResults,
          articles: articles && articles.concat(draft.results.articles),
        };
      });
    },
  },
  initialState
);

export default newsList;
