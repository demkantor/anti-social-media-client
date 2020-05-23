import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme) => ({
    ...theme.componentThemes
});


class Profile extends Component {

    editPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.dispatch({ type: 'UPLOAD_IMAGE', payload: formData });
    }

    render() {
        const { classes } = this.props;

        let profileMarkup = this.props.reduxState.errors.ui.loading === false ? 
        (this.props.reduxState.user.currentUser.authenticated === true ?
            <>
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={this.props.reduxState.user.currentUser.credentials.imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                        <Tooltip title="Edit Profile Picture" placement="top">
                            <IconButton onClick={this.editPicture} className="button">
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink 
                            component={Link} 
                            to={`/users/${this.props.reduxState.user.currentUser.credentials.handle}`} 
                            color="primary" 
                            variant="h5">
                                @{this.props.reduxState.user.currentUser.credentials.handle}
                        </MuiLink>
                        <hr/>
                        {this.props.reduxState.user.currentUser.credentials.bio &&
                            <Typography variant="body2">
                                {this.props.reduxState.user.currentUser.credentials.bio}
                            </Typography>
                        }
                        <hr/>
                        {this.props.reduxState.user.currentUser.credentials.location &&
                            <>
                                <LocationOn color="primary"/> 
                                <span>
                                    {this.props.reduxState.user.currentUser.credentials.location}
                                </span>
                                <hr/>
                            </>
                        }
                        {this.props.reduxState.user.currentUser.credentials.website &&
                            <>
                                <LinkIcon color="primary"/>
                                <a href={this.props.reduxState.user.currentUser.credentials.website} 
                                    target="__blank" rel="noopener noreferer">
                                       {' '}{this.props.reduxState.user.currentUser.credentials.website}
                                </a>
                                <hr/>
                            </>
                        }
                        <CalendarToday color="primary"/>{' '}
                            <span>
                                Joined {dayjs(this.props.reduxState.user.currentUser.credentials.createdAt).format('MMM YYYY')}
                            </span>
                    </div>
                </div>
            </Paper>
            </>
            :
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="secondary" component={Link} to="/register">
                        Register
                    </Button>
                </div>
            </Paper>

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
