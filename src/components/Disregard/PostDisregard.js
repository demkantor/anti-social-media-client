import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MagicButton from '../../util/MagicButton';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';


const styles = (theme) => ({
    ...theme.componentThemes
});



class PostDisregard extends Component {

    state = {
        open: false,
        body: ''
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
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch({ type: 'POST_DISREGARD', payload: this.state });
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props
        return (
            <>
                <MagicButton tip="Post a disregard!" onClick={this.handleOpen}>
                    <AddIcon />
                </MagicButton>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'>
                        <MagicButton tip="close" onClick={this.handleClose} tipClass={classes.closeButton}>
                            <CloseIcon/>
                        </MagicButton>
                        <DialogTitle>
                            Post a new disregard
                        </DialogTitle>
                        <DialogContent>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    name="body"
                                    type="text"
                                    label="disregard"
                                    multiline
                                    rows="3"
                                    placeholder="What do you want others to disregard?"
                                    error={this.props.reduxState.errors.disregard ? true : false}
                                    helperText={this.props.reduxState.errors.disregard}
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    fullWidth/>
                                <Button 
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    className={classes.submitButton}
                                    disabled={this.props.reduxState.errors.loading}>
                                        Post Disregard
                                        {this.props.reduxState.errors.loading === true &&
                                        <CircularProgress size={30} className={classes.progress}/>
                                        } 
                                </Button>
                            </form>
                        </DialogContent>
                </Dialog>
            </>
        )
    }
};



PostDisregard.propTypes = {
    classes: PropTypes.object.isRequired
};

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(withStyles(styles)(PostDisregard));
