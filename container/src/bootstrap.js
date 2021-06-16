// for the CONTAINER, bootstrap merely (1) imports App from './App.js'
// and (2) renders App.js onto the main Component root
// NO mount, NO conditional rendering AT ALL.

import React from 'react';
import ReactDOM from 'react-dom';
// from the Container's POV, 'App' === the Container's Root Component
import App from './App';

ReactDOM.render(<App />, document.querySelector('#root'));
