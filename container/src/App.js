// CONTAINER'S APP.JS
// is a React Component that
// COMPOSES (Collect and Wrap) & RETURNS
// (1) Container-native Components
// (2) "nativized" MFE's

import React from 'react';
// note: must destructure while importing since it's NOT a default export
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
// "nativizing" === importing mount function directly from modFed. Using that
//  imported mount function to mount MFE inside a Container-native Component.
//  Involves Refs + useEffect to mount
//  usually done on another file specifically for that component, so App.js
//  remains readable at a glance.

import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

// importing the "nativized" MFE, w/c is now a Container-nativized Component
import MarketingApp from './components/MarketingApp';
import AuthApp from './components/AuthApp';
import Header from './components/Header';

const generateClassName = createGenerateClassName({
  productionPrefix: 'cont',
});

const App = function ContainerComponent() {
  return (
    <>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <Route path="*" component={Header} />
          <Route exact path="/" component={MarketingApp} />
          <Route exact path="/pricing" component={MarketingApp} />
          <Route exact path="/auth/signin" component={AuthApp} />
          <Route exact path="/auth/signup" component={AuthApp} />
        </BrowserRouter>
      </StylesProvider>
    </>
  );
};

// General note: Components can be exported default -- regardless of whether
// from a Container or from a Remote. but do NOT export default the mount function.
// Must destructure, THEN export. like: export { mount }
export default App;
