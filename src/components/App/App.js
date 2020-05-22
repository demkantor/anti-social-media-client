import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from '../../util/theme';
import jwtDecode from 'jwt-decode';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Nav from '../Nav/Nav';
import AuthRoute from '../../util/AuthRoute';

const theme = createMuiTheme(themeObject);

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  // console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()){
    window.location.href = '/login'
    authenticated = false;
  } else 
    authenticated =  true;
}

export class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
        <h1>The Anti-Social-Network</h1>
        <Router>
          <Nav/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <AuthRoute exact path="/login" component={Login} authenticated={authenticated}/>
              <AuthRoute exact path="/register" component={Register} authenticated={authenticated}/>
            </Switch>
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App
