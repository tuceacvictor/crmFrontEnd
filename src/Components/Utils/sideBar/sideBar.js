import React, {Component} from 'react';
import AppHoc from '../../../Services/HocHelpers/AppHoc';
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {SideBarList} from "./sideBarList";
import {Hidden, SwipeableDrawer} from "@material-ui/core";

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
            menu: {
                admin: [
                    {label: "Главная", url: "/", icon: "home"},
                    {
                        label: "Админ", url: "", icon: "build", sub: [
                            {label: "Пользователи", url: "/users", icon: "supervised_user_circle"},
                            {label: "Офисы", url: "/offices", icon: "business"},
                        ]
                    },
                    {label: "База Клиентов", url: "/customers", icon: "accessibility"}
                ],
                manager: [
                    {label: "Главная", url: "/", icon: "home"},
                    {label: "База Клиентов", url: "/customers", icon: "accessibility"}
                ]
            }
        }
    }

    expandMenuItem = (url) => {
        this.setState((state) => ({
            expandedMenu: state.expandedMenu ? undefined : url
        }))
    };

    desktopDrawer = () => {
        const {menu: {admin, manager}, expandedMenu} = this.state;
        const {classes, isOpenDrawer, toggleDrawer, currentUser: {user}} = this.props;
        const userMenu = user.role === 'admin' ? admin : manager;
        return (
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
                    <SideBarList expandedMenu={expandedMenu} expandMenuItem={this.expandMenuItem}
                                 menu={userMenu}/>
                </List>
            </Drawer>
        )
    };

    mobileDrawer = () => {
        const {menu: {admin, manager}, expandedMenu} = this.state;
        const {classes, isOpenDrawer, toggleDrawer, currentUser: {user}} = this.props;
        const userMenu = user.role === 'admin' ? admin : manager;
        return (
            <SwipeableDrawer
                variant="temporary"
                onClose={toggleDrawer}
                onOpen={toggleDrawer}
                open={isOpenDrawer}
                classes={{paper: classes.drawer}}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <SideBarList expandedMenu={expandedMenu}
                                 expandMenuItem={this.expandMenuItem}
                                 menu={userMenu}
                                 toggleDrawer={toggleDrawer}
                    />
                </List>
            </SwipeableDrawer>
        )
    };

    render() {
        return (
            <div>
                <Hidden xsDown>
                    {this.desktopDrawer()}
                </Hidden>
                <Hidden smUp>
                    {this.mobileDrawer()}
                </Hidden>
            </div>
        );
    }
}

export default AppHoc(withStyles(styles)(SideBar));