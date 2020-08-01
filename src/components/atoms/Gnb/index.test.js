import React from 'react';
import { render } from '@testing-library/react';
import Gnb from './index';

test('render global navigation bar', () => {
  const { getByText } = render(<Gnb />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
