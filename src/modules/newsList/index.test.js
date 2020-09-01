import axios from 'axios';
import configureStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import newsList, {
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

const LOADING = 'newsList/LOADING';
const END = 'newsList/END';
const FAIL = 'newsList/FAIL';
const SET_PARAMS = 'newsList/SET_PARAMS';
const SET_NEWS = 'newsList/SET_NEWS';

describe('newsList action test', () => {
  it('should send loading action', () => {
    const action = loading(true);
    const expectedAction = { type: LOADING, payload: true };
    expect(action).toEqual(expectedAction);
  });

  it('should send set param action', () => {
    const params = {
      country: 'kr',
      page: 1,
      pageSize: 10,
    };

    const action = setParams(params);
    const expectedAction = { type: SET_PARAMS, payload: params };
    expect(action).toEqual(expectedAction);
  });

  it('should send end action', () => {
    const action = end(true);
    const expectedAction = { type: END, payload: true };
    expect(action).toEqual(expectedAction);
  });

  it('should send fail action', () => {
    const action = fail(true, 'Error Action Test');
    const expectedAction = {
      type: FAIL,
      payload: { isFail: true, failMessage: 'Error Action Test' },
    };

    expect(action).toEqual(expectedAction);
  });

  it('should send set news action', () => {
    const action = setNews({ datas: 123 });
    const expectedAction = {
      type: SET_NEWS,
      payload: { datas: 123 },
    };

    expect(action).toEqual(expectedAction);
  });
});

describe('newsList reducer test', () => {
  it('should set new loading state', () => {
    const state = newsList(undefined, loading(true));
    const expectedState = {
      ...state,
      isLoading: true,
    };

    expect(state).toEqual(expectedState);
  });

  it('should set new set param state', () => {
    const params = {
      country: 'kr',
      page: 1,
      pageSize: 10,
    };

    const state = newsList(undefined, setParams(params));
    const expectedState = {
      ...state,
      params,
    };

    expect(state).toEqual(expectedState);
  });

  it('should send end action', () => {
    const state = newsList(undefined, end(true));
    const expectedState = {
      ...state,
      isEnd: true,
    };
    expect(state).toEqual(expectedState);
  });

  it('should set new fail state', () => {
    const state = newsList(undefined, fail(true, 'TEST FAIL'));
    const expectedState = {
      ...state,
      isFail: true,
      failMessage: 'TEST FAIL',
    };

    expect(state).toEqual(expectedState);
  });

  it('should set new data state', () => {
    const payload = { totalResults: 5, articles: [1, 2, 3, 4, 5] };

    const state = newsList(undefined, setNews(payload));
    const expectedState = {
      ...state,
      results: payload,
    };

    expect(state).toEqual(expectedState);
  });
});

describe('newsList thunk test', () => {
  let initialState, params;

  beforeAll(() => {
    initialState = {
      isLoading: false,
      isFail: false,
      failMessage: '',
      params: {
        country: 'kr',
        page: 0,
        pageSize: 10,
      },
      results: { totalResults: 0, articles: [] },
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
    await store.dispatch(getNews(params));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: LOADING, payload: true });
    expect(actions[1]).toEqual({ type: SET_NEWS, payload: data });
    expect(actions[2]).toEqual({ type: LOADING, payload: false });
  });

  it('should be success but articles is Empty', async () => {
    const data = { totalResults: 5, articles: [] };
    axios.get.mockResolvedValue({ data });

    const store = mockStore(initialState);
    await store.dispatch(getNews(params));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: LOADING, payload: true });
    expect(actions[1]).toEqual({ type: END, payload: true });
    expect(actions[2]).toEqual({ type: LOADING, payload: false });
  });

  it('should be fail', async () => {
    const data = 'API Fail';
    axios.get.mockRejectedValue(data);

    const store = mockStore(initialState);
    await store.dispatch(getNews(params));

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: LOADING, payload: true });
    expect(actions[1]).toEqual({
      type: FAIL,
      payload: { isFail: true, failMessage: 'API Fail' },
    });
    expect(actions[2]).toEqual({ type: LOADING, payload: false });
  });
});
