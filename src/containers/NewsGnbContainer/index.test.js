import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../modules';

import NewsGnbContainer from './index';

const store = createStore(rootReducer);

it('sould be in document', () => {
  const { queryByText } = render(
    <Provider store={store}>
      <NewsGnbContainer
        list={[{ title: 'title', category: 'title' }]}
      ></NewsGnbContainer>
    </Provider>
  );

  expect(queryByText('title')).toBeInTheDocument();
});
