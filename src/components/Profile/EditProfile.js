import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MagicButton from '../../util/MagicButton';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = (theme) => ({
    ...theme.componentThemes,
    button: {
        float: 'right'
    }
});


class EditProfile extends Component {

    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    componentDidMount = () => {
        this.mapUserDetailsToState();
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState();
    };

    handleSave = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        };
        this.props.dispatch({ type: 'BIO_EDIT', payload: userDetails });
        this.handleClose();
    };

    mapUserDetailsToState = () => {
        const { credentials } =  this.props.reduxState.user.currentUser
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        });
    };

    render() {
        const { classes } = this.props
        return (
            <>
                <MagicButton 
                    tip="Edit Details"
                    onClick={this.handleOpen}
                    btnClass={classes.button}>
                        <EditIcon color="primary"/>
                </MagicButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                       <DialogTitle>Edit you details</DialogTitle>
                       <DialogContent>
                           <form>
                               <TextField
                                    name="bio"
                                    type="text"
                                    label="bio"
                                    multiline
                                    rows="3"
                                    placeholder="A short description about you..."
                                    className={classes.TextField}
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    fullWidth
                                    />
                                <TextField
                                    name="website"
                                    type="text"
                                    label="website"
                                    placeholder="link to your personal website"
                                    className={classes.TextField}
                                    value={this.state.website}
                                    onChange={this.handleChange}
                                    fullWidth
                                    />
                                <TextField
                                    name="location"
                                    type="text"
                                    label="location"
                                    placeholder="Where are you?"
                                    className={classes.TextField}
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    fullWidth
                                    />
                           </form>
                       </DialogContent>
                       <DialogActions>
                           <Button onClick={this.handleClose} color="primary">
                               Cancel
                           </Button>
                           <Button onClick={this.handleSave} color="primary">
                               Save
                           </Button>
                       </DialogActions>
                </Dialog>
            </>
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
