const loggerMiddleware = function (store) {
  console.group('logger');
  console.log('store function', store);
  return function (next) {
    console.log('next function store:', store);
    console.log('next function next:', next);
    return function (action) {
      console.log('action function', action);
      next(action);
      console.log('다음 상태', store.getState());
      console.groupEnd();
    };
  };
};

export default loggerMiddleware;
