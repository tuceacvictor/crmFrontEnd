import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import ReactSelect from "../../../../../Utils/form/fields/reactSelectMaterial/reactSelect";

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
                whereKnown_id: ''
            },
            isAutoComplete: false
        };
    }


    onChangeRemote = (value) => {
        if(value !== null){
            this.setState({
                values: {
                    phone: value.record.phone,
                    name: value.record.name,
                    whereKnown_id: value.record.whereKnown_id,
                },
                isAutoComplete: true
            })
        }else{
            this.setState({
                values: {
                    phone: '',
                    name: '',
                    whereKnown_id: '',
                },
                isAutoComplete: true
            })
        }

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
                        label={'Номер Телефона'}
                        onChange={this.onChangeRemote}
                    />
                    <TextField
                        disabled={isAutoComplete}
                        className={classes.field}
                        value={values.name}
                        label={'Имя'}
                        fullWidth
                        variant={"outlined"}
                    />
                    <TextField
                        disabled={isAutoComplete}
                        className={classes.field}
                        value={values.whereKnown_id}
                        label={'Откуда Узнал'}
                        fullWidth
                        variant={"outlined"}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ClientBlock);