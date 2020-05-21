import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from '../../util/theme';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Nav from '../Nav/Nav';

const theme = createMuiTheme(themeObject);

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
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
            </Switch>
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    )
  }
}

export default App
