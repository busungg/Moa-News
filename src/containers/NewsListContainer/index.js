import React from 'react';
import { connect } from 'react-redux';
import { paramSet, dataSet } from '../../modules/newsList';

import NewsList from '../../components/templates/NewsList';

const NewsListContainer = ({
  windowSize,
  params,
  results,
  paramSet,
  dataSet,
}) => {
  return <NewsList screenSize={windowSize.width} articles={results.articles} />;
};

//results: { totalResults: 0, articles: [] },
const mapStateToProps = (state, ownProps) => {
  return {
    params: state.newsList.params,
    results: state.newsList.results,
    windowSize: ownProps.windowSize,
  };
};

const mapDispatchToProps = (dispatch) => ({
  paramSet: (page, pageSize) => {
    dispatch(paramSet({ page, pageSize }));
  },

  dataSet: (totalResults, articles) => {
    dispatch(dataSet({ totalResults, articles }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsListContainer);
