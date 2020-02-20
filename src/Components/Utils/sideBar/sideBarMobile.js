import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom';
import {Icon, SwipeableDrawer, Tooltip} from "@material-ui/core";

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
});

class SideBarMobile extends Component {
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
                        {menu.map((item) => (
                            <ListItemLink to={item.url} primary={item.label} icon={item.icon} key={item.url}/>
                        ))}
                    </List>

                </SwipeableDrawer>
            </div>
        );
    }
}

export default withStyles(styles)(SideBarMobile);


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