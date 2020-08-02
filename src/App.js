import React from 'react';
import logo from './logo.svg';

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
  DispatchConsumer,
} from './context/ContextHeadlines';

const gnbList = ['오피니언', '정치', '경제', '사회', '국제', '문화', '스포츠'];

const App = () => {
  const windowSize = useResize();

  return (
    <div className={styles['flex-container']}>
      <header className={styles['flex-item']}>
        <div className={styles.wrap}>
          {/** 추후 layout을 template으로 분리하여 메모이징된 컴포넌트를 사용하도록 하자 */}
          <span className={styles.logo}>Moa News</span>
        </div>
        <div className={styles.wrap}>
          <Gnb list={gnbList} />
        </div>
      </header>
      <HeadlinesProvider>
        <section className={styles['flex-item']}>
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
      <footer className={styles['flex-item']}>busungg 2020-07-27</footer>
    </div>
  );
};

/**
  // ipad = 768 px
 */

export default App;
