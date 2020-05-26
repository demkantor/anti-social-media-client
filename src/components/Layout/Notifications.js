import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';


class Notifications extends Component {

    state = {
        anchorElement: null
    }

    handleClose = () => {
        this.setState({ anchorElement: null });
    };

    handleOpen = (event) => {
        this.setState({ anchorElement: event.target });
    };

    onMenuOpen = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter((not) => !not.read)
            .map((not) => not.notificationId);
        this.props.dispatch({ type: 'MARK_READ', payload: unreadNotificationsIds });
    };


    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorElement;
        dayjs.extend(relativeTime);
        let notificationIcon;
        if(notifications && notifications.length > 0){
            notifications.filter(not => not.read === false).length > 0
                ? notificationIcon = 
                    <Badge 
                        badgeContent={notifications.filter(not => not.read === false).length}
                        color="secondary">
                            <NotificationIcon/>
                    </Badge>
                : notificationIcon = <NotificationIcon/>
        } else {
            notificationIcon = <NotificationIcon/>
        }
        let notificationsMarkup = 
            notifications && notifications.length > 0 ? (
                notifications.map((notif) => {
                    const word = notif.type === 'respect' ? 'respected' : 'commented on';
                    const time = dayjs(notif.createdAt).fromNow();
                    const iconColor = notif.read ? 'primary' : 'secondary';
                    const icon = notif.type === 'respect' ? (
                        <FavoriteIcon color={iconColor} style={{ MarginRight: 10 }} />
                    ) : (
                        <ChatIcon color={iconColor} style={{ MarginRight: 10 }}/>
                    );
                return (
                    <MenuItem key={notif.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            to={`/users/${notif.recipient}/disregard/${notif.disregardId}`}
                            color="default"
                            variant="body1">
                                {notif.sender} {word} your disregard {time}
                            </Typography>
                    </MenuItem>
                )
            })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications right now
                </MenuItem>
            );
        return (
            <>
                <Tooltip placement="top" title="Notifications">
                    <IconButton 
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleOpen}>
                            {notificationIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpen}>
                        {notificationsMarkup}
                </Menu>
            </>
        )
    }
};


Notifications.propTypes = {
    notifications: PropTypes.array.isRequired
};

const putReduxStateOnProps = (reduxState) => ({
    notifications: reduxState.user.currentUser.notifications
});

export default connect(putReduxStateOnProps)(Notifications);
