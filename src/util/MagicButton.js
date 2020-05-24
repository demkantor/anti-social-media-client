import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';



// common used button layout
export default ({ children, onClick, btnClass, tipClass, tip }) => (
    <Tooltip title={tip} className={tipClass} placement="top">
        <IconButton onClick={onClick} className={btnClass}>
            {children}
        </IconButton>
    </Tooltip>
);
