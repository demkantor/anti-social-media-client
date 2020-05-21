import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover',
    }
}

class Disregard extends Component {
    render() {
        const { classes, disregard : { body, createdAt, userImage, userHandle, disregardId, respectCount, commentCount } } = this.props;
        return (
            <Card key={disregardId} className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image}
                    />
                    <CardContent className={classes.content}>
                        <Typography 
                            variant="h5" 
                            component={Link} 
                            to={`/users/${userHandle}`}
                            color="primary"
                        >
                            {userHandle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
                        <Typography variant="body1" color="textPrimary">{body}</Typography>
                    </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Disregard);
