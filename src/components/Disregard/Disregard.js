import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MagicButton from '../../util/MagicButton';
import DeleteDisregard from '../DeleteDisregard/DeleteDisregard';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBoarder from '@material-ui/icons/FavoriteBorder';


const styles = (theme) => ({
    ...theme.componentThemes
});

class Disregard extends Component {

    disrespectDisregard = (disregardId) => {
        this.props.dispatch({ type: 'DISRESPECT_DISREGARD', payload: disregardId })
    }

    respectDisregard = (disregardId) => {
        console.log('HERE', disregardId)
        this.props.dispatch({ type: 'RESPECT_DISREGARD', payload: disregardId })
    }

    respected = () => {
        console.log(this.props.user.respects)
        if(this.props.user.respects && this.props.user.respects.find(respect => respect.disregardId === this.props.disregard.disregardId)) {
            return true;
        } else {
            return false;
        }
    };



    render() {
        dayjs.extend(relativeTime);
        const { classes, disregard : { body, createdAt, userImage, userHandle, disregardId, respectCount, commentCount } } = this.props;
        const { authenticated, credentials : { handle } } = this.props.user;
        const respectButton = !authenticated ? (
            <MagicButton tip="respect">
                <Link to="/login">
                    <FavoriteBoarder color="primary"/>
                </Link>
            </MagicButton>  
        ) : (
            this.respected() ? (
                <MagicButton tip="disrespect" onClick={()=>this.disrespectDisregard(disregardId)}>
                    <FavoriteIcon color="primary"/>
                </MagicButton>
            ) : (
                <MagicButton tip="respect" onClick={()=>this.respectDisregard(disregardId)}>
                    <FavoriteBoarder color="primary"/>
                </MagicButton>
            )
        );
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteDisregard disregardId={disregardId}/>
        ) : (
            <p>erase me</p>
        )
        return (
        <>
            {body
            ?
                <Card className={classes.card}>
                    {userImage 
                    ? 
                        <CardMedia
                            image={userImage}
                            title="Profile image"
                            className={classes.disImage}
                            />
                    : 
                        <p>Loading...</p>
                    }
                    <CardContent className={classes.content}>
                        <Typography
                            variant="h5" 
                            component={Link} 
                            to={`/users/${userHandle}`}
                            color="primary">
                                {userHandle}
                        </Typography>
                        {deleteButton}
                        <Typography 
                            variant="body2" 
                            color="textSecondary">
                                {dayjs(createdAt).fromNow()}
                        </Typography>
                        <Typography 
                            variant="body1" 
                            color="textPrimary">
                                {body}
                        </Typography>
                        {respectButton}
                        <span>{respectCount} Respects</span>
                        <MagicButton tip="comments">
                            <ChatIcon color="primary"/>
                        </MagicButton>
                        <span>{commentCount} Comments</span>
                    </CardContent>
                </Card> 
            :
            <p>Loading...</p>
            }
        </>
        )
    }
};

Disregard.propTypes = {
    user: PropTypes.object.isRequired
};

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user.currentUser
});

export default connect(putReduxStateOnProps)(withStyles(styles)(Disregard));
