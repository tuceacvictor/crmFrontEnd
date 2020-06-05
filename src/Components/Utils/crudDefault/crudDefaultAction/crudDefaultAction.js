import React, {Component} from 'react';
import {Dialog, DialogTitle, Typography, IconButton, withStyles, DialogActions} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import {withSnackbar} from "notistack";
import getSafe from "../../../../Helpers/getSafeValue";
import AppHoc from "../../../../Services/HocHelpers/AppHoc";
import Form from "../../form/form";

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

class CrudDefaultAction extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
            record: {},
        }
    }

    componentDidMount() {
        const {recordId} = this.props;
        this.read(recordId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {recordId, updateRecord} = this.props;
        if(updateRecord){
            this.read(recordId)
        }
    }

    onChange = (event) => {
        const {target: {name, value}} = event;
        const {record} = this.state;
        record[name] = value;
        this.setState({record})
    };

    onChangeRemote = (value, name) => {
        const {record} = this.state;
        record[name] = value;
        this.setState({record})
    };

    read = (recordId) => {
        const {enqueueSnackbar, service} = this.props;
        if (recordId) {
            service
                .read(recordId)
                .then(res => {
                    this.setState({record: res, originalRecord: res})
                })
                .catch(err => {
                    enqueueSnackbar(
                        getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                        {variant: 'error'});
                })
        }
    };

    create = (values) => {
        const {onClose, getData, enqueueSnackbar, service, actionTitle} = this.props;
        service
            .create(values)
            .then(() => {
                enqueueSnackbar(`${actionTitle} добавлена`, {variant: 'success'});
                onClose();
                getData();
            })
            .catch(err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            })
    };

    delete = () => {
        const {record} = this.state;
        const {onClose, getData, enqueueSnackbar, service} = this.props;
        service
            .deleteRecord(record.id)
            .then(() => {
                enqueueSnackbar(`Запчасть ${record.name} удалена`, {variant: 'success'});
                onClose();
                getData();
            })
            .catch((err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            }))

    };

    update = (values) => {
        const {record} = this.state;
        const {onClose, getData, enqueueSnackbar, service, actionTitle} = this.props;
        service
            .update({id: record.id, ...values})
            .then(() => {
                enqueueSnackbar(`${actionTitle} обновлен`, {variant: 'success'});
                onClose();
                getData();
            })
            .catch((err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            }))
    };

    submitForm = (event) => {
        event.preventDefault();
        const {recordId, currentOffice} = this.props;
        const {record} = this.state;
        if (recordId) {
            this.update({...record, office_id: currentOffice})
        } else {
            this.create({...record, office_id: currentOffice})
        }
    };

    dialogTitle = () => {
        const {classes, onClose, recordId, actionTitle} = this.props;
        return (
            <DialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">{recordId ? `Обновить ${actionTitle}` : `Добавить ${actionTitle}`}</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </DialogTitle>
        )
    };

    dialogActions = () => {
        const {onClose, recordId, AdditionalActions} = this.props;
        const {record} = this.state;
        return (
            <DialogActions>
                <Button size={"small"} variant={"contained"} color={"primary"}
                        type={"submit"} form={"form"}>{recordId ? 'Обновить' : 'Создать'}</Button>
                {recordId && (
                    <Button size={"small"} variant={"contained"} color={"primary"}
                            onClick={this.delete}>Удалить</Button>
                )}
                <Button size={"small"} variant={"contained"} color={"default"} onClick={onClose}>Отмена</Button>
                {AdditionalActions && AdditionalActions(recordId, record)}
            </DialogActions>
        )
    };

    render() {
        const {open, onClose, formSchema} = this.props;
        const {record = {}} = this.state;
        return (
            <>
                <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth={true}>
                    {this.dialogTitle()}
                    <DialogContent dividers>
                        <form ref={this.form} onSubmit={this.submitForm} id={"form"}>
                            <Form onChange={this.onChange} onChangeRemote={this.onChangeRemote} schema={formSchema} record={record} />
                        </form>
                    </DialogContent>
                    {this.dialogActions()}
                </Dialog>
            </>
        );
    }
}

CrudDefaultAction.propTypes = {
    record: PropTypes.object,
    recordId: PropTypes.string,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    service: PropTypes.func.isRequired,
    actionTitle: PropTypes.string.isRequired
};

export default AppHoc(withSnackbar(withStyles(styles)(CrudDefaultAction)))