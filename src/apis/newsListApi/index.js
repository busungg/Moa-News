import httpGet from '../../utils/http/get';

const headers = {
  ['X-Api-Key']: 'efed9e5affd44cb7a0a5c1e4eb552141',
};

export const getHeadlines = async (params) => {
  const response = await httpGet(
    'https://newsapi.org/v2/top-headlines',
    params,
    headers
  );

  return response;
};
