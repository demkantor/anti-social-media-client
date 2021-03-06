import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = (theme) => ({
    ...theme.componentThemes
});


class Register extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        handle: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.email && this.state.password && this.state.confirmPassword && this.state.handle) {
            this.props.dispatch({ type: 'LOADING_UI' });
            const { history } = this.props
            this.props.dispatch({ type: 'REGISTER_USER', payload: this.state, history });
        } else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
            this.props.dispatch({ type: 'STOP_LOADING_UI' });
        }
    };

    // keeps submit from being disabled after error
    stopLoading = () => {
        this.props.dispatch({ type: 'STOP_LOADING_UI' });
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src="/images/icon.png" alt="icon" width="60px" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Register
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            helperText={this.props.reduxState.errors.registrationMessage.email}
                            error={this.props.reduxState.errors.registrationMessage.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            onClick={this.stopLoading}
                            fullWidth/>
                        <TextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            helperText={this.props.reduxState.errors.registrationMessage.password}
                            error={this.props.reduxState.errors.registrationMessage.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            onClick={this.stopLoading}
                            fullWidth/>
                        <TextField 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password" 
                            className={classes.textField}
                            helperText={this.props.reduxState.errors.registrationMessage.password}
                            error={this.props.reduxState.errors.registrationMessage.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            onClick={this.stopLoading}
                            fullWidth/>
                        <TextField 
                            id="handle" 
                            name="handle" 
                            type="text" 
                            label="Handle" 
                            className={classes.textField}
                            helperText={this.props.reduxState.errors.registrationMessage.handle}
                            error={this.props.reduxState.errors.registrationMessage.handle ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            onClick={this.stopLoading}
                            fullWidth/>
                        {this.props.reduxState.errors.registrationMessage && (
                            <Typography 
                                variant="body2" 
                                className={classes.customError} 
                                role="alert">
                                    {this.props.reduxState.errors.registrationMessage.general}
                                    {this.props.reduxState.errors.registrationMessage.error}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            disabled={this.props.reduxState.errors.loading}
                            className={classes.button}>
                                Register
                                {this.props.reduxState.errors.loading === true &&
                                <CircularProgress size={30} className={classes.progress}/>
                                }
                        </Button>
                    </form>
                    <small>Already have an account? Login <Link to="/login">HERE</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
};

Register.propTypes = {
    classes: PropTypes.object.isRequired
};

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(withStyles(styles)(Register));

