import React, {Component} from 'react';
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
import {Icon, Tooltip} from "@material-ui/core";

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
});

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            menu: [
                {label: "Главная", url: "/", icon: "home"},
                {label: "База Клиентов", url: "/customers", icon: "accessibility"}
            ]
        }
    }


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
                        {menu.map((item) => (
                            <ListItemLink to={item.url} primary={item.label} icon={item.icon} key={item.url}/>
                        ))}
                    </List>

                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(SideBar);


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