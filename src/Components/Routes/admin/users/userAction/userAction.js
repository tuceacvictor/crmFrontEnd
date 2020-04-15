import React, {Component} from 'react';
import {Dialog, DialogTitle, Typography, IconButton, withStyles, DialogActions, TextField} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import UserService from "../../../../../Services/API/user";
import {withSnackbar} from "notistack";
import getSafe from "../../../../../Helpers/getSafeValue";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import OfficeService from "../../../../../Services/API/office";

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
            user: {
                office: []
            },
            options: [],
            loadingOptions: false,
            openOptions: false,
        }
    }

    componentDidMount() {
        const {userId, enqueueSnackbar} = this.props;
        if (userId) {
            UserService
                .readUser(userId)
                .then(res => {
                    this.setState({user: res})
                })
                .catch(err => {
                    enqueueSnackbar(
                        getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                        {variant: 'error'});
                })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.openOptions && this.state.options.length === 0 && !this.state.loadingOptions) {
            this.getOptions();
        }
    }

    getOptions = () => {
        const {enqueueSnackbar} = this.props;
        this.setState({loadingOptions: true});
        OfficeService
            .getOffices()
            .then(res => {
                this.setState({options: res, loadingOptions: false})
            })
            .catch(err => {
                this.setState({loadingOptions: false});
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            })
    };

    onChange = (event) => {
        const {target: {name, value}} = event;
        const {user} = this.state;
        user[name] = value;
        this.setState({user})
    };
    onChangeOffice = (values) => {
        const {user} = this.state;
        user.office = values ? values : [];
        this.setState({user})
    };

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

    submitForm = (event) => {
        event.preventDefault();
        const {userId} = this.props;
        const {user} = this.state;
        if (userId) {
            this.updateUser(user)
        } else {
            this.createUser(user)
        }
    };

    dialogTitle = () => {
        const {classes, onClose, userId} = this.props;
        return (
            <DialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">{userId ? 'Обновить пользователя' : 'Новый Пользователь'}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </DialogTitle>
        )
    };

    dialogActions = () => {
        const {onClose, userId} = this.props;
        return (
            <DialogActions>
                <Button variant={"contained"} color={"primary"}
                        type={"submit"} form={"user"}>{userId ? 'Обновить' : 'Создать'}</Button>
                {userId && (
                    <Button variant={"contained"} color={"primary"} onClick={this.deleteUser}>Удалить</Button>
                )}
                <Button variant={"contained"} color={"default"} onClick={onClose}>Отмена</Button>
            </DialogActions>
        )
    };

    render() {
        const {open, onClose, userId} = this.props;
        const {user = {}, loadingOptions, options, openOptions} = this.state;
        return (
            <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth={true}>
                {this.dialogTitle()}
                <DialogContent dividers>
                    <form ref={this.form} onSubmit={this.submitForm} id={"user"}>
                        <FormControl fullWidth>
                            <TextField
                                name={'login'}
                                label={"Логин"}
                                value={user.login || ''}
                                type={"string"}
                                required
                                onChange={this.onChange}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                name={'email'}
                                label={"Е-майл"}
                                value={user.email || ''}
                                type={"email"}
                                required
                                onChange={this.onChange}
                            />
                        </FormControl>
                        {!userId && (
                            <FormControl fullWidth>
                                <TextField
                                    name={'password'}
                                    label={"Пароль"}
                                    value={user.password || ''}
                                    type={"password"}
                                    required
                                    onChange={this.onChange}
                                />
                            </FormControl>
                        )}
                        <FormControl fullWidth>
                            <TextField
                                name={'role'}
                                label={"Роль"}
                                value={user.role || ''}
                                select
                                required
                                onChange={this.onChange}
                            >
                                <MenuItem value={"admin"}>
                                    Админ
                                </MenuItem>
                                <MenuItem value={"manager"}>
                                    Менеджер
                                </MenuItem>
                            </TextField>
                        </FormControl>
                        <FormControl fullWidth>
                            <Autocomplete
                                open={openOptions}
                                multiple
                                onOpen={() => {
                                    this.setState({openOptions: true});
                                }}
                                onClose={() => {
                                    this.setState({openOptions: false});
                                }}
                                value={user.office}
                                onChange={(event, values) => this.onChangeOffice(values)}
                                getOptionSelected={(option, value) => option.name === value.name}
                                getOptionLabel={(option) => option.name}
                                options={options}
                                loading={loadingOptions}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Офисы"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loadingOptions ?
                                                        <CircularProgress color="inherit" size={20}/> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </FormControl>
                    </form>
                    {/*<Formik*/}
                    {/*    innerRef={this.form}*/}
                    {/*    initialValues={{*/}
                    {/*        login: user.login,*/}
                    {/*        email: user.email,*/}
                    {/*        password: user.password,*/}
                    {/*        role: user.role,*/}
                    {/*        office: user.office,*/}
                    {/*    }}*/}
                    {/*    onSubmit={userData ? this.updateUser : this.createUser}*/}
                    {/*    validate={values => {*/}
                    {/*        const errors = {};*/}
                    {/*        if (!values.login) {*/}
                    {/*            errors.login = 'Обязательное поле'*/}
                    {/*        }*/}
                    {/*        if (!values.email) {*/}
                    {/*            errors.email = 'Обязательное поле';*/}
                    {/*        } else if (*/}
                    {/*            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)*/}
                    {/*        ) {*/}
                    {/*            errors.email = 'Введите правильный e-mail адрес';*/}
                    {/*        }*/}
                    {/*        if (!values.password) {*/}
                    {/*            errors.password = 'Обязательное поле'*/}
                    {/*        }*/}
                    {/*        if (!values.office) {*/}
                    {/*            errors.office = 'Обязательное поле'*/}
                    {/*        }*/}
                    {/*        return errors;*/}
                    {/*    }}>*/}
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