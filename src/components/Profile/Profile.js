import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import EditProfile from '../EditProfile/EditProfile';
import MagicButton from '../../util/MagicButton';

import withStyles from '@material-ui/core/styles/withStyles';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';


const styles = (theme) => ({
    ...theme.componentThemes
});


class Profile extends Component {


    editPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.dispatch({ type: 'UPLOAD_IMAGE', payload: formData });
    };


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
                        <MagicButton 
                            tip="Edit Profile Picture"
                            onClick={this.editPicture}
                            btnClass="button">
                                <EditIcon color="primary"/>
                        </MagicButton>
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
                    <Link to="login">
                        <MagicButton 
                                tip="Logout"
                                onClick={()=>this.props.dispatch({ type: 'LOGOUT' })}>
                                    <KeyboardReturn color="primary"/>
                        </MagicButton>
                    </Link>
                    <EditProfile/>
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
};


const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(withStyles(styles)(Profile));
