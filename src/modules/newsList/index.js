import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';
import { getHeadlines } from '../../apis/newsListApi';

//http
const INIT = 'newsList/INIT';
const LOADING = 'newsList/LOADING';
const END = 'newsList/END';
const FAIL = 'newsList/FAIL';
const SET_PARAMS = 'newsList/SET_PARAMS';
const SET_NEWS = 'newsList/SET_NEWS';

//action
const initCategoryState = {
  isLoading: false,
  isEnd: false,
  isFail: false,
  failMessage: '',
  params: {
    country: 'kr',
    page: 1,
    pageSize: 10,
    category: '',
  },
  results: { totalResults: 0, articles: [] },
};

export const init = createAction(INIT, (category) => {
  return {
    category,
    init: produce(initCategoryState, (draft) => draft),
  };
});

export const loading = createAction(LOADING, (category, isLoading) => {
  return {
    category,
    isLoading,
  };
});
export const end = createAction(END, (category, isEnd) => {
  return {
    category,
    isEnd,
  };
});
export const fail = createAction(FAIL, (category, isFail, failMessage) => {
  return {
    category,
    isFail,
    failMessage,
  };
});
export const setNews = createAction(SET_NEWS, (category, datas) => {
  return {
    category,
    datas,
  };
});
export const setParams = createAction(SET_PARAMS, (category, params) => {
  return {
    category,
    params,
  };
});

//thunk
export const getNews = (category, params) => async (dispatch) => {
  dispatch(loading(category, true));
  try {
    const response = await getHeadlines(params);
    if (response.data.articles.length === 0) {
      dispatch(end(category, true));
    } else {
      dispatch(setNews(category, response.data));
    }
  } catch (e) {
    dispatch(fail(category, true, e));
  }
  dispatch(loading(category, false));
};

/**
 * {
 *  [category]: {
 *  }
 * }
 */

const initialState = {};

const newsList = handleActions(
  {
    [INIT]: (state, { payload }) => {
      const { category, init } = payload;

      if (state[category]) {
        return state;
      }

      return produce(state, (draft) => {
        draft[category] = init;
      });
    },

    [LOADING]: (state, { payload }) => {
      const { category, isLoading } = payload;

      return produce(state, (draft) => {
        draft[category].isLoading = isLoading;
      });
    },

    [END]: (state, { payload }) => {
      const { category, isEnd } = payload;

      return produce(state, (draft) => {
        draft[category].isEnd = isEnd;
      });
    },

    [FAIL]: (state, { payload }) => {
      const { category, isFail, failMessage } = payload;

      return produce(state, (draft) => {
        draft[category].isFail = isFail;
        draft[category].failMessage = failMessage;
      });
    },

    [SET_PARAMS]: (state, { payload }) => {
      const { category, params } = payload;

      return produce(state, (draft) => {
        draft[category].params = params;
      });
    },

    [SET_NEWS]: (state, { payload }) => {
      const { category, datas } = payload;
      const { totalResults, articles } = datas;

      return produce(state, (draft) => {
        draft[category].results = {
          totalResults,
          articles:
            articles && draft[category].results.articles.concat(articles),
        };
      });
    },
  },
  initialState
);

export default newsList;

//https://ui.toast.com/weekly-pick/ko_20151117/
//https://velog.io/@nakta/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%A0%91%ED%95%B4%EB%B3%B4%EB%8A%94-%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-
//https://meetup.toast.com/posts/111
