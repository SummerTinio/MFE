// CONTAINER'S APP.JS
// is a React Component that
// COMPOSES (Collect and Wrap) & RETURNS
// (1) Container-native Components
// (2) "nativized" MFE's

import React from 'react';
import BrowserRouter from 'react-router-dom';
// "nativizing" === importing mount function directly from modFed. Using that
//  imported mount function to mount MFE inside a Container-native Component.
//  Involves Refs + useEffect to mount
//  usually done on another file specifically for that component, so App.js
//  remains readable at a glance.

// importing the "nativized" MFE, w/c is now a Container-nativized Component
import MarketingApp from './components/MarketingApp';
import { Header } from './components/Header';

const App = function ContainerComponent() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <MarketingApp />
      </BrowserRouter>
    </div>
  );
};

// General note: Components can be exported default -- regardless of whether
// from a Container or from a Remote. but do NOT export default the mount function.
// Must destructure, THEN export. like: export { mount }
export default App;
