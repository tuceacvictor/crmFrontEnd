import React, {Component} from "react";
import Divider from "@material-ui/core/Divider";
import {withStyles} from "@material-ui/styles";
import Form from "../../../../../Utils/form/form";
import UserService from "../../../../../../Services/API/user.API";
import ReactSelect from "../../../../../Utils/form/fields/reactSelectMaterial/reactSelect";
import ExecutorService from "../../../../../../Services/API/executor.API";


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

    onChangeRemote = (value, name) => {
        const {values} = this.state;
        const {setValues} = this.props;
        if (value !== null) {
            values[name] = value;
            this.setState({
                values,
            }, () => {
                setValues(values, 'otherInformation')
            })
        } else {
            values[name] = '';
            this.setState({
                    values
                },
                () => {
                    setValues(values, 'otherInformation')
                })
        }
    };
    onChangeRemoteSelect = (value, name) => {
        const {setValues} = this.props;
        const {values} = this.state;
        values[name] = value;
        this.setState({values}, () => {
            setValues(values, 'otherInformation')
        })
    };
    onChange = (event, isCheckbox) => {
        const {setValues} = this.props;
        const {target: {name, value, checked}} = event;
        const {values} = this.state;
        values[name] = isCheckbox ? checked : value;
        this.setState({values}, () => {
            setValues(values, 'otherInformation')
        })
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
                    <ReactSelect
                        service={UserService}
                        record={values}
                        name={'manager'}
                        getLabel={'login'}
                        getValue={'id'}
                        label={'Менеджер'}
                        onChange={this.onChangeRemote}
                    />
                    <ReactSelect
                        service={ExecutorService}
                        record={values}
                        name={'executor'}
                        getLabel={'name'}
                        getValue={'id'}
                        label={'Исполнитель'}
                        onChange={this.onChangeRemote}
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