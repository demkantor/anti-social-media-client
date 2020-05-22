import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';



const styles = (theme) => ({
    ...theme.componentThemes
});


class Profile extends Component {



    render() {
        const { classes } = this.props;

        let profileMarkup = this.props.reduxState.errors.ui.loading === false ? 
        (this.props.reduxState.user.currentUser.authenticated === true ?
            (<p>user profile</p>)
            :
            (<p>no profile!</p>)

        ) 
        : 
        (<p>loading....</p>)

        return profileMarkup;
    }
};

Profile.propTypes = {
    classes: PropTypes.object.isRequired
}


const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(withStyles(styles)(Profile));
