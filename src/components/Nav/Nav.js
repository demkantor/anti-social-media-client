import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class Nav extends Component {


    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {this.props.reduxState.user.token
                    ?
                        <Button 
                            onClick={()=>this.props.dispatch({ type: 'LOGOUT' })} 
                            color="inherit" 
                            component={Link} to="/login">
                                Log out
                        </Button>
                    :
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                    }                  
                    <Button color="inherit" component={Link} to="/">Home</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});
  
export default connect(putReduxStateOnProps)(Nav);
