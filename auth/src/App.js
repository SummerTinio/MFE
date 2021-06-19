// AUTH APP.JS
// root/parent component for auth
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
// instead of jss1 jss2, will name classes auth1 auth2 etc
const generateClassName = createGenerateClassName({
  productionPrefix: 'auth',
});

const App = function AuthComponent({ history }) {
  return (
    <>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Route exact path="/" component={SignIn} />
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
