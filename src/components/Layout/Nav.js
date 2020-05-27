import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostDisregard from '../Disregard/PostDisregard';
import Notifications from './Notifications';
import MagicButton from '../../util/MagicButton';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';


class Nav extends Component {


    render() {
        return (
            <AppBar className="nav-wrapper">
                <Toolbar className="nav-container">
                    {this.props.reduxState.user.currentUser.authenticated
                    ?
                    <>
                        <Button 
                            onClick={()=>this.props.dispatch({ type: 'LOGOUT' })} 
                            color="inherit" 
                            component={Link} to="/login">
                                Log out
                        </Button>
                        <PostDisregard/>
                        <Notifications />
                    </>
                    :
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                    </>
                    }                  
                        <Link to='/' className="final-el">
                            <MagicButton tip="Home">
                                <HomeIcon color="primary"/>
                            </MagicButton>
                        </Link>
                </Toolbar>
            </AppBar>
        )
    }
};


const putReduxStateOnProps = (reduxState) => ({
    reduxState
});
  
export default connect(putReduxStateOnProps)(Nav);
