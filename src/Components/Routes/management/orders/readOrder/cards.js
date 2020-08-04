import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        margin: 5
    }
}));
export const CardClient = ({client}) => {
    const classes = useStyles();
    return (
        <Card className={classes.wrapper}>
            <CardHeader
                title="Клиент"
            />
            <CardContent>
                <p>Номер телефона: {client.phone}</p>
                <p>Имя: {client.name}</p>
            </CardContent>
        </Card>
    )
};

export const CardDevice = ({device}) => {
    const classes = useStyles();
    return (
        <Card className={classes.wrapper}>
            <CardHeader
                title="Устройство"
            />
            <CardContent>
                <p>Серийный номер: {device.serial}</p>
                <p>Тип устройства: {device.type.name}</p>
                <p>Бренд: {device.brand.name}</p>
                <p>Модель: {device.model.name}</p>
                <p>Пароль: {device.password}</p>
            </CardContent>
        </Card>
    )
};

export const CardOtherInfo = ({otherInfo}) => {
    const classes = useStyles();
    return (
        <Card className={classes.wrapper}>
            <CardHeader
                title="Дополнительная информация"
            />
            <CardContent>
                <p>Заметка приёмщика: {otherInfo.note}</p>
            </CardContent>
        </Card>
    )
};