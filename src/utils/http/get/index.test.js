import axios from 'axios';
import httpGet from './index';

//jest.mock('axios');
//Interceptors 을 통해 중간에 탈취 가능
describe('test http get method', () => {
  let url, params, headers;

  beforeAll(() => {
    url = 'https://newsapi.org/v2/top-headlines';
    params = {
      country: 'kr',
      page: 1,
      pageSize: 10,
    };
    headers = {
      ['X-Api-Key']: 'efed9e5affd44cb7a0a5c1e4eb552141',
    };
  });

  test('should contain api key in header', async () => {
    let expected;

    const interceptor = function (config) {
      expected = config.headers['X-Api-Key'];
      throw 'test';
    };
    const rejectInterceptor = axios.interceptors.request.use(interceptor);

    try {
      await httpGet(url, params, headers);
    } catch (e) {
      console.log(e);
    }

    axios.interceptors.request.eject(rejectInterceptor);

    expect(expected).not.toBeUndefined();
    expect(expected).toBe('efed9e5affd44cb7a0a5c1e4eb552141');
  });

  test('should contain query string in url', async () => {
    let expected;

    const interceptor = function (config) {
      expected = config.params;
      throw 'test';
    };
    const rejectInterceptor = axios.interceptors.request.use(interceptor);

    try {
      await httpGet(url, params, headers);
    } catch (e) {
      console.log(e);
    }

    axios.interceptors.request.eject(rejectInterceptor);

    expect(expected.country).toBe('kr');
    expect(expected.page).toBe(1);
    expect(expected.pageSize).toBe(10);
  });

  test('is success http get ', async () => {
    let expected;
    try {
      expected = await httpGet(url, params, headers);
    } catch (e) {
      console.log(e);
    }

    expect(expected).not.toBeUndefined();
    expect(expected.data.articles.length).toBe(10);
  });
});
