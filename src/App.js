import React from 'react';

//임시 카테고리 추후 api로 받아 올 수 있도록 한다.
import gnbList from './datas/gnb.json';

import './App.css';
import 'reset-css';
import 'react-virtualized/styles.css';
import styles from './style.module.css';

import Gnb from './components/atoms/Gnb';
import NewsList from './components/templates/NewsList';

import useResize from './hooks/useResize';

//Context
import {
  HeadlinesProvider,
  HeadlinesConsumer,
} from './context/ContextHeadlines';

const App = () => {
  const windowSize = useResize();

  return (
    <div className={styles['grid-container']}>
      <header>
        <div className={styles.wrap}>
          {/** 추후 layout을 template으로 분리하여 메모이징된 컴포넌트를 사용하도록 하자 */}
          <span className={styles.logo}>Moa News</span>
        </div>
        <div className={styles.wrap}>
          <Gnb list={gnbList} />
        </div>
      </header>
      <HeadlinesProvider>
        <section>
          <HeadlinesConsumer>
            {(value) => {
              const { results } = value;
              return (
                <NewsList
                  screenSize={windowSize.width}
                  articles={results.articles}
                />
              );
            }}
          </HeadlinesConsumer>
        </section>
      </HeadlinesProvider>
      <footer>busungg 2020-07-27</footer>
    </div>
  );
};

/**
  // ipad = 768 px
 */

export default App;
