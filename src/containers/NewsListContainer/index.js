import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNews } from '../../modules/newsList';

import NewsList from '../../components/templates/NewsList';

const NewsListContainer = ({ windowSize }) => {
  const { params, results, loading } = useSelector((state) => state.newsList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.page !== 1) {
      dispatch(getNews({ ...params, page: 1 }));
    }
  }, []);

  return (
    <>
      {loading ? <div>Loading</div> : false}
      {results.articles && (
        <NewsList screenSize={windowSize.width} articles={results.articles} />
      )}
    </>
  );
};

export default React.memo(NewsListContainer);
