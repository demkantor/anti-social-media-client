import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = (theme) => ({
    ...theme.componentThemes
});


class Comments extends Component {

    render() {
        const { classes, comments } = this.props
        return (
            <Grid container>
                {comments.map((comment) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <>
                            <Grid item sm={12} key={createdAt}>
                                <Grid container>
                                    <Grid item sm={3}>
                                        <img src={userImage} alt="comment" className={classes.commentImage}/>
                                    </Grid>
                                </Grid>
                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography
                                            variant="h5"
                                            component={Link}
                                            to={`/users/${userHandle}`}
                                            color="primary">
                                                {userHandle}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeperator}/>
                                        <Typography variant="body1">
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                            <hr className={classes.visibleSeparator} />
                        </>
                    )
                })}
            </Grid>
        )
    }
};


Comments.propTypes = {
    classes: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
