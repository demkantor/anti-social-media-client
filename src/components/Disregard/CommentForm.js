import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = (theme) => ({
    ...theme.componentThemes
});


class CommentForm extends Component {

    state = {
        body: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch({ type: 'POST_COMMENT', payload: {id: this.props.disregardId, data: this.state}});
        this.setState({ body: '' });
    };


    render() {
        const { classes, authenticated } = this.props
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on disregard..."
                        errors={this.props.errors.comment ? true : undefined}
                        helperText={this.props.errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        className={classes.TextField}
                        fullWidth/>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>
        ) : null
        return commentFormMarkup;
    }
};


CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    disregardId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
};

const putReduxStateOnProps = (reduxState) => ({
    disregard: reduxState.disregards.singleDisregard,
    authenticated: reduxState.user.currentUser.authenticated,
    errors: reduxState.errors
});

export default connect(putReduxStateOnProps)(withStyles(styles)(CommentForm));
