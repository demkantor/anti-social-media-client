import React, { Component } from 'react';
import { connect } from 'react-redux';
import Disregard from '../Disregard/Disregard';
import Profile from '../Profile/Profile';
import DisregardSkeleton from '../Layout/Skeletons/DisregardSkeleton';
import Grid from '@material-ui/core/Grid';


class Home extends Component {
    
    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_ALL_DISREGARDS' });
    }

    render() {
        return (
            <Grid container spacing={10}>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
                <Grid item sm={8} xs={12}>
                    {this.props.reduxState.disregards.allDisregards 
                    ?
                    <>
                        {this.props.reduxState.disregards.allDisregards.map((disregard) => (
                            <Disregard disregard={disregard} key={disregard.disregardId}/>
                        ))}
                    </>
                    :
                    <DisregardSkeleton/>
                    }
                </Grid>
            </Grid>
        )
    }
};


const putReduxStateOnProps = (reduxState) => ({
    reduxState
});
  
export default connect(putReduxStateOnProps)(Home);