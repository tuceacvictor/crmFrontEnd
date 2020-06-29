import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import ReactSelect from "../../../../../Utils/form/fields/reactSelectMaterial/reactSelect";
import Form from "../../../../../Utils/form/form";
import WhereKnownService from "../../../../../../Services/API/whereType.API";
import CustomerService from "../../../../../../Services/API/client.API";

const styles = (theme) => ({
    wrapper: {
        marginTop: 10,
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
        width: 60,
    },
    field: {
        margin: 5
    }
});

class ClientBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                phone: '',
                name: '',
                whereKnownId: ''
            },
            isAutoComplete: false
        };
    }


    onChangeRemote = (value) => {
        if(value !== null){
            this.setState({
                values: {
                    phone: {value: value.record.phone, label: value.record.phone},
                    name: value.record.name,
                    whereKnownId: value.record.whereKnown,
                },
                isAutoComplete: true
            })
        }else{
            this.setState({
                values: {
                    phone: '',
                    name: '',
                    whereKnownId: '',
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
        const {classes} = this.props;
        const {values, isAutoComplete} = this.state;
        return (
            <div className={classes.wrapper}>
                <div>
                    <h4 className={classes.title}>Клиент</h4>
                </div>
                <div>
                    <ReactSelect
                        service={CustomerService}
                        getLabel={'phone'}
                        getValue={'phone'}
                        label={'Номер Телефона'}
                        onChange={this.onChangeRemote}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemote}
                        schema={
                            [{label: 'Имя', name: 'name', type: 'string', disabled: isAutoComplete, variant: 'outlined'}]}
                        record={values}
                    />
                    <Form
                        onChange={this.onChange}
                        onChangeRemote={this.onChangeRemoteSelect}
                        schema={
                            [{
                                label: 'Откуда узнал',
                                name: 'whereKnownId',
                                type: 'selectRemote',
                                disabled: isAutoComplete,
                                variant: 'outlined',
                                service: WhereKnownService
                            }]}
                        record={values}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ClientBlock);