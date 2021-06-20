// CONTAINER'S APP.JS
// is a React Component that
// COMPOSES (Collect and Wrap) & RETURNS
// (1) Container-native Components
// (2) "nativized" MFE's

// Suspense === React Component
// Lazy === a fxn used WITH Suspense to lazy load other components
import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react';
// note: must destructure while importing since it's NOT a default export
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
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

import {
  createBrowserHistory,
} from 'history';

import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
// importing the "nativized" MFE, w/c is now a Container-nativized Component

// note: when using lazy() make sure you RETURN import() from the callback!
// in this case: implicit return
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'cont',
});

const history = createBrowserHistory();

// all auth state held by ContainerApp
const App = function ContainerComponent() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    } else if (!isSignedIn && history.location.pathname === '/dashboard') {
      history.push('/');
    }
  }, [isSignedIn]);

  // no need for 'exact' in Route since we just want
  // Route path= to match up to the first matching path
  // i.e. /auth for AuthApp, / for MarketingApp

  // no need to put Header inside Switch, since we want it
  // shown for all paths

  // note: fallback={} on Suspense wants a JSX'd component
  // i.e. with the < />

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <Route>
            <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn} />
          </Route>
          <Suspense fallback={<ProgressBar />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard">
                {!isSignedIn && history.push('/')}
                <DashboardLazy />
              </Route>
              <Route path="/">
                <MarketingLazy onSignIn={() => setIsSignedIn(true)} />
              </Route>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </StylesProvider>
    </>
  );
};

// General note: Components can be exported default -- regardless of whether
// from a Container or from a Remote. but do NOT export default the mount function.
// Must destructure, THEN export. like: export { mount }
export default App;
