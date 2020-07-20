import React from 'react';
import { render } from '@testing-library/react';
import Card from './index';

test('renders card', () => {
  const { getByText } = render(<Card />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
