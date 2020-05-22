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


const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 0px auto'
    },
    pageTitle: {
        margin: '0px auto 10px auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: 'red',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    }
};


class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    // just me throwing in silly stuff
    hacker=()=>{
        for(let i=10; i>0; i--){
            console.log("hacking will commence in", i,"...")
            if(i===1){
                console.log("hacking complete.... I'm in!")
            }
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.email && this.state.password) {
            this.props.dispatch({ type: 'LOADING_UI' });
            const { history } = this.props
            this.props.dispatch({ type: 'LOGIN_USER', payload: this.state, history });
        } else {
            this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
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
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            helperText={this.props.reduxState.errors.loginMessage.email}
                            error={this.props.reduxState.errors.loginMessage.email ? true : false}
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
                            helperText={this.props.reduxState.errors.loginMessage.password}
                            error={this.props.reduxState.errors.loginMessage.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            onClick={this.stopLoading}
                            fullWidth/>
                        {this.props.reduxState.errors.loginMessage && (
                            <Typography 
                                variant="body2" 
                                className={classes.customError} 
                                role="alert">
                                    {this.props.reduxState.errors.loginMessage.general}
                                    {this.props.reduxState.errors.loginMessage.error}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            disabled={this.props.reduxState.errors.loading}
                            className={classes.button}>
                                Login
                                {this.props.reduxState.errors.loading === true &&
                                <CircularProgress size={30} className={classes.progress}/>
                                }
                        </Button>
                    </form>
                    <small>Don't have an account? Register <Link to="/register" onClick={this.hacker}>HERE</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
};

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});

export default connect(putReduxStateOnProps)(withStyles(styles)(Login));
