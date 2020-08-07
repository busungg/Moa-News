import React, { createContext, useReducer, useEffect } from 'react';
import produce from 'immer';
const axios = require('axios').default;

const getData = async ({ page, pageSize }) => {
  console.log(
    `https://newsapi.org/v2/top-headlines?country=kr&page=${page}&pageSize=${pageSize}`
  );

  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=kr&page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        ['X-Api-Key']: 'efed9e5affd44cb7a0a5c1e4eb552141',
      },
    }
  );

  return { status: response.status, data: response.data };
};

const initialState = {
  params: {
    page: 0,
    pageSize: 10,
  },
  isLoading: true,
  results: { totalResults: 0, articles: [] },
};

/**
 * 1. 어디에서든지 getData를 호출하면 다음 페이지를 불러오게 하고 싶다.
 * 2. useReducer에서는 async/await이 적용되지 않는다고 한다. -> 더 확실한 이유는 더 확인해본다.
 * 3. useEffect를 사용해야 하기 때문에 [] 안쪽에 page를 넣어서 호출을 조절하고 싶은데 page를 넣어버리게 되면
 *    getData에서 page를 올려버리기 때문에 계속 호출이 될 것이다.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'getData': {
      return produce(state, (draft) => {
        draft.isLoading = true;
        draft.params.page += 1;
      });
    }

    case 'setData':
      //action data
      return produce(state, (draft) => {
        if (action.data) {
          const { totalResults, articles } = action.data;

          draft.results.totalResults = totalResults;
          draft.results.articles = draft.results.articles.concat(articles);
        }
        draft.isLoading = false;
      });
    default:
      return state;
  }
};

const ContextHeadlines = createContext(undefined);
const ContextDispatch = createContext(undefined);

const HeadlinesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.params.page === 0) {
      dispatch({ type: 'getData' });
    } else {
      async function fetchData() {
        const { status, data } = await getData(state.params);

        if (status === 200) {
          dispatch({ type: 'setData', data });
        } else {
          dispatch({ type: 'setData', data: null });
        }
      }

      fetchData();
    }
  }, [state.params.page]);

  return (
    <ContextHeadlines.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>
        {state.isLoading && <div style={{ color: '#000000' }}>Loading</div>}
        {children}
      </ContextDispatch.Provider>
    </ContextHeadlines.Provider>
  );
};

const { Consumer: HeadlinesConsumer } = ContextHeadlines;
const { Consumer: DispatchConsumer } = ContextDispatch;

export { HeadlinesProvider, HeadlinesConsumer, DispatchConsumer };
