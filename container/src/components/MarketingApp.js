// MARKETINGAPP.JS
// This is where we "nativize" the imported mount function.
// By the time we export this component, it's already been n
// ativized for the Container to render immediately.
import { mount as marketingMount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

const MarketingApp = function MarketingComponent() {
  const ref = useRef(null);
  // history object used by container (Browser History)
  const history = useHistory();

  // try adding a dependency array of [] here.
  // to make sure mounting only happens on initial render.
  useEffect(() => {
    // pass onNavigate eventListener & callback to SYNC navigation between MFE's & Container
    // note: history.listen() call will give us a location
    const { onParentNavigate } = marketingMount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathName }) => {
        // nextPathName === path user is trying to navigate to /within the marketing app/
        // to prevent infinite loop of communicating path changes
        const currentPathName = history.location.pathname;
        if (currentPathName !== nextPathName) {
          history.push(nextPathName);
        }
      },
    });

    // for DOWNWARD communication of changes to current history.location.pathname
    history.listen(onParentNavigate);

    // add a dependency array [] to limit useEffect() call to "only on first render of mkt app!"
  }, []);

  // this is how to render supposedly-standalone Remotes into a Host(Container) app.
  return <div ref={ref} />;
};

export default MarketingApp;
