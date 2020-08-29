import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import FixedSizeList from './index';

const wrap = document.createElement('div');
wrap.setAttribute('style', 'width: 100px; height:100px;');

const list = [];
beforeAll(() => {
  for (let i = 0; i < 10; i++) {
    list.push(
      <div key={i} style={{ width: '100%', height: 50 }}>
        {`div test ${i}`}
      </div>
    );
  }
});

it('should call scrollDispatch', () => {
  //https://github.com/bvaughn/react-virtualized/issues/493
  //react virtualized AutoSizer mock 테스트를 위한 코드
  jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100);
  jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100);

  //scrollDispatch mock 만들기
  const scrollDispatch = jest.fn();

  const { getByRole, debug } = render(
    <FixedSizeList
      rowHeight={50}
      list={list}
      scrollDispatch={scrollDispatch}
    />,
    { container: document.body.appendChild(wrap) }
  );

  debug();
  console.log(scrollDispatch.mock.calls.length);
});
