// MARKETING APP.JS
// root/parent component for marketing
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import Landing from './components/Landing';
import Pricing from './components/Pricing';

// to avoid class name collisions inside Container
// instead of jss1 jss2, will name classes mkt1 mkt2 etc
const generateClassName = createGenerateClassName({
  productionPrefix: 'mkt',
});

const App = function MarketingComponent() {
  return (
    <>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/" component={Landing} />
          </Switch>
        </BrowserRouter>
      </StylesProvider>
    </>
  );
};

export default App;
