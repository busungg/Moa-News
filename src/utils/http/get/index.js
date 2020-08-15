import { makeUrl } from '../utils';
const axios = require('axios').default;

const httpGet = async (url, params, headers) => {
  const response = await axios.get(makeUrl(url, params), {
    headers: {
      ...headers,
    },
  });

  return response;
};

export default httpGet;
