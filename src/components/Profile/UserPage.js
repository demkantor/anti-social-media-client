import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Disregard from '../Disregard/Disregard';
import RequestedProfile from './RequestedProfile';

import Grid from '@material-ui/core/Grid';



export class UserPage extends Component {

    state = {
        disregardIdParam: null
    };

    componentDidMount = () => {
        const handle = this.props.match.params.handle;
        const disregardId = this.props.match.params.disregardId;

        if(disregardId) {
            this.setState({ disregardIdParam: disregardId });
        }

        this.props.dispatch({ type: 'GET_USER_PAGE', payload: handle});
    };


    render() {
        const { errors } = this.props;
        const { disregardIdParam } = this.state;
        return (
            <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {this.props.requestedUser.disregards && (
                <>
                    {errors.loading 
                    ? (
                    <p>loading....</p>
                    ) : (
                        <>
                        {this.props.requestedUser.disregards === null
                        ? (
                        <p>no posts from this user...</p>
                        ) : (
                            !disregardIdParam 
                            ? (
                            <>
                                {this.props.requestedUser.disregards.map((disregard) => 
                                    <Disregard key={disregard.disregardId} disregard={disregard}/>)}
                            </>
                            ) : (
                                <>
                                    {this.props.requestedUser.disregards.map((disregard) => {
                                        if(disregard.disregardId !== disregardIdParam) {
                                            return <Disregard key={disregard.disregardId} disregard={disregard}/>
                                        } else {
                                            return <Disregard key={disregard.disregardId} disregard={disregard} openDialog />
                                        }
                                    })}
                                </>
                        ))}
                        </>
                    )}
                </>
                )}
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.props.requestedUser.user 
                ?
                    <RequestedProfile profile={this.props.requestedUser.user}/>
                :
                <p>Loading...</p>
                }
            </Grid>
          </Grid>
        )
    }
};


UserPage.propTypes = {
    requestedUser: PropTypes.object.isRequired
};

const putReduxStateOnProps = (reduxState) => ({
    requestedUser: reduxState.user.requestedUser,
    errors: reduxState.errors.ui
});

export default connect(putReduxStateOnProps)(UserPage);
