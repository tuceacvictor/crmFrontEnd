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
        if(value !== null){
            this.setState({
                values: {
                    serial: {value: value.record.serial, label: value.record.serial},
                    device_brand: {value: value.record.brand, label: value.record.brand},
                    device_type: {value: value.record.type, label: value.record.type},
                    device_model: {value: value.record.model, label: value.record.model},
                },
                isAutoComplete: true
            })
        }else{
            this.setState({
                values: {
                    device_brand: '',
                    device_type: '',
                    device_model: '',
                },
                isAutoComplete: false
            })
        }

    };
    onChangeRemoteSelect = (value, name) => {
        const {values} = this.state;
        values[name] = value;
        this.setState({values})
    };
    onChange = (event) => {
        const {target: {name, value}} = event;
        const {values} = this.state;
        values[name] = value;
        this.setState({values})
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
                        getValue={'phone'}
                        label={'Серийный номер / IMEI'}
                        onChange={this.onChangeRemote}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{
                                label: 'Бренд',
                                name: 'device_brand',
                                type: 'selectRemote',
                                disabled: isAutoComplete,
                                variant: 'outlined',
                                service: DeviceBrandService
                            }]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{
                                label: 'Модель',
                                name: 'device_model',
                                type: 'selectRemote',
                                disabled: isAutoComplete,
                                variant: 'outlined',
                                service: DeviceModelService
                            }]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{
                                label: 'Тип Устройства',
                                name: 'device_type',
                                type: 'selectRemote',
                                disabled: isAutoComplete,
                                variant: 'outlined',
                                service: DeviceTypeService
                            }]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemote}
                        schema={
                            [{label: 'Пароль', name: 'password', type: 'string', variant: 'outlined'}]}
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
                            [{label: 'Неисправность', name: 'problem_device', type: 'string', variant: 'outlined'}]}
                        record={values}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DeviceBlock);