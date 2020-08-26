import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { getHeadlines } from '../../apis/newsListApi';

//http
const GET_NEWS = 'newsList/GET_NEWS';
const GET_NEWS_SUCCESS = 'newsList/GET_NEWS_SUCCESS';
const GET_NEWS_FAILURE = 'newsList/GET_NEWS_FAILURE';

const SET_NEWS = 'newsList/SET_NEWS';

/**
 * 로딩 표시 필요
 * dispatch(loading);
 */
export const getNews = (params) => async (dispatch) => {
  dispatch({ type: GET_NEWS, payload: params });
  try {
    const response = await getHeadlines(params);
    dispatch({ type: GET_NEWS_SUCCESS, payload: response.data });
  } catch (e) {}
};

const initialState = {
  params: {
    country: 'kr',
    page: 0,
    pageSize: 10,
  },
  results: { totalResults: 0, articles: [] },
  loading: false,
};

const newsList = handleActions(
  {
    [GET_NEWS]: (state, { payload: params }) => {
      return produce(state, (draft) => {
        draft.params = params;
        draft.loading = true;
      });
    },

    [GET_NEWS_SUCCESS]: (state, { payload: datas }) => {
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
