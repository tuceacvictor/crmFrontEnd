import React, {Component} from "react";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField/TextField";
import {withStyles} from "@material-ui/styles";
import DeviceBrandService from "../../../../../../Services/API/device/device_brand.API";
import Form from "../../../../../Utils/form/form";
import UserService from "../../../../../../Services/API/user.API";


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
        width: 230,
    }
});

class OtherInformationBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {}
        };
    }

    onChangeRemoteSelect = (value, name) => {
        const {setValues} = this.props;
        const {values} = this.state;
        values[name] = value;
        this.setState({values}, () => {setValues(this.state.values, 'otherInformation')})
    };
    onChange = (event) => {
        const {setValues} = this.props;
        const {target: {name, value}} = event;
        const {values} = this.state;
        values[name] = value;
        this.setState({values}, () => {setValues(this.state.values, 'otherInformation')})
    };

    render() {
        const {values} = this.state;
        const {classes} = this.props;
        return (
            <div className={classes.wrapper}>
                <div>
                    <h4 className={classes.title}>Дополнительная информация</h4>
                </div>
                <div>
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{label: 'Заметка Приемщика', name: 'note', type: 'string', variant: 'outlined'}]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{
                                label: 'Ориентировочная цена',
                                name: 'estimated_price',
                                type: 'number',
                                variant: 'outlined'
                            }]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{label: 'Дата Готовности', name: 'ready_date', type: 'date', variant: 'outlined'}]}
                        record={values}
                    />
                    <Divider style={{margin: "20px 0"}}/>
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{label: 'Предоплата', name: 'prepayment', type: 'number', variant: 'outlined'}]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{label: 'Менеджер', name: 'manager', type: 'selectRemote', service: UserService, variant: 'outlined'}]}

                        record={values}
                    />
                    <TextField
                        label={'Исполнитель'}
                        variant={"outlined"}
                        fullWidth
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{label: 'Срочно', name: 'urgently', type: 'checkbox', variant: 'outlined'}]}
                        record={values}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(OtherInformationBlock);