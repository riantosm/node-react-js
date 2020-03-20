import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './container/Home/Home';
import { Provider } from 'react-redux';
import store from './redux/Store';

const AppWithRedux = () => (
  // <Provider store={store}>
  //   <Home />
  // </Provider>
  <h1>Hello world!</h1>
);

ReactDOM.render(<AppWithRedux />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
