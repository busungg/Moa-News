import { getHeadlines } from './index';

it('should get 10 headline news', async () => {
  const response = await getHeadlines({ page: 1, pageSize: 10, country: 'kr' });
  expect(response.data.articles.length).toBe(10);
});
