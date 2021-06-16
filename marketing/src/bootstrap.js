// MARKETING BOOTSTRAP.JS
// 1. define mount fxn (w/ call to ReactDOM.render() inside it)
// 2. conditional mounting

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Mount function to start up the app
const mount = function mountForMarketingApp(el) {
  ReactDOM.render(<App />, el);
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

// IF RUNNING IN CONTAINER, (i.e. !devRoot)
// USE EXPORTED mount FUNCTION
export { mount };
// note: must destructure mount before exporting
// exporting default mount causes sub app to persist for less than half a second - then disappear
// on the container app.
