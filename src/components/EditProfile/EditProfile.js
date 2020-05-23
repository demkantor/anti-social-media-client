import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = (theme) => ({
    ...theme.componentThemes
});


class EditProfile extends Component {

    render() {
        return (
            <div>
                <h1>hi</h1>
            </div>
        )
    }
};


EditProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(withStyles(styles)(EditProfile));
