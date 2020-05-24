import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Disregard from '../Disregard/Disregard';
import Profile from '../Profile/Profile';

class Home extends Component {
    
    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_ALL_DISREGARDS' });
    }

    render() {
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {this.props.reduxState.disregards.allDisregards 
                    ?
                    <>
                        {this.props.reduxState.disregards.allDisregards.map((disregard) => (
                            <Disregard disregard={disregard} key={disregard.disregardId}/>
                        ))}
                    </>
                    :
                    <p>Loading...</p>
                    }
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
};


const putReduxStateOnProps = (reduxState) => ({
    reduxState
});
  
export default connect(putReduxStateOnProps)(Home);