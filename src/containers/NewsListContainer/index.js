import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { init, getNews, setParams } from '../../modules/newsList';

import NewsList from '../../components/templates/NewsList';

const NewsListContainer = ({ windowSize }) => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.newsCategory);
  let state = useSelector((state) => state.newsList[category]);

  if (!state) {
    state = {};
  }

  const { params, results, isLoading, isEnd } = state;

  useEffect(() => {
    if (params) {
      dispatch(
        getNews(category, {
          ...params,
          category: category === 'all' ? '' : category,
        })
      );
    } else {
      dispatch(init(category));
    }
  }, [category, params, dispatch]);

  const scrollDispatch = useCallback(() => {
    if (!isLoading && !isEnd) {
      console.log(category);

      dispatch(
        setParams(category, {
          ...params,
          page: params.page + 1,
          category: category === 'all' ? '' : category,
        })
      );
    }
  }, [category, params, isLoading, isEnd, dispatch]);

  return (
    <>
      {isLoading ? <div>Loading</div> : false}
      {results && results.articles && (
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
