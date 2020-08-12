import produce from 'immer';

//status
const PARAM_SET = 'newsList/PARAM_SET';

//http
const DATA_GET = 'newsList/DATA_GET';
const DATA_SET = 'newsList/DATA_SET';

export const paramSet = (payload) => ({ type: PARAM_SET, payload });
export const dataGet = () => ({ type: DATA_GET });
export const dataSet = (payload) => ({ type: DATA_SET, payload });

const initialState = {
  params: {
    page: 0,
    pageSize: 10,
  },
  results: { totalResults: 0, articles: [] },
};

function newsList(state = initialState, { type, payload }) {
  switch (type) {
    case PARAM_SET:
      return produce(state, (draft) => {
        draft.params = payload;
      });

    case DATA_GET:
      return state;

    case DATA_SET:
      return produce(state, (draft) => {
        const { totalResults, articles } = payload;
        draft.results = {
          totalResults,
          articles: articles && articles.concat(draft.results.articles),
        };
      });

    default:
      return state;
  }
}

export default newsList;
