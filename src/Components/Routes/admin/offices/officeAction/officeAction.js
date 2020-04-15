import React, {Component} from 'react';
import {Dialog, DialogTitle, Typography, IconButton, withStyles, DialogActions, TextField} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import {withSnackbar} from "notistack";
import getSafe from "../../../../../Helpers/getSafeValue";
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

class OfficeAction extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
            office: {},
        }
    }

    componentDidMount() {
        const {officeId, enqueueSnackbar} = this.props;
        if (officeId) {
            OfficeService
                .readOffice(officeId)
                .then(res => {
                    this.setState({office: res})
                })
                .catch(err => {
                    enqueueSnackbar(
                        getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                        {variant: 'error'});
                })
        }
    }

    onChange = (event) => {
        const {target: {name, value}} = event;
        const {office} = this.state;
        office[name] = value;
        this.setState({office})
    };

    createOffice = (values) => {
        const {onClose, getOffices, enqueueSnackbar} = this.props;
        OfficeService
            .createOffice(values)
            .then(() => {
                enqueueSnackbar('Офис создан', {variant: 'success'});
                onClose();
                getOffices();

            })
            .catch(err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            })
    };

    deleteOffice = () => {
        const {office} = this.state;
        const {onClose, getOffices, enqueueSnackbar} = this.props;
        OfficeService
            .deleteOffice(office.id)
            .then(() => {
                enqueueSnackbar(`Офис ${office.name} удален`, {variant: 'success'});
                onClose();
                getOffices();
            })
            .catch((err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            }))

    };

    updateOffice = (values) => {
        const {office} = this.state;
        const {onClose, getOffices, enqueueSnackbar} = this.props;
        OfficeService
            .updateOffice({id: office.id, ...values})
            .then(() => {
                enqueueSnackbar(`Пользователь обновлен`, {variant: 'success'});
                onClose();
                getOffices();
            })
            .catch((err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            }))
    };

    submitForm = (event) => {
        event.preventDefault();
        const {officeId} = this.props;
        const {office} = this.state;
        if (officeId) {
            this.updateOffice(office)
        } else {
            this.createOffice(office)
        }
    };

    dialogTitle = () => {
        const {classes, onClose, officeId} = this.props;
        return (
            <DialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">{officeId ? 'Обновить офис' : 'Новый Офис'}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </DialogTitle>
        )
    };

    dialogActions = () => {
        const {onClose, officeId} = this.props;
        return (
            <DialogActions>
                <Button variant={"contained"} color={"primary"}
                        type={"submit"} form={"office"}>{officeId ? 'Обновить' : 'Создать'}</Button>
                {officeId && (
                    <Button variant={"contained"} color={"primary"} onClick={this.deleteOffice}>Удалить</Button>
                )}
                <Button variant={"contained"} color={"default"} onClick={onClose}>Отмена</Button>
            </DialogActions>
        )
    };

    render() {
        const {open, onClose} = this.props;
        const {office = {}} = this.state;
        return (
            <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth={true}>
                {this.dialogTitle()}
                <DialogContent dividers>
                    <form ref={this.form} onSubmit={this.submitForm} id={"office"}>
                        <FormControl fullWidth>
                            <TextField
                                name={'name'}
                                label={"Название"}
                                value={office.name || ''}
                                type={"string"}
                                required
                                onChange={this.onChange}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                name={'address'}
                                label={"Адресс"}
                                value={office.address || ''}
                                type={"string"}
                                required
                                onChange={this.onChange}
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                {this.dialogActions()}
            </Dialog>
        );
    }
}

OfficeAction.propTypes = {
    user: PropTypes.object,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default withSnackbar(withStyles(styles)(OfficeAction))