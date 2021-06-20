// MARKETINGAPP.JS
// This is where we "nativize" the imported mount function.
// By the time we export this component, it's already been n
// ativized for the Container to render immediately.
import { mount as authMount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

const AuthApp = function AuthComponent({ onSignIn }) {
  const ref = useRef(null);
  // history object used by container (Browser History)
  const history = useHistory();

  // try adding a dependency array of [] here.
  // to make sure mounting only happens on initial render.
  useEffect(() => {
    // pass onNavigate eventListener & callback to SYNC navigation between MFE's & Container
    // note: history.listen() call will give us a location
    const { onParentNavigate } = authMount(ref.current, {
      // initialPath will be at '/auth/signin' by the time this mount fxn is called
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathName }) => {
        // nextPathName === path user is trying to navigate to /within the marketing app/
        // to prevent infinite loop of communicating path changes
        const currentPathName = history.location.pathname;
        if (currentPathName !== nextPathName) {
          history.push(nextPathName);
        }
      },
      // since onSignIn === onSignIn()
      onSignIn,
    });
    // for DOWNWARD communication of changes to current history.location.pathname
    history.listen(onParentNavigate);
    // add a dependency array [] to limit useEffect() call to "only on first render of mkt app!"
  }, []);

  // this is how to render supposedly-standalone Remotes into a Host(Container) app.
  return <div ref={ref} />;
};

export default AuthApp;
