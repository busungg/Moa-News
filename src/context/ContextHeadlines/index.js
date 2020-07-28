import React, { createContext, useReducer, useMemo, useEffect } from './react';
import axios from '../node_modules/axios/index';
import produce from 'immer';

const getData = async () => {
  const response = await axios.get(
    'https://newsapi.org/v2/top-headlines?country=kr',
    {
      headers: {
        ['X-Api-Key']: 'efed9e5affd44cb7a0a5c1e4eb552141',
      },
    }
  );
};

const initialState = {
  params: {
    page: 1,
    pageSize: 100,
    isLoading: true,
  },
  results: { totalResults: 0, articles: [] },
  dispatch: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'get':
      return produce(state, (draft) => {
        draft.params.isLoading = true;
        draft.params.page += 1;
      });
    default:
      return state;
  }
};

const ContextHeadlines = createContext(undefined);

const HeadlinesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initContext = useMemo(() => {
    return produce(state, (draft) => {
      draft.dispatch = dispatch;
    });
  }, []);

  useEffect(() => {}, [state.page]);

  return (
    <ContextHeadlines.Provider value={initContext}>
      {children}
    </ContextHeadlines.Provider>
  );
};

export default ContextHeadlines;
