import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MagicButton from '../../util/MagicButton';
import DeleteDisregard from './DeleteDisregard';
import DisregardDialog from './DisregardDialog';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import RespectButton from '../../util/RespectButton';


const styles = (theme) => ({
    ...theme.componentThemes
});

class Disregard extends Component {

    render() {
        dayjs.extend(relativeTime);
        const { classes, disregard : { body, createdAt, userImage, userHandle, disregardId, respectCount, commentCount } } = this.props;
        const { authenticated, credentials : { handle } } = this.props.user;
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteDisregard disregardId={disregardId}/>
        ) : (
            <p></p>
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
                        <RespectButton disregardId={disregardId}/>
                        <span>{respectCount} Respects</span>
                        <MagicButton tip="comments">
                            <ChatIcon color="primary"/>
                        </MagicButton>
                        <span>{commentCount} Comments</span>
                        <DisregardDialog 
                            disregardId={disregardId} 
                            userHandle={userHandle}
                            openDialog={this.props.openDialog}/>
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
    user: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
};

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user.currentUser
});

export default connect(putReduxStateOnProps)(withStyles(styles)(Disregard));
