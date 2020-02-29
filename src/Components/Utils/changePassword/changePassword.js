import React, {Component} from 'react';
import AppHoc from '../../../Services/HocHelpers/AppHoc';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import UserService from "../../../Services/API/user";
import getSafe from "../../../Helpers/getSafeValue";
import {withSnackbar} from "notistack";

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
    dialogDividers: {
        padding: 5
    },
});

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changePassword: {
                password: '',
                newPassword: '',
                passwordRepeat: '',
            },
            loading: false,
        }
    }

    onChangePassword = (event) => {
        const {target: {name, value}} = event;
        const {changePassword} = this.state;
        changePassword[name] = value;
        this.setState({changePassword})
    };

    changePassword = () => {
        const {password, newPassword} = this.state.changePassword;
        this.setState({loading: true});
        UserService
            .changePassword({password, newPassword})
            .then(() => {
                this.setState({loading: false});
                this.props.enqueueSnackbar('Пароль изменен', {variant: 'success'});
            })
            .catch(err => {
                this.setState({loading: false});
                this.props.enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            })
    };

    dialogTitle = () => {
        const {classes, onClose} = this.props;
        return (
            <DialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">Сменить пароль</Typography>
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
        const {loading} = this.state;
        return (
            <DialogActions>
                <Button disabled={loading} onClick={this.changePassword} variant={"contained"}
                        color={"primary"}>Применить</Button>
                <Button variant={"contained"} color={"default"} onClick={onClose}>Отмена</Button>
            </DialogActions>
        )
    };

    dialogContent = () => {
        const {changePassword} = this.state;
        return (
            <div>
                <FormControl fullWidth margin="normal">
                    <TextField
                        autoFocus
                        required
                        type={'password'}
                        onChange={this.onChangePassword}
                        name={'password'}
                        value={changePassword.password}
                        label={'Старый пароль'}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        type={'password'}
                        required
                        onChange={this.onChangePassword}
                        name={'newPassword'}
                        value={changePassword.newPassword}
                        label={'Новый пароль'}
                    />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <TextField
                        type={'password'}
                        required
                        onChange={this.onChangePassword}
                        name={'passwordRepeat'}
                        value={changePassword.passwordRepeat}
                        label={'Повторите новый пароль'}
                    />
                </FormControl>
            </div>
        )
    };

    render() {
        const {classes, open, onClose} = this.props;
        return (
            <Dialog open={open} onClose={onClose} maxWidth={"md"} fullWidth>
                {this.dialogTitle()}
                <DialogContent dividers classes={{dividers: classes.dialogDividers}}>
                    {this.dialogContent()}
                </DialogContent>
                {this.dialogActions()}
            </Dialog>
        );
    }
}

export default withSnackbar(AppHoc(withStyles(styles)(ChangePassword)))