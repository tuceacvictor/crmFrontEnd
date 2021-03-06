import React from 'react';
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import {Collapse, Icon} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from "@material-ui/core/List";
import {ListItemLink} from "./ListItemLink";

export const SideBarList = ({menu, expandedMenu, expandMenuItem, toggleDrawer, level = 0}) => {
    return (
        menu.map((item, index) => {
            return (
                <React.Fragment key={index}>
                    {item.sub ? (
                        <>
                            <ListItem button onClick={() => expandMenuItem(item.label, index)}>
                                <ListItemIcon style={{marginLeft: 7}}>
                                    <Icon>
                                        {item.icon}
                                    </Icon>
                                </ListItemIcon>
                                <ListItemText primary={item.label}/>
                                {expandedMenu === item.label ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>
                            <Collapse in={item.expanded} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <SideBarList expandedMenu={expandedMenu} expandMenuItem={expandMenuItem}
                                                 level={1}
                                                 menu={item.sub}/>
                                </List>
                            </Collapse>
                        </>
                    ) : (
                        <ListItemLink toggleDrawer={toggleDrawer} label={item.label} url={item.url} icon={item.icon}
                                      key={item.url} level={level}/>
                    )}
                </React.Fragment>
            )
        })
    )
};

SideBarList.propTypes = {
    menu: PropTypes.array.isRequired,
    expandedMenu: PropTypes.string,
    expandMenuItem: PropTypes.func,
    toggleDrawer: PropTypes.func
};