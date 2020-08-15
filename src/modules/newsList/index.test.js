import newsList, { setParams, setNews } from './index';

//using mock

/**
 * set param test
 */
it('set params', () => {
  const state = newsList(undefined, setParams({ page: 5 }));

  expect(state.params.page).toBe(5);
});

/**
 * set data totalResults
 */
it('set data totalResults', () => {
  const state = newsList(undefined, setNews({ totalResults: 5 }));

  expect(state.results.totalResults).toBe(5);
});

/**
 * set data articles
 */
it('set data articles', () => {
  const state = newsList(undefined, setNews({ articles: [1, 2, 3, 4, 5] }));

  expect(state.results.articles.length).toBe(5);
  expect(state.results.articles.indexOf(1)).not.toBe(-1);
});
