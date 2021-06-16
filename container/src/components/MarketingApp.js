// MARKETINGAPP.JS
// This is where we "nativize" the imported mount function.
// By the time we export this component, it's already been n
// ativized for the Container to render immediately.
import { mount as marketingMount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

const MarketingApp = function MarketingComponent() {
  const ref = useRef(null);

  // try adding a dependency array of [] here.
  // to make sure mounting only happens on initial render.
  useEffect(() => {
    marketingMount(ref.current);
  });

  // this is how to render supposedly-standalone Remotes into a Host(Container) app.
  return <div ref={ref} />;
};

export default MarketingApp;
