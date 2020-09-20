import React from 'react';
import NewsList from './index';
import { render } from '@testing-library/react';

const GRID_SCREEN_SIZE = 768;

it('should draw FixedSizeGrid', () => {
  const { container } = render(
    <NewsList
      screenSize={GRID_SCREEN_SIZE + 10}
      articles={[]}
      scrollDispath={undefined}
    />
  );

  expect(container.querySelector('.ReactVirtualized__Grid')).toBeDefined();
});

it('should draw FixedSizeList', () => {
  const { container } = render(
    <NewsList
      screenSize={GRID_SCREEN_SIZE - 10}
      articles={[]}
      scrollDispath={undefined}
    />
  );

  expect(container.querySelector('.ReactVirtualized__List')).toBeDefined();
});
