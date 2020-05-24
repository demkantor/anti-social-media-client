import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MagicButton from '../../util/MagicButton';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';


const styles = (theme) => ({
    ...theme.componentThemes
});


class DeleteDisregard extends Component {


    state = {
        open: false
    };

    delete = () => {
        this.props.dispatch({ type: 'DELETE_DISREGARD', payload: this.props.disregardId });
        this.setState({ open: false });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };



    render() {
        const { classes } = this.props
        return (
            <>
                <MagicButton tip="Delete Disregard"
                    onClick={this.handleOpen}
                    btnClass={classes.deleteButton}>
                        <DeleteOutline color="secondary"/>
                </MagicButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <DialogTitle>
                            Do you realy want to delete this?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.delete} color="secondary">
                                Delete
                            </Button>
                        </DialogActions>
                </Dialog>
            </>
        )
    }
};


DeleteDisregard.propTypes = {
    classes: PropTypes.object.isRequired,
    disregardId: PropTypes.string.isRequired
};

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(withStyles(styles)(DeleteDisregard));
