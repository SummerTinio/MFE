// MARKETING BOOTSTRAP.JS
// 1. define mount fxn (w/ call to ReactDOM.render() inside it)
// 2. conditional mounting

import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory } from 'history';
import App from './App';

// Mount function to start up the app
// onNavigate === stores the callback w/c communicates changes to currentpath
// up to the parent/Container, who holds BrowserHistory
const mount = function mountForMarketingApp(root, { onNavigate }) {
  const history = createMemoryHistory();

  // history.listen === built-in event listener from createMemoryHistory()
  // will be called everytime memory history object detects navigation changes
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, root);

  return {
    // onParentNavigate === triggered everytime:
    // (1) browser <- or -> buttons are clicked
    // (2) any container-governed route elements are clicked (changes path)
    // (3) any time u navigate to a link on child MFE /from the container/
    onParentNavigate({ pathname: nextPathNameOnParent }) {
      const childCurrentPathName = history.location.pathname;
      if (childCurrentPathName !== nextPathNameOnParent) {
        history.push(nextPathNameOnParent);
      }
    },
  };
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root');

  if (devRoot) {
    // add empty options object to fix "cannot read property 'onNavigate'"
    // when marketing app is visited in isolation
    mount(devRoot, {});
  }
}

// IF RUNNING IN CONTAINER, (i.e. !devRoot)
// USE EXPORTED mount FUNCTION
export { mount };
// note: must destructure mount before exporting
// exporting default mount causes sub app to persist for less than half a second - then disappear
// on the container app.
