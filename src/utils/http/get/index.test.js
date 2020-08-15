import httpGet from './index';
const axios = require('axios');

jest.mock('axios');
//Interceptors 을 통해 중간에 탈취 가능
describe('test http get method', () => {
  let url, params, headers;

  beforeAll(() => {
    url = '1';
    params = {
      a: 1,
      b: 2,
    };
    headers = {
      ['X-Api-Key']: '1',
    };
  });

  test('should contain api key in header', () => {
    httpGet(url, params, headers);
  });

  test('should contain query string in url', () => {});
});
