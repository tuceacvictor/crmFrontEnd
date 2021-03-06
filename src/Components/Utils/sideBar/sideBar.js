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
import SideBarHeader from "./sideBarHeader";
import {set, get} from 'object-path-immutable'

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
        justifyContent: 'space-between',
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
                        label: "Админ", url: "", icon: "build", expanded: false, sub: [
                            {label: "Пользователи", url: "/users", icon: "supervised_user_circle"},
                            {label: "Исполнители", url: "/executors", icon: "power"},
                            {label: "Офисы", url: "/offices", icon: "business"},
                            {label: "Откуда Узнали", url: "/whereKnown", icon: "place"},
                        ]
                    },
                    {
                        label: "Склад", url: "", icon: "layers", expanded: false, sub: [
                            {label: "Склад Запчастей", url: "/stock", icon: "list_alt"},
                            {label: "Брак", url: "/defectStock", icon: "do_not_touch"},
                            {label: "Категории", url: "/category", icon: "qr_code"},
                        ]
                    },
                    {
                        label: "Менеджмент", url: "", icon: "dynamic_feed", expanded: false, sub: [
                            {label: "Заказы", url: "/orders", icon: "shopping_cart"},
                            {label: "Клиенты", url: "/clients", icon: "perm_identity"},
                            // {label: "База Клиентов", url: "/customers", icon: "accessibility"},
                            {label: "Платежи", url: "/payments", icon: "payment"},
                        ]
                    },
                    {
                        label: "Устройства", url: "", icon: "devices", expanded: false, sub: [
                            {label: "База устройств", url: "/devices", icon: "mobile_friendly"},
                            {label: "Типы", url: "/deviceType", icon: "group_work"},
                            {label: "Модели", url: "/deviceModel", icon: "dynamic_feed"},
                            {label: "Бренды", url: "/deviceBrand", icon: "widgets"},
                        ]
                    },

                ],
                manager: [
                    {label: "Главная", url: "/", icon: "home"},
                    {
                        label: "Менеджмент", url: "", icon: "dynamic_feed", expanded: false, sub: [
                            {label: "Заказы", url: "/orders", icon: "shopping_cart"},
                            {label: "База Клиентов", url: "/customers", icon: "accessibility"},
                            {label: "Платежи", url: "/payments", icon: "payment"},
                        ]
                    },
                ]
            }
        }
    }

    expandMenuItem = (url, index) => {
        const {menu} = this.state;
        const {currentUser: {user}} = this.props;
        const userRole = user.role === 'admin' ? 'admin' : 'manager';
        const menuPath = `${userRole}.${index}.expanded`;
        let isExpanded = get(menu, menuPath);
        const newValues = set(menu, menuPath, !isExpanded);
        this.setState({menu: newValues})
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
                    <SideBarHeader/>
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
                    <SideBarHeader/>
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