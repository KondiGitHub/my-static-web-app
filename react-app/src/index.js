import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import app, { productSaga } from './store';
import { CartProvider } from './CartContext';
import { UserProvider } from './UserContext';
import { ConfigProvider } from './ConfigContext';

// create and configure reduxer middleware ( saga is a middleware )
const sagaMiddleware = createSagaMiddleware();

const customConfig = {
  NODE_SERVICE: process.env.REACT_APP_NODE_SERVICE
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  app,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(productSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider config={customConfig}>
      <UserProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </UserProvider>
    </ConfigProvider>

  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
