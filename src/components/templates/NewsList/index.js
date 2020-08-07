import React from 'react';

import FixedSizeList from '../../atoms/FixedSizeList';
import FixedSizeGrid from '../../atoms/FixedSizeGrid';
import ItemCard from '../../molecules/ItemCard';

import { DispatchConsumer } from '../../../context/ContextHeadlines';

const GRID_SCREEN_SIZE = 768;
const HEIGHT_NEWS_ITEM = 260;

const getNewsItems = (articles) => {
  return articles.map((article) => {
    return (
      <ItemCard
        title={article.title}
        description={article.description}
        urlToImage={article.urlToImage}
        publishedAt={article.publishedAt}
      />
    );
  });
};

const NewsList = ({ screenSize, articles }) => {
  return (
    <DispatchConsumer>
      {(dispatch) => {
        return screenSize >= GRID_SCREEN_SIZE ? (
          <FixedSizeGrid
            rowHeight={HEIGHT_NEWS_ITEM}
            columnCount={2}
            list={getNewsItems(articles)}
            dispatch={dispatch}
          />
        ) : (
          <FixedSizeList
            rowHeight={HEIGHT_NEWS_ITEM}
            list={getNewsItems(articles)}
            dispatch={dispatch}
          />
        );
      }}
    </DispatchConsumer>
  );
};

export default NewsList;
