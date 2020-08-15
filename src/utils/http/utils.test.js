import { makeUrl } from './utils';

test('check makeUrl', () => {
  const url = '1';
  const params = {
    a: 1,
    b: 2,
  };

  const result = `${url}?a=${params.a}&b=${params.b}`;

  expect(makeUrl(url, params)).toBe(result);
});
