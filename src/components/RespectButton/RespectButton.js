import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MagicButton from '../../util/MagicButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBoarder from '@material-ui/icons/FavoriteBorder';




class RespectButton extends Component {

    disrespectDisregard = (disregardId) => {
        this.props.dispatch({ type: 'DISRESPECT_DISREGARD', payload: disregardId });
    };

    respectDisregard = (disregardId) => {
        console.log('HERE', disregardId)
        this.props.dispatch({ type: 'RESPECT_DISREGARD', payload: disregardId });
    };

    respected = () => {
        console.log(this.props.user.respects)
        if(this.props.user.respects && this.props.user.respects.find(respect => respect.disregardId === this.props.disregardId)) {
            return true;
        } else {
            return false;
        }
    };


    render() {
        const { authenticated } = this.props.user;
        const RespectButton = !authenticated ? (
            <Link to="/login">
                <MagicButton tip="respect">
                        <FavoriteBoarder color="primary"/>
                </MagicButton> 
            </Link> 
        ) : (
            this.respected() ? (
                <MagicButton tip="disrespect" onClick={()=>this.disrespectDisregard(this.props.disregardId)}>
                    <FavoriteIcon color="primary"/>
                </MagicButton>
            ) : (
                <MagicButton tip="respect" onClick={()=>this.respectDisregard(this.props.disregardId)}>
                    <FavoriteBoarder color="primary"/>
                </MagicButton>
            )
        );
        return RespectButton;
    }
}


RespectButton.propTypes = {
    user: PropTypes.object.isRequired,
    disregardId: PropTypes.string.isRequired
};

const putReduxStateOnProps = (reduxState) => ({
    user: reduxState.user.currentUser
});

export default connect(putReduxStateOnProps)(RespectButton);
