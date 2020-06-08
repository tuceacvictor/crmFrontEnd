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
            }
        };
    }



    render() {
        const {classes} = this.props;
        return (
            <div className={classes.wrapper}>
                <div>
                    <h4 className={classes.title}>Клиент</h4>
                </div>
                <div>
                    <ReactSelect
                        label={'Номер Телефона'}
                    />
                    <TextField
                        className={classes.field}
                        label={'Имя'}
                        fullWidth
                        variant={"outlined"}
                    />
                    <TextField
                        className={classes.field}
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