import React, {Component} from 'react';
import AppHoc from '../../../Services/HocHelpers/AppHoc';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import withStyles from "@material-ui/core/styles/withStyles";
import {AccountCircle} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "react-router-dom";
import UserSettings from "../userSettings/userSettings";
import ChangePassword from "../changePassword/changePassword";
import {Tooltip} from "@material-ui/core";

const drawerWidth = 240;

const styles = (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    title: {
        flexGrow: 1,
    },
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenMenu: false,
            openSettings: false,
            openChangePassword: false,
        }
    }

    handleMenu = (event) => {
        this.setState({anchorEl: event.currentTarget})
    };

    handleClose = () => {
        this.setState({anchorEl: null})
    };

    openProfileSettings = () => {
        this.setState({anchorEl: null, openSettings: true})
    };

    closeProfileSettings = () => {
        this.setState({openSettings: false})
    };

    toggleChangePassword = () => {
        this.setState(state => ({
            openChangePassword: !state.openChangePassword
        }))
    };

    render() {
        const {
            classes,
            toggleDrawer,
            isOpenDrawer,
            changePrimaryColor,
            changeSecondaryColor,
            changeThemeType,
            themeValues,
            currentUser
        } = this.props;
        const {anchorEl, openSettings, openChangePassword} = this.state;
        const auth = localStorage.getItem('userData');
        return (
            <div>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: isOpenDrawer,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: isOpenDrawer,
                            })}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.title}>
                            CRM Apple4you
                        </Typography>
                        {auth && (
                            <div>
                                <Tooltip title={currentUser.user.login || ""}>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                </Tooltip>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={this.handleClose}
                                >

                                    <MenuItem onClick={this.openProfileSettings}>Мой профиль</MenuItem>
                                    <MenuItem onClick={this.toggleChangePassword}>Сменить пароль</MenuItem>
                                    <Link to={'/login'}>
                                        <MenuItem onClick={this.handleClose}>Выход</MenuItem>
                                    </Link>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <UserSettings open={openSettings}
                              themeValues={themeValues}
                              changePrimaryColor={changePrimaryColor}
                              changeSecondaryColor={changeSecondaryColor}
                              changeThemeType={changeThemeType}
                              onClose={this.closeProfileSettings}/>
                <ChangePassword
                    open={openChangePassword}
                    onClose={this.toggleChangePassword}
                />
            </div>
        );
    }
}

export default AppHoc(withStyles(styles)(Header));