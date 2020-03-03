import React, {Component} from 'react';
import {Dialog, DialogTitle, Typography, IconButton, withStyles, TextField, DialogActions} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import UserService from "../../../../../Services/API/user";
import {withSnackbar} from "notistack";
import getSafe from "../../../../../Helpers/getSafeValue";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

class UserAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    createUser = () => {
        const {user} = this.state;
        const {onClose, getUsers, enqueueSnackbar} = this.props;
        UserService
            .createUser(user)
            .then(res => {
                console.log(res);
                enqueueSnackbar('Пользователь создан', {variant: 'success'});
                onClose();
                getUsers();

            })
            .catch(err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            })
    };

    onChange = (event) => {
        const {user} = this.state;
        const {target: {value, name}} = event;
        user[name] = value;
        this.setState({user})
    };

    dialogTitle = () => {
        const {classes, onClose} = this.props;
        return (
            <DialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">Новый Пользователь</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </DialogTitle>
        )
    };

    dialogActions = () => {
        const {onClose} = this.props;
        return (
            <DialogActions>
                <Button variant={"contained"} color={"primary"} onClick={this.createUser}>Создать</Button>
                <Button variant={"contained"} color={"default"} onClick={onClose}>Отмена</Button>
            </DialogActions>
        )
    };

    render() {
        const {open, onClose} = this.props;
        const {user} = this.state;
        return (
            <Dialog open={open} onClose={onClose}>
                {this.dialogTitle()}
                <DialogContent dividers>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label={'Логин'}
                            name={'login'}
                            value={user.login}
                            onChange={this.onChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label={'Е-майл'}
                            name={'email'}
                            value={user.email}
                            onChange={this.onChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label={'Роль'}
                            name={'role'}
                            value={user.role}
                            onChange={this.onChange}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label={'Пароль'}
                            name={'password'}
                            value={user.password}
                            onChange={this.onChange}
                        />
                    </FormControl>
                </DialogContent>
                {this.dialogActions()}
            </Dialog>
        );
    }
}

UserAction.propTypes = {
    user: PropTypes.object,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default withSnackbar(withStyles(styles)(UserAction))