export const makeUrl = (url, params) => {
  let queryString = '';
  const keys = Object.keys(params);
  for (let i = 0; i < keys.length; i++) {
    queryString += `${keys[i]}=${params[keys[i]]}`;
    if (i !== keys.length - 1) {
      queryString += '&';
    }
  }

  return `${url}?${queryString}`;
};
