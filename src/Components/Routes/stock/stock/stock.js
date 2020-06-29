import React, {Component} from 'react';
import {withSnackbar} from "notistack";
import StockService from "../../../../Services/API/stock.API";
import CategoryService from "../../../../Services/API/categories.API";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogTitle, IconButton, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {withStyles} from "@material-ui/styles";
import Form from "../../../Utils/form/form";
import getSafe from "../../../../Helpers/getSafeValue";
import AppHoc from "../../../../Services/HocHelpers/AppHoc";

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

class Stock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Название', field: 'name'},
                {title: 'Кол-во', field: 'count'},
                {title: 'Цена', field: 'price'},
                {title: 'Категория', field: 'category.name'},
            ],
            formSchema: [
                {name: 'name', label: "Название", disabled: false, type: 'string', autoFocus: true},
                {
                    name: 'categoryId',
                    label: "Категория",
                    disabled: false,
                    type: 'selectRemote',
                    autoFocus: false,
                    service: CategoryService
                },
                {name: 'price', label: "Цена", disabled: false, type: 'number', autoFocus: false},
                {name: 'count', label: "Количество", disabled: false, type: 'number', autoFocus: false},
            ],
            formSchemaDefect: [
                {name: 'name', label: "Название", disabled: true, type: 'string', autoFocus: true},
                {name: 'count', label: "Количество", disabled: false, type: 'number', autoFocus: false},
                {name: 'description', label: "Опишите причину", disabled: false, type: 'string', autoFocus: false},
            ],
            defectRecord: {},
            openDefect: false,
            updateRecord: false
        }
    }

    onChange = (event) => {
        const {target: {name, value}} = event;
        const {defectRecord} = this.state;
        defectRecord[name] = value;
        this.setState({defectRecord})
    };

    submitFormDefect = (event) => {
        event.preventDefault();
        const {defectRecord} = this.state;
        this.moveToDefect({...defectRecord, office_id: this.props.currentOffice})
    };

    moveToDefect = (values) => {
        const {defectRecord} = this.state;
        const {enqueueSnackbar} = this.props;
        StockService
            .moveToDefect({id: defectRecord.id, ...values})
            .then(() => {
                enqueueSnackbar(`Запчасть ${defectRecord.name} перенесена в брак, ${defectRecord.count} шт.`, {variant: 'success'});
                this.toggleDefectModal();
                this.setState({updateRecord: true}, () => {
                    this.setState({updateRecord: false})
                })
            })
            .catch((err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            }))
    };



    toggleDefectModal = (record) => {
        this.setState(state => ({
            openDefect: !state.openDefect,
            defectRecord: !state.openDefect ? {...record, count: 0} : {},
        }))
    };

    AdditionalAction = (id, record) => {
        return (
            id ? (
                <Button variant={"contained"} color={"secondary"} onClick={() => this.toggleDefectModal(record)}>
                    Брак
                </Button>
            ) : (<></>)
        )
    };

    transferToDefectModal = () => {
        const {openDefect, defectRecord, formSchemaDefect} = this.state;
        const {classes} = this.props;
        return (
            <Dialog open={openDefect} onClose={this.toggleDefectModal} maxWidth={"sm"} fullWidth={true}>
                <DialogTitle disableTypography className={classes.root}>
                    <Typography variant="h6">Перенеси в брак</Typography>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={this.toggleDefectModal}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <form ref={this.form} onSubmit={this.submitFormDefect} id={"defect"}>
                        <Form onChange={this.onChange} schema={formSchemaDefect} record={defectRecord} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button size={"small"} variant={"contained"} color={"primary"}
                            type={"submit"} form={"defect"}>Подтвердить</Button>
                    <Button size={"small"} variant={"contained"} color={"default"}
                            onClick={this.toggleDefectModal}>Отмена</Button>
                </DialogActions>
            </Dialog>
        )
    };

    render() {
        const {columns, formSchema, updateRecord} = this.state;
        return (
            <div style={{width: '100%'}}>
                <CrudDefault
                    tooltipCreate={'Создать Запчасть'}
                    creatable
                    columns={columns}
                    service={StockService}
                    title={'Склад Запчастей'}
                    formSchema={formSchema}
                    actionTitle={'запчасть'}
                    AdditionalActions={this.AdditionalAction}
                    updateRecord={updateRecord}
                />
                {this.transferToDefectModal()}
            </div>
        );
    }
}

export default AppHoc(withSnackbar(withStyles(styles)(Stock)));