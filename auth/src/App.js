// MARKETING APP.JS
// root/parent component for marketing
import React from 'react';
import {
  Switch,
  Route,
  Router, // for Memory History
} from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
} from '@material-ui/core/styles';

import SignIn from './components/Signin';
import SignUp from './components/Signup';

// to avoid class name collisions inside Container
// instead of jss1 jss2, will name classes mkt1 mkt2 etc
const generateClassName = createGenerateClassName({
  productionPrefix: 'auth',
});

const App = function MarketingComponent({ history }) {
  return (
    <>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin" component={SignIn} />
            <Route path="/auth/signup" component={SignUp} />
          </Switch>
        </Router>
      </StylesProvider>
    </>
  );
};

export default App;
