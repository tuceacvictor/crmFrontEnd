import React, {Component} from 'react';
import AppHoc from '../../../Services/HocHelpers/AppHoc';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import UserService from "../../../Services/API/user";
import getSafe from "../../../Helpers/getSafeValue";
import {withSnackbar} from "notistack";
import {Formik, Form, Field} from 'formik';
import {TextField} from 'formik-material-ui';

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
        this.form = React.createRef();
        this.state = {
            loading: false,
        }
    }

    onChangePassword = (event) => {
        const {target: {name, value}} = event;
        const {changePassword} = this.state;
        changePassword[name] = value;
        this.setState({changePassword})
    };

    changePassword = (values) => {
        const {password, newPassword} = values;
        const {currentUser: {user: {id}}} = this.props;
        this.setState({loading: true});
        UserService
            .changePassword({id, password, newPassword})
            .then(() => {
                this.setState({loading: false});
                this.props.enqueueSnackbar('Пароль изменен', {variant: 'success'});
                this.props.onClose();
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
                <Button disabled={loading} onClick={() => this.form.current.handleSubmit()} variant={"contained"}
                        color={"primary"}>Применить</Button>
                <Button variant={"contained"} color={"default"} onClick={onClose}>Отмена</Button>
            </DialogActions>
        )
    };

    dialogContent = () => {
        return (
            <Formik
                innerRef={this.form}
                initialValues={{
                    password: '',
                    newPassword: '',
                    passwordRepeat: ''
                }}
                onSubmit={(values, actions) => {
                    this.changePassword(values);
                    actions.setSubmitting(false)
                }}
                validate={values => {
                    const errors = {};
                    if (!values.password) {
                        errors.password = 'Обязательное поле'
                    }
                    if (!values.passwordRepeat) {
                        errors.passwordRepeat = 'Обязательное поле'
                    }
                    if (!values.newPassword) {
                        errors.newPassword = 'Обязательное поле'
                    }
                    if (values.newPassword !== values.passwordRepeat) {
                        errors.newPassword = 'Пароли не совпадают';
                        errors.passwordRepeat = 'Пароли не совпадают';
                    }
                    return errors;
                }}
            >
                <Form>
                    <FormControl fullWidth margin="normal">
                        <Field
                            component={TextField}
                            name={"password"}
                            label={"Старый пароль"}
                            type={"password"}
                        />
                    </FormControl>
                    <br/>
                    <FormControl fullWidth margin="normal">
                        <Field
                            component={TextField}
                            name={"newPassword"}
                            label={"Новый пароль"}
                            type={"password"}
                        />
                    </FormControl>
                    <br/>
                    <FormControl fullWidth margin="normal">
                        <Field
                            component={TextField}
                            name={"passwordRepeat"}
                            label={"Повторите новый пароль"}
                            type={"password"}
                        />
                    </FormControl>
                </Form>
            </Formik>
        )
    };

    render() {
        const {classes, open, onClose} = this.props;
        return (
            <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth>
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