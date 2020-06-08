import React, {Component} from "react";
import {withStyles} from "@material-ui/styles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField/TextField";

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
        this.state = {};
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.wrapper}>
                <div>
                    <h4 className={classes.title}>Устройство и неисправности</h4>
                </div>
                <div>
                    <TextField
                        label={'Бренд'}
                        fullWidth
                    />
                    <TextField
                        label={'Тип Устройства'}
                        fullWidth
                    />
                    <TextField
                        label={'Модель'}
                        fullWidth
                    />
                    <TextField
                        label={'Серийный номер / IMEI'}
                        fullWidth
                    />
                    <TextField
                        label={'Комплектация'}
                        fullWidth
                    />
                    <TextField
                        label={'Внешний вид'}
                        fullWidth
                    />
                    <TextField
                        label={'Пароль'}
                        fullWidth
                    />
                    <TextField
                        label={'Неисправность'}
                        fullWidth
                    />

                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DeviceBlock);