import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { getHeadlines } from '../../apis/newsListApi';

//http
const LOADING = 'newsList/LOADING';
const FAIL = 'newsList/FAIL';
const SET_PARAMS = 'newsList/SET_PARAMS';
const SET_NEWS = 'newsList/SET_NEWS';

//action
export const loading = createAction(LOADING);
export const fail = createAction(FAIL, (isFail, failMessage) => {
  return {
    isFail,
    failMessage,
  };
});
export const setNews = createAction(SET_NEWS);
export const setParams = createAction(SET_PARAMS);

//thunk
export const getNews = (params) => async (dispatch) => {
  dispatch(loading(true));
  try {
    const response = await getHeadlines(params);
    dispatch(setParams(params));
    dispatch(setNews(response.data));
  } catch (e) {
    dispatch(fail(true, e));
  }
  dispatch(loading(false));
};

const initialState = {
  loading: false,
  isFail: false,
  failMessage: '',
  params: {
    country: 'kr',
    page: 0,
    pageSize: 10,
  },
  results: { totalResults: 0, articles: [] },
};

const newsList = handleActions(
  {
    [LOADING]: (state, { payload }) => {
      return produce(state, (draft) => {
        draft.loading = payload;
      });
    },

    [FAIL]: (state, { payload }) => {
      const { isFail, failMessage } = payload;

      return produce(state, (draft) => {
        draft.isFail = isFail;
        draft.failMessage = failMessage;
      });
    },

    [SET_PARAMS]: (state, { payload: params }) => {
      return produce(state, (draft) => {
        draft.params = params;
      });
    },

    [SET_NEWS]: (state, { payload: datas }) => {
      return produce(state, (draft) => {
        const { totalResults, articles } = datas;
        draft.results = {
          totalResults,
          articles: articles && articles.concat(draft.results.articles),
        };
        draft.loading = false;
      });
    },
  },
  initialState
);

export default newsList;

//https://ui.toast.com/weekly-pick/ko_20151117/
//https://velog.io/@nakta/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%A0%91%ED%95%B4%EB%B3%B4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-
//https://meetup.toast.com/posts/111
