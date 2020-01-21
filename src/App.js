import React, {Component} from 'react';
import {
    Router,
    Switch,
    Route,
} from "react-router-dom";

import history from "./Services/history";
import {PrivateRoute} from "./Services/PrivateRoute";
import Login from "./Components/Routes/login";
import Home from "./Components/Routes/home";
import './App.css';
import NoComponent from "./Components/Routes/noComponent";
import Header from "./Components/Utils/header";
import SideBar from "./Components/Utils/sideBar/sideBar";
import {CssBaseline} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Customers from "./Components/Routes/customers";

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        paddingTop: theme.spacing(9)
    },
    toolbar: {
        display: 'flex',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDrawer: false,
        };
    }

    toggleDrawer = () => {
        const {isOpenDrawer} = this.state;
        this.setState({isOpenDrawer: !isOpenDrawer})
    };

    setLogin = (logged) => {
        this.setState({isLogged: logged})
    };

    render() {
        const {isOpenDrawer} = this.state;
        const {classes} = this.props;
        const isLogged = localStorage.getItem('userData');
        console.log(isLogged)
        return (
            <>
                <div className={isLogged && classes.root}>
                    <CssBaseline/>
                    <main className={isLogged && classes.content}>
                        <div className={isLogged && classes.toolbar}>
                            <Router history={history}>
                                {
                                    isLogged && (
                                        <>
                                            <Header isOpenDrawer={isOpenDrawer}
                                                    setLogin={this.setLogin}
                                                    toggleDrawer={this.toggleDrawer}/>
                                            <SideBar isOpenDrawer={isOpenDrawer}
                                                     toggleDrawer={this.toggleDrawer}/>
                                        </>
                                    )
                                }
                                <Switch>
                                    <Route
                                        path={"/login"}
                                        render={props => <Login
                                            {...props}
                                            setLogin={this.setLogin}
                                        />}
                                    />
                                    <PrivateRoute exact path={"/"} component={Home}/>
                                    <PrivateRoute exact path={"/customers"} component={Customers}/>
                                    <Route component={NoComponent}/>
                                </Switch>
                            </Router>
                        </div>
                    </main>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(App);
