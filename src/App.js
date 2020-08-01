import React from 'react';
import logo from './logo.svg';

import './App.css';
import 'reset-css';
import 'react-virtualized/styles.css';
import styles from './style.module.css';

import FixedSizeList from './components/atoms/FixedSizeList';
import FixedSizeGrid from './components/atoms/FixedSizeGrid';
import ItemCard from './components/molecules/ItemCard';
import Gnb from './components/atoms/Gnb';

//Context
import {
  HeadlinesProvider,
  HeadlinesConsumer,
  DispatchConsumer,
} from './context/ContextHeadlines';

const App = () => {
  return (
    <div className={styles['flex-container']}>
      <header className={styles['flex-item']}>
        <div className={styles.wrap}>
          <span className={styles.logo}>Moa News</span>
        </div>
        <div className={styles.wrap}>
          <Gnb
            list={[
              '오피니언',
              '정치',
              '경제',
              '사회',
              '국제',
              '문화',
              '스포츠',
            ]}
          />
        </div>
      </header>
      <HeadlinesProvider>
        <section className={styles['flex-item']}>
          <HeadlinesConsumer>
            {/*(value) => {
              const { results } = value;
              return (
                <FixedSizeGrid
                  rowHeight={260}
                  columnCount={2}
                  list={results.articles.map((article) => {
                    return (
                      <ItemCard
                        title={article.title}
                        description={article.description}
                        urlToImage={article.urlToImage}
                        publishedAt={article.publishedAt}
                      />
                    );
                  })}
                />
              );
            }*/}

            {(value) => {
              const { results } = value;
              return (
                <FixedSizeList
                  rowHeight={260}
                  list={results.articles.map((article) => {
                    return (
                      <ItemCard
                        title={article.title}
                        description={article.description}
                        urlToImage={article.urlToImage}
                        publishedAt={article.publishedAt}
                      />
                    );
                  })}
                />
              );
            }}
          </HeadlinesConsumer>
        </section>
      </HeadlinesProvider>
      <footer className={styles['flex-item']}>busungg 2020-07-27</footer>
    </div>
  );
};

/**
  // ipad = 768 px
 */

export default App;
