import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setParams, setNews } from '../../modules/newsList';

import NewsList from '../../components/templates/NewsList';

const NewsListContainer = ({ windowSize }) => {
  const { params, results } = useSelector((state) => state.newsList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.page !== 1) {
      dispatch(setParams({ ...params, page: 1 }));
    }
  }, []);

  return <NewsList screenSize={windowSize.width} articles={results.articles} />;
};

export default React.memo(NewsListContainer);
