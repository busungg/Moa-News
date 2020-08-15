import React from 'react';
import ReactDOM from 'react-dom';

//redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
import loggerMiddleware from './libs/loggerMiddleware';
import { createLogger } from 'redux-logger';

//style
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//composeWithDevTools(),
const logger = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, logger)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
