import React from 'react';
import logo from './logo.svg';

import './App.css';
import 'reset-css';
import styles from './style.module.css';

//import FixedSizeList from './Components/Atoms/FixedSizeList';
import FixedSizeGrid from './Components/Atoms/FixedSizeGrid';
import ItemCard from './Components/Molecules/ItemCard';
import Gnb from './Components/Atoms/Gnb';

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
            {(value) => {
              console.log(value);

              const { results } = value;

              console.log(results);

              return (
                <FixedSizeGrid
                  width={800}
                  height={500}
                  columnWidth={400}
                  rowHeight={250}
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
            }}
          </HeadlinesConsumer>
        </section>
      </HeadlinesProvider>
      <footer className={styles['flex-item']}>busungg 2020-07-27</footer>
    </div>
  );
};

/**



  <FixedSizeList
    width={400}
    height={500}
    rowHeight={250}
    list={data.articles.map((value) => {
      return (
        <ItemCard
          title={value.title}
          description={value.description}
          urlToImage={value.urlToImage}
          publishedAt={value.publishedAt}
        />
      );
    })}
  />
 */

export default App;
