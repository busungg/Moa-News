import React from 'react';
import { render } from '@testing-library/react';
import Gnb from './index';

test('render global navigation bar', () => {
  const list = [
    { category: 'ca1', title: 'va1' },
    { category: 'ca2', title: 'va2' },
  ];
  const { getByText } = render(<Gnb list={list} />);

  let element;
  for (let item of list) {
    element = getByText(item.title);
    expect(element).toBeInTheDocument();
  }
});

/*
it('should select first element', () => {
  const list = [
    { category: 'ca1', title: 'va1' },
    { category: 'ca2', title: 'va2' },
  ];
  const { getByText, container } = render(<Gnb list={list} />);

  container.querySelector('.selected');
});

it('should fire select event and select second element', () => {
  const list = [
    { category: 'ca1', title: 'va1' },
    { category: 'ca2', title: 'va2' },
  ];
  const { getByText, container } = render(<Gnb list={list} />);

  container.querySelector('.selected');
});
*/
