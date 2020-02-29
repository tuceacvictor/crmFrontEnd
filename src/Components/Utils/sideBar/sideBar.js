import React, {Component} from 'react';
import AppHoc from '../../../Services/HocHelpers/AppHoc';
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
import {Icon, Tooltip, Collapse} from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const drawerWidth = 240;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            expandedMenu: undefined,
            menu: [
                {label: "Главная", url: "/", icon: "home"},
                {
                    label: "Админ", url: "", icon: "build", sub: [
                        {label: "Пользователи", url: "/users", icon: "supervised_user_circle"},
                    ]
                },
                {label: "База Клиентов", url: "/customers", icon: "accessibility"}
            ]
        }
    }

    expandMenuItem = (url) => {
        this.setState((state) => ({
            expandedMenu: state.expandedMenu ? undefined : url
        }))
    };

    renderMenuList = (menu) => {
        const {expandedMenu} = this.state;
        return (
            menu.map((item, index) => {
                return (
                    <React.Fragment key={index}>
                        {item.sub ? (
                            <>
                                <ListItem button onClick={() => this.expandMenuItem(item.label)}>
                                    <ListItemIcon style={{marginLeft: 7}}>
                                        <Icon>
                                            {item.icon}
                                        </Icon>
                                    </ListItemIcon>
                                    <ListItemText primary={item.label}/>
                                    {expandedMenu === item.label ? <ExpandLess/> : <ExpandMore/>}
                                </ListItem>
                                <Collapse in={expandedMenu === item.label} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {this.renderMenuList(item.sub)}
                                    </List>
                                </Collapse>

                            </>
                        ) : (
                            <ListItemLink to={item.url} primary={item.label} icon={item.icon} key={item.url}/>
                        )}
                    </React.Fragment>
                )
            })
        )
    };


    render() {
        const {classes, isOpenDrawer, toggleDrawer} = this.props;
        const {menu} = this.state;
        return (
            <div>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: isOpenDrawer,
                        [classes.drawerClose]: !isOpenDrawer,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: isOpenDrawer,
                            [classes.drawerClose]: !isOpenDrawer,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        {this.renderMenuList(menu)}
                    </List>

                </Drawer>
            </div>
        );
    }
}

export default AppHoc(withStyles(styles)(SideBar));


function ListItemLink(props) {
    const {icon, primary, to} = props;
    return (
        <Tooltip title={primary}>
            <li>
                <ListItem button component={props => <Link to={to} {...props} />}>
                    <ListItemIcon style={{marginLeft: 7}}>
                        <Icon>
                            {icon}
                        </Icon>
                    </ListItemIcon>
                    <ListItemText primary={primary}/>
                </ListItem>
            </li>
        </Tooltip>
    );
}