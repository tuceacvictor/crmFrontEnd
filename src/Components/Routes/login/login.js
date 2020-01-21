import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import history from "../../../Services/history";
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import LoginService from "../../../Services/API/login";

const styles = (theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',

        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                login: '',
                password: ''
            }
        };
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        localStorage.clear();
        this.props.setLogin(false);
    }

    async login (event) {
        event.preventDefault();
        const {formData} = this.state;
        LoginService
            .login(formData)
            .then(res => {
                const {token} = res;
                localStorage.setItem('userData', JSON.stringify({token}));
                this.props.setLogin(true);
                history.push('/');
                console.log(res)
            }).catch(err => {
                console.log(err)
        })
    };

    onChange = (event) => {
        const {formData} = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({formData})
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline/>
                    <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={this.login}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={this.onChange}
                                    id="login"
                                    label="Login"
                                    name="login"
                                    autoComplete="username"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={this.onChange}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Sign In
                                </Button>
                                <Box mt={5}>
                                    <Copyright/>
                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default withStyles(styles)(Login);


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://apple4you.ru/">
                apple4you.ru
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}