import axios from 'axios';

//const axios = require('axios').default;

export const httpGet = async (url, params, headers) => {
  const response = await axios.get(url, {
    params: {
      ...params,
    },
    responseType: 'json',
    headers: {
      ...headers,
    },
  });

  return response;
};
