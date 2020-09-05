import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Gnb from './index';
import styles from './style.module.css';

it('should render global navigation bar', () => {
  const selected = { category: 'ca1', title: 'va1' };

  const list = [
    { category: 'ca1', title: 'va1' },
    { category: 'ca2', title: 'va2' },
  ];
  const { getByText } = render(<Gnb selected={selected} list={list} />);

  let element;
  for (let item of list) {
    element = getByText(item.title);
    expect(element).toBeInTheDocument();
  }
});

it('should select first element', () => {
  const selected = { category: 'ca1', title: 'va1' };

  const list = [
    { category: 'ca1', title: 'va1' },
    { category: 'ca2', title: 'va2' },
  ];
  const { container } = render(<Gnb selected={selected} list={list} />);
  const element = container.querySelector(`.${styles['gnb-item--selected']}`);
  expect(element).toBeInTheDocument();
});

it('should send second elements title, category', () => {
  const selected = { category: 'ca1', title: 'va1' };

  const list = [
    { category: 'ca1', title: 'va1' },
    { category: 'ca2', title: 'va2' },
  ];

  const mock = jest.fn((title, category) => {
    expect(title).toBe('va2');
    expect(category).toBe('ca2');
  });

  const { getByText } = render(
    <Gnb selected={selected} list={list} onSelect={mock} />
  );
  const element = getByText('va2');

  fireEvent.click(element);
});

it('should not send first elements title, category because click element is same with selected', () => {
  const selected = { category: 'ca1', title: 'va1' };

  const list = [
    { category: 'ca1', title: 'va1' },
    { category: 'ca2', title: 'va2' },
  ];

  const mock = jest.fn();

  const { getByText } = render(
    <Gnb selected={selected} list={list} onSelect={mock} />
  );
  const element = getByText('va1');

  fireEvent.click(element);

  expect(mock.mock.calls.length).toBe(0);
});
