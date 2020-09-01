import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNews, setParams } from '../../modules/newsList';

import NewsList from '../../components/templates/NewsList';

const NewsListContainer = ({ windowSize }) => {
  const { params, results, isLoading, isEnd } = useSelector(
    (state) => state.newsList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews(params));
  }, [params, dispatch]);

  const scrollDispatch = useCallback(() => {
    if (!isLoading && !isEnd) {
      dispatch(setParams({ ...params, page: params.page + 1 }));
    }
  }, [params, isLoading, isEnd, dispatch]);

  return (
    <>
      {isLoading ? <div>Loading</div> : false}
      {results.articles && (
        <NewsList
          screenSize={windowSize.width}
          articles={results.articles}
          scrollDispath={scrollDispatch}
        />
      )}
    </>
  );
};

export default React.memo(NewsListContainer);
