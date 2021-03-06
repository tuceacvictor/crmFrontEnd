import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField/TextField";
import CustomerService from "../../../../../../Services/API/client.API";
import ReactSelect from "../../../../../Utils/form/fields/reactSelectMaterial/reactSelect";
import DeviceService from "../../../../../../Services/API/device/device.API";
import WhereKnownService from "../../../../../../Services/API/whereType.API";
import Form from "../../../../../Utils/form/form";
import DeviceBrandService from "../../../../../../Services/API/device/device_brand.API";
import DeviceModelService from "../../../../../../Services/API/device/device_model.API";
import DeviceTypeService from "../../../../../../Services/API/device/device_type.API";

const styles = (theme) => ({
    wrapper: {
        marginTop: 30,
        border: '1px solid',
        borderRadius: '10px',
        borderColor: theme.palette.primary.main,
        padding: '0 10px 40px 10px',
    },
    title: {
        color: theme.palette.primary.main,
        marginTop: '-12px',
        padding: '0 10px 0 5px',
        background: 'white',
        width: 222,
    }
});

class DeviceBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAutoComplete: false,
            values: {}
        };
    }

    onChangeRemote = (value) => {
        const {setValues} = this.props;
        if (value !== null && !value.__isNew__) {
            this.setState({
                values: {
                    serial: {value: value.record.serial, label: value.record.serial},
                    brand: value.record.brand,
                    type: value.record.type,
                    model: value.record.model,
                    __isNew: false,
                },
                isAutoComplete: true
            })
        } else if (value && value.__isNew__) {
            this.setState({values: {serial: {value: value.value, label: value.value}, __isNew: true,}})
        } else {
            this.setState({
                values: {
                    brand: '',
                    type: '',
                    model: '',
                },
                isAutoComplete: false
            }, () => {
                setValues(this.state.values, 'device')
            })
        }

    };
    onChangeRemoteSelect = (value, name) => {
        const {setValues} = this.props;
        const {values} = this.state;
        values[name] = value;
        this.setState({values}, () => {
            setValues(this.state.values, 'device')
        })
    };
    onChange = (event) => {
        const {setValues} = this.props;
        const {target: {name, value}} = event;
        const {values} = this.state;
        values[name] = value;
        this.setState({values}, () => {
            setValues(this.state.values, 'device')
        })
    };

    render() {
        const {values, isAutoComplete} = this.state;
        const {classes} = this.props;
        return (
            <div className={classes.wrapper}>
                <div>
                    <h4 className={classes.title}>Устройство и неисправности</h4>
                </div>
                <div>
                    <ReactSelect
                        service={DeviceService}
                        getLabel={'serial'}
                        name={'serial'}
                        record={values}
                        getValue={'phone'}
                        label={'Серийный номер / IMEI'}
                        onChange={this.onChangeRemote}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{
                                label: 'Тип Устройства',
                                name: 'type',
                                type: 'selectRemote',
                                disabled: isAutoComplete,
                                variant: 'outlined',
                                service: DeviceTypeService,
                                required: true
                            }]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{
                                label: 'Бренд',
                                name: 'brand',
                                type: 'selectRemote',
                                disabled: isAutoComplete,
                                variant: 'outlined',
                                service: DeviceBrandService,
                                required: true
                            }]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{
                                label: 'Модель',
                                name: 'model',
                                type: 'selectRemote',
                                disabled: isAutoComplete,
                                variant: 'outlined',
                                service: DeviceModelService,
                                required: true
                            }]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemote}
                        schema={
                            [{label: 'Пароль', name: 'password', type: 'string', variant: 'outlined', required: true}]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemote}
                        schema={
                            [{label: 'Комплектация', name: 'equipment', type: 'string', variant: 'outlined'}]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemote}
                        schema={
                            [{label: 'Внешний вид', name: 'appearance', type: 'string', variant: 'outlined'}]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemote}
                        schema={
                            [{
                                label: 'Неисправность',
                                name: 'problem',
                                type: 'string',
                                variant: 'outlined',
                                required: true
                            }]}
                        record={values}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DeviceBlock);