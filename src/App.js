import React, {Component} from 'react';
import {
    Router,
    Switch,
    Route,
} from "react-router-dom";
import {AppProvider} from './Services/Context/AppContext'
import history from "./Services/history";
import {PrivateRoute} from "./Services/PrivateRoute";
import {SnackbarProvider} from 'notistack';
import Login from "./Components/Routes/login";
import Home from "./Components/Routes/home";
import './App.css';
import NoComponent from "./Components/Routes/noComponent";
import Header from "./Components/Utils/header";
import SideBar from "./Components/Utils/sideBar/sideBar";
import SideBarMobile from "./Components/Utils/sideBar/sideBarMobile";
import {CssBaseline, Hidden} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Customers from "./Components/Routes/customers";
import Users from "./Components/Routes/admin/users";
import colors from './Helpers/colors';
import settings from './Helpers/settings';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";

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

let theme = createMuiTheme({
    palette: {
        primary: settings.theme.primaryColor.import,
        secondary: settings.theme.secondaryColor.import,
        type: settings.theme.type
    }
});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDrawer: true,
            primaryColor: settings.theme.primaryColor.name,
            secondaryColor: settings.theme.secondaryColor.name,
            type: settings.theme.type,
            currentUser: {user: {}, theme: {}, token: ""}
        };
    }

    componentDidMount() {
        const theme = JSON.parse(localStorage.getItem('theme'));
        const user = JSON.parse(localStorage.getItem('userData'));
        if(user){
            this.setState({currentUser: user})
        }
        if (theme) {
            this.updateTheme(theme);
        }
    }

    toggleDrawer = () => {
        const {isOpenDrawer} = this.state;
        this.setState({isOpenDrawer: !isOpenDrawer})
    };

    setLogin = (logged, token, user, {primaryColor, secondaryColor, type} = {}) => {
        this.setState({
            isLogged: logged,
            currentUser: logged ? {token, user} : {},
        });
        if(logged){
            let nightMode = type ? 'dark' : 'light';
            this.updateTheme({primaryColor, secondaryColor, type: nightMode})

        }
    };

    navigation = () => {
        return (
            <>
                <Header/>
                <Hidden xsDown>
                    <SideBar/>
                </Hidden>
                <Hidden smUp>
                    <SideBarMobile/>
                </Hidden>
            </>
        )
    };

    updateTheme = (palette, removeLocalStorage, callback) => {
        const {primaryColor, secondaryColor, type} = this.state;
        if (!palette.primaryColor) {
            palette.primaryColor = primaryColor;
        }

        if (!palette.secondaryColor) {
            palette.secondaryColor = secondaryColor;
        }

        if (!palette.type) {
            palette.type = type;
        }

        theme = createMuiTheme({
            palette: {
                primary: colors.find(color => color.id === palette.primaryColor).import,
                secondary: colors.find(color => color.id === palette.secondaryColor).import,
                type: palette.type
            }
        });

        this.setState({
            primaryColor: palette.primaryColor,
            secondaryColor: palette.secondaryColor,
            type: palette.type
        }, () => {
            if (removeLocalStorage) {
                localStorage.removeItem('theme');
            } else {
                localStorage.setItem('theme', JSON.stringify({
                    primaryColor: palette.primaryColor,
                    secondaryColor: palette.secondaryColor,
                    type: palette.type
                }));
            }

            if (callback && typeof callback === 'function') {
                callback();
            }
        });
    };

    changePrimaryColor = (event) => {
        const primaryColor = event.target.value;

        this.updateTheme({
            primaryColor
        });
    };

    changeSecondaryColor = (event) => {
        const secondaryColor = event.target.value;
        this.updateTheme({
            secondaryColor
        });
    };

    changeThemeType = (event) => {
        const type = event.target.checked;
        this.updateTheme({
            type: type ? 'dark' : 'light'
        });
    };

    render() {
        const {classes} = this.props;
        const isLogged = localStorage.getItem('userData');
        return (
            <AppProvider
                value={{
                    isOpenDrawer: this.state.isOpenDrawer,
                    currentUser: this.state.currentUser,
                    themeValues: {
                        primaryColor: this.state.primaryColor,
                        secondaryColor: this.state.secondaryColor,
                        type: this.state.type
                    },
                    changePrimaryColor: this.changePrimaryColor,
                    changeSecondaryColor: this.changeSecondaryColor,
                    changeThemeType: this.changeThemeType,
                    updateProfile: this.updateProfile,
                    toggleDrawer: this.toggleDrawer,
                    setLogin: this.setLogin
                }}
            >
                <MuiThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3}>
                        <div className={isLogged && classes.root}>
                            <CssBaseline/>
                            <main className={isLogged && classes.content}>
                                <div className={isLogged && classes.toolbar}>
                                    <Router history={history}>
                                        {isLogged && this.navigation()}
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
                                            <PrivateRoute exact path={"/users"} component={Users}/>
                                            <Route component={NoComponent}/>
                                        </Switch>
                                    </Router>
                                </div>
                            </main>
                        </div>
                    </SnackbarProvider>
                </MuiThemeProvider>
            </AppProvider>
        );
    }
}

export default withStyles(styles)(App);
