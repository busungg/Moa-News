import React from 'react';
import { render } from '@testing-library/react';
import Card from './index';

test('renders card', () => {
  const title = 'title',
    description = 'description';

  const { getByText } = render(
    <Card title={title} description={description} />
  );
  const titleElement = getByText(title);
  const descElement = getByText(description);
  expect(titleElement).toBeInTheDocument();
  expect(descElement).toBeInTheDocument();
});
