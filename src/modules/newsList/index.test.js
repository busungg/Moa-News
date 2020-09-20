import produce from 'immer';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import newsList, {
  init,
  loading,
  end,
  fail,
  setParams,
  setNews,
  getNews,
} from './index';

//using mock
const mockStore = configureStore([ReduxThunk]);

//using jest axios mock
jest.mock('axios');

const INIT = 'newsList/INIT';
const LOADING = 'newsList/LOADING';
const END = 'newsList/END';
const FAIL = 'newsList/FAIL';
const SET_PARAMS = 'newsList/SET_PARAMS';
const SET_NEWS = 'newsList/SET_NEWS';

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

describe('newsList action test', () => {
  it('should send init action', () => {
    const action = init(1);
    const expectedAction = {
      type: INIT,
      payload: {
        category: 1,
        init: initCategoryState,
      },
    };
    expect(action).toEqual(expectedAction);
  });

  it('should send loading action', () => {
    const action = loading(1, true);
    const expectedAction = {
      type: LOADING,
      payload: {
        category: 1,
        isLoading: true,
      },
    };
    expect(action).toEqual(expectedAction);
  });

  it('should send set param action', () => {
    const params = {
      country: 'kr',
      page: 1,
      pageSize: 10,
    };

    const action = setParams(1, params);
    const expectedAction = {
      type: SET_PARAMS,
      payload: {
        category: 1,
        params,
      },
    };
    expect(action).toEqual(expectedAction);
  });

  it('should send end action', () => {
    const action = end(1, true);
    const expectedAction = { type: END, payload: { category: 1, isEnd: true } };
    expect(action).toEqual(expectedAction);
  });

  it('should send fail action', () => {
    const action = fail(1, true, 'Error Action Test');
    const expectedAction = {
      type: FAIL,
      payload: { category: 1, isFail: true, failMessage: 'Error Action Test' },
    };

    expect(action).toEqual(expectedAction);
  });

  it('should send set news action', () => {
    const data = { datas: 123 };
    const action = setNews(1, data);
    const expectedAction = {
      type: SET_NEWS,
      payload: { category: 1, datas: data },
    };

    expect(action).toEqual(expectedAction);
  });
});

describe('newsList reducer test', () => {
  let initState = beforeEach(() => {
    initState = produce(
      {
        1: initCategoryState,
      },
      (draft) => draft
    );
  });

  it('should set new loading state', () => {
    const state = newsList(initState, loading(1, true));
    const expectedState = produce(state, (draft) => {
      draft[1].isLoading = true;
    });
    expect(state).toEqual(expectedState);
  });

  it('should set new set param state', () => {
    const params = {
      country: 'kr',
      page: 1,
      pageSize: 10,
    };

    const state = newsList(initState, setParams(1, params));
    const expectedState = produce(state, (draft) => {
      draft[1].params = params;
    });

    expect(state).toEqual(expectedState);
  });

  it('should send end action', () => {
    const state = newsList(initState, end(1, true));
    const expectedState = produce(state, (draft) => {
      draft[1].isEnd = true;
    });

    expect(state).toEqual(expectedState);
  });

  it('should set new fail state', () => {
    const state = newsList(initState, fail(1, true, 'TEST FAIL'));
    const expectedState = produce(state, (draft) => {
      draft[1].isFail = true;
      draft[1].failMessage = 'TEST FAIL';
    });

    expect(state).toEqual(expectedState);
  });

  it('should set new data state', () => {
    const payload = { totalResults: 5, articles: [1, 2, 3, 4, 5] };

    const state = newsList(initState, setNews(1, payload));
    const expectedState = produce(state, (draft) => {
      draft[1].results = payload;
    });

    expect(state).toEqual(expectedState);
  });
});

describe('newsList thunk test', () => {
  let initialState, params;

  beforeAll(() => {
    initialState = {
      1: {
        isLoading: false,
        isFail: false,
        failMessage: '',
        params: {
          country: 'kr',
          page: 0,
          pageSize: 10,
        },
        results: { totalResults: 0, articles: [] },
      },
    };

    params = {
      country: 'test-kr2',
      page: 1,
      pageSize: 20,
    };
  });

  it('should be success', async () => {
    const data = { totalResults: 5, articles: [1, 2, 3, 4, 5] };
    axios.get.mockResolvedValue({ data });

    const store = mockStore(initialState);
    await store.dispatch(getNews(1, params));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: LOADING,
      payload: { category: 1, isLoading: true },
    });
    expect(actions[1]).toEqual({
      type: SET_NEWS,
      payload: { category: 1, datas: data },
    });
    expect(actions[2]).toEqual({
      type: LOADING,
      payload: { category: 1, isLoading: false },
    });
  });

  it('should be success but articles is Empty', async () => {
    const data = { totalResults: 5, articles: [] };
    axios.get.mockResolvedValue({ data });

    const store = mockStore(initialState);
    await store.dispatch(getNews(1, params));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: LOADING,
      payload: { category: 1, isLoading: true },
    });
    expect(actions[1]).toEqual({
      type: END,
      payload: { category: 1, isEnd: true },
    });
    expect(actions[2]).toEqual({
      type: LOADING,
      payload: { category: 1, isLoading: false },
    });
  });

  it('should be fail', async () => {
    const data = 'API Fail';
    axios.get.mockRejectedValue(data);

    const store = mockStore(initialState);
    await store.dispatch(getNews(1, params));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: LOADING,
      payload: { category: 1, isLoading: true },
    });
    expect(actions[1]).toEqual({
      type: FAIL,
      payload: { category: 1, isFail: true, failMessage: 'API Fail' },
    });
    expect(actions[2]).toEqual({
      type: LOADING,
      payload: { category: 1, isLoading: false },
    });
  });
});
