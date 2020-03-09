import React, {Component} from 'react';
import {Dialog, DialogTitle, Typography, IconButton, withStyles, DialogActions} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import UserService from "../../../../../Services/API/user";
import {withSnackbar} from "notistack";
import getSafe from "../../../../../Helpers/getSafeValue";
import {Formik, Form, Field} from 'formik';
import {
    fieldToTextField,
    TextField,
    TextFieldProps,
    Select,
    Switch,
} from 'formik-material-ui';
import MenuItem from "@material-ui/core/MenuItem";

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
        this.form = React.createRef();
        this.state = {
            user: {},
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userData !== prevProps.userData) {
            this.setState({user: this.props.userData || {}})
        }
    }

    createUser = (values) => {
        const {onClose, getUsers, enqueueSnackbar} = this.props;
        UserService
            .createUser(values)
            .then(() => {
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

    deleteUser = () => {
        const {user} = this.state;
        const {onClose, getUsers, enqueueSnackbar} = this.props;
        UserService
            .deleteUser(user.id)
            .then(() => {
                enqueueSnackbar(`Пользователь ${user.login} удален`, {variant: 'success'});
                onClose();
                getUsers();
            })
            .catch((err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            }))

    };

    updateUser = (values) => {
        const {user} = this.state;
        const {onClose, getUsers, enqueueSnackbar} = this.props;
        UserService
            .updateUser({id: user.id, ...values})
            .then(() => {
                enqueueSnackbar(`Пользователь обновлен`, {variant: 'success'});
                onClose();
                getUsers();
            })
            .catch((err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            }))
    };

    submitForm = () => {
        this.form.current.handleSubmit()
    };

    dialogTitle = () => {
        const {classes, onClose, userData} = this.props;
        return (
            <DialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">{userData ? 'Обновить пользователя' : 'Новый Пользователь'}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </DialogTitle>
        )
    };

    dialogActions = () => {
        const {onClose, userData} = this.props;
        return (
            <DialogActions>
                <Button variant={"contained"} color={"primary"}
                        onClick={this.submitForm}>{userData ? 'Обновить' : 'Создать'}</Button>
                {userData && (
                    <Button variant={"contained"} color={"primary"} onClick={this.deleteUser}>Удалить</Button>
                )}
                <Button variant={"contained"} color={"default"} onClick={onClose}>Отмена</Button>
            </DialogActions>
        )
    };

    render() {
        const {open, onClose, userData} = this.props;
        const {user = {}} = this.state;
        return (
            <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth={true}>
                {this.dialogTitle()}
                <DialogContent dividers>
                    <Formik
                        innerRef={this.form}
                        initialValues={{
                            login: user.login,
                            email: user.email,
                            password: user.password,
                            role: user.role
                        }}
                        onSubmit={userData ? this.updateUser : this.createUser}
                        validate={values => {
                            const errors = {};
                            if (!values.login) {
                                errors.login = 'Обязательное поле'
                            }
                            if (!values.email) {
                                errors.email = 'Обязательное поле';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                            ) {
                                errors.email = 'Введите правильный e-mail адрес';
                            }
                            if (!values.password) {
                                errors.password = 'Обязательное поле'
                            }
                            return errors;
                        }}>
                        <Form>
                            <FormControl fullWidth>
                                <Field
                                    component={TextField}
                                    name={"login"}
                                    label={"Login"}
                                    type={"string"}
                                />
                            </FormControl>
                            <br/>
                            <FormControl fullWidth>
                                <Field
                                    component={TextField}
                                    name={"email"}
                                    label={"Email"}
                                    type={"email"}
                                />
                            </FormControl>
                            <br/>
                            {!userData && (
                                <>
                                    <FormControl fullWidth>
                                        <Field
                                            component={TextField}
                                            name={"password"}
                                            label={"Password"}
                                            type={"password"}
                                        />
                                    </FormControl>
                                    <br/>
                                </>
                            )}
                            <FormControl fullWidth>
                                <Field
                                    component={TextField}
                                    name={"role"}
                                    label={"Role"}
                                    type={"string"}
                                    select
                                >
                                    <MenuItem value={"admin"}>
                                        Админ
                                    </MenuItem>
                                    <MenuItem value={"manager"}>
                                        Менеджер
                                    </MenuItem>
                                </Field>
                            </FormControl>
                        </Form>
                    </Formik>
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