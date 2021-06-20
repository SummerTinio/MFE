// DASHBOARD BOOTSTRAP.JS
// 1. define mount fxn (w/ call to createApp() inside it)
// 2. conditional mounting

import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

// Mount function to start up the app
const mount = function mountForDashboardApp(root) {
  const app = createApp(Dashboard);
  app.mount(root);
};

// If we are in development and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

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
