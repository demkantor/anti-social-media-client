import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MagicButton from '../../util/MagicButton';
import dayjs from 'dayjs';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import RespectButton from '../../util/RespectButton';


const styles = (theme) => ({
    ...theme.componentThemes
});


class DisregardDialog extends Component {

    state = {
        open: false,
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.props.dispatch({ type: 'GET_THIS_DISREGARD', payload: this.props.disregardId });
    };

    render() {
        const { classes, disregard : { body, createdAt, userImage, userHandle, disregardId, respectCount, commentCount } } = this.props;
        const dialogMarkup = this.props.errors.ui.loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={4}>
                <Grid item sm={5}>
                    <img src={userImage} alt="profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/$userHandle`}>
                            @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeperator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeperator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <RespectButton disregardId={disregardId}/>
                    <span>{respectCount} Respects</span>
                    <MagicButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MagicButton>
                    <span>{commentCount} Comments</span>
                </Grid>
            </Grid>
        )
        return (
            <>
                <MagicButton 
                    onClick={this.handleOpen} 
                    tip="Expand Disregard" 
                    tipClass={classes.expandButton}>
                        <UnfoldMore color="primary"/>
                </MagicButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                        <MagicButton
                            tip="Close"
                            onClick={this.handleClose}
                            tipClass={classes.closeButton}>
                                <CloseIcon />
                        </MagicButton>
                        <DialogContent className={classes.dialogContent}>
                            {dialogMarkup}
                        </DialogContent>
                </Dialog>
            </>
        )
    }
};


DisregardDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    disregardId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    disregard: PropTypes.object.isRequired
};

const putReduxStateOnProps = (reduxState) => ({
    disregard: reduxState.disregards.singleDisregard,
    errors: reduxState.errors
});

export default connect(putReduxStateOnProps)(withStyles(styles)(DisregardDialog));
