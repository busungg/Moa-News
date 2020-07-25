import React, { useState } from 'react';
import logo from './logo.svg';

import './App.css';
import 'reset-css';

import axios from '../node_modules/axios/index';
import FixedSizeList from './Components/Atoms/FixedSizeList';
import FixedSizeGrid from './Components/Atoms/FixedSizeGrid';
import ItemCard from './Components/Molecules/ItemCard';
import Gnb from './Components/Atoms/Gnb';

const App = () => {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=kr',
        {
          headers: {
            ['X-Api-Key']: 'efed9e5affd44cb7a0a5c1e4eb552141',
          },
        }
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Gnb
        list={['오피니언', '정치', '경제', '사회', '국제', '문화', '스포츠']}
      />
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <>
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

          <FixedSizeGrid
            width={800}
            height={500}
            columnWidth={400}
            rowHeight={250}
            columnCount={2}
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
        </>
      )}
    </div>
  );
};

/**
 * width,
  height,
  columnWidth,
  rowHeight,
  columnCount,
  list,
 */

export default App;
