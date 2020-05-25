import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from '../../util/theme';
import './App.css';

import Home from '../Home/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Nav from '../Nav/Nav';
import AuthRoute from '../../util/AuthRoute';

// holds MUI themes spread through components
const theme = createMuiTheme(themeObject);


class App extends Component {


  componentDidMount = () => {
      // checks for json token and expier date
      const token = localStorage.FBIdToken;
      if(token){
          const decodedToken = jwtDecode(token);
          // console.log(decodedToken);
          if(decodedToken.exp * 1000 < Date.now()){
              this.props.dispatch({ type: 'LOGOUT' });
              window.location.href = '/login'
      } else 
          this.props.dispatch({ type: 'SET_AUTHENTICATED' });
          this.props.dispatch({ type: 'GET_THIS_USER' });
      }
  };


  render() {
    return (
      <MuiThemeProvider theme={ theme }>
        <Router>
          <Nav/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <AuthRoute exact path="/login" component={Login}/>
              <AuthRoute exact path="/register" component={Register}/>
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
};

export default connect()(App);
