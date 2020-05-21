import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Disregard from '../Disregard/Disregard';

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
                            <Disregard disregard={disregard} />
                        ))}
                    </>
                    :
                    <p>Loading...</p>
                    }
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
});
  
export default connect(putReduxStateOnProps)(Home);