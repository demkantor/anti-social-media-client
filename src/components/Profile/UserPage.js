import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Disregard from '../Disregard/Disregard';
import RequestedProfile from './RequestedProfile';

import Grid from '@material-ui/core/Grid';



export class UserPage extends Component {


    componentDidMount = () => {
        const handle = this.props.match.params.handle;
        this.props.dispatch({ type: 'GET_USER_PAGE', payload: handle});
    };

    
    render() {
        const errors = this.props
        return (
            <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {this.props.requestedUser.disregards &&
                <>
                    {errors.loading 
                    ?
                    <p>loading....</p>
                    :
                        <>
                        {this.props.requestedUser.disregards === null
                        ?
                        <p>no posts from this user...</p>
                        :
                        <>
                            {this.props.requestedUser.disregards.map((disregard) => 
                            <Disregard key={disregard.disregardId} disregard={disregard}/>)}
                        </>
                        }
                        </>
                    }
                </>
                }
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.props.requestedUser.user &&
              <RequestedProfile profile={this.props.requestedUser.user}/>
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
