import React from 'react';
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import {Icon, Tooltip} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

export const ListItemLink = ({url, label, icon, toggleDrawer}) => {
    return (
        <Tooltip title={label}>
            <li>
                <ListItem onClick={toggleDrawer && toggleDrawer} button component={props => <Link to={url} {...props} />}>
                    <ListItemIcon style={{marginLeft: 7}}>
                        <Icon>
                            {icon}
                        </Icon>
                    </ListItemIcon>
                    <ListItemText primary={label}/>
                </ListItem>
            </li>
        </Tooltip>
    )
};

ListItemLink.propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    toggleDrawer: PropTypes.func
};