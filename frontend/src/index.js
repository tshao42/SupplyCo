import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { restoreCSRF, csrfFetch } from './store/csrf';
import './index.css';
import App from './App';
import configureStore from './store';
import * as sessionActions from './store/session';
import { ModalProvider } from './context/Modal';


const cartState = localStorage.getItem('cartState')
  ? JSON.parse(localStorage.getItem('cartState'))
  : {total: 0}

const store = configureStore({cart: cartState});
store.subscribe(() => {
  localStorage.setItem('cartState', JSON.stringify(store.getState().cart))
})


if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}


if (process.env.NODE_ENV !== "production") {
  window.store = store;
}

function Root() {
  return (
    <ReduxProvider store={store}>
      <ModalProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </ModalProvider>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
