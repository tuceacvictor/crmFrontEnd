import React, {Component} from "react";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField/TextField";
import {withStyles} from "@material-ui/styles";


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
        this.state = {};
    }

    render() {
        const {values, isAutoComplete} = this.state;
        const {classes} = this.props;
        return (
            <div className={classes.wrapper}>
                <div>
                    <h4 className={classes.title}>Дополнительная информация</h4>
                </div>
                <div>
                    <TextField
                        label={'Заметка приемщика'}
                        fullWidth
                    />
                    <TextField
                        label={'Ориентировочная цена'}
                        fullWidth
                    />
                    <TextField
                        label={'Срочно'}
                        fullWidth
                    />
                    <TextField
                        label={'Дата готовности'}
                        fullWidth
                        type={'date'}
                    />
                    <Divider/>
                    <TextField
                        label={'Пердоплата'}
                        fullWidth
                        type={"number"}
                    />
                    <TextField
                        label={'Менеджер'}
                        fullWidth
                    />
                    <TextField
                        label={'Исполнитель'}
                        fullWidth
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(OtherInformationBlock);