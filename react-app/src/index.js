import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client in React 18
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

const sagaMiddleware = createSagaMiddleware();

const customConfig = {
  NODE_SERVICE: process.env.REACT_APP_NODE_SERVICE,
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(app, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(productSaga);

ReactDOM.createRoot(document.getElementById('root')).render(
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
  </Provider>
);

serviceWorker.unregister();
