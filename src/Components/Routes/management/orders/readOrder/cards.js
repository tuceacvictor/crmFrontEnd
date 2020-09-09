import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";

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
            <Divider/>
            <CardContent style={{height: 186}}>

                <table>
                    <tbody>
                    <tr>
                        <td><strong>Номер телефона</strong></td>
                        <td>{client.phone}</td>
                    </tr>
                    <tr>
                        <td><strong>Имя</strong></td>
                        <td>{client.name}</td>
                    </tr>
                    </tbody>
                </table>
                <div style={{marginTop: 10}}>
                <Divider/>
                    <table>
                        <tr>
                            <td>
                                <strong>Предоплата:</strong>
                            </td>
                            <td>{client.prepayment ?
                                <span>{client.prepayment} &#8381;</span> :
                                <span>Без предоплаты</span>}</td>
                        </tr>
                    </table>
                </div>
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
            <Divider/>
            <CardContent>
                <table>
                    <tbody>
                    <tr>
                        <td><strong>Серийный номер</strong></td>
                        <td>{device.serial}</td>
                    </tr>
                    <tr>
                        <td><strong>Тип устройства</strong></td>
                        <td>{device.type.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Бренд</strong></td>
                        <td>{device.brand.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Модель</strong></td>
                        <td>{device.model.name}</td>
                    </tr>
                    <tr>
                        <td><strong>Пароль</strong></td>
                        <td>{device.password}</td>
                    </tr>
                    <tr>
                        <td><strong>Неисправность</strong></td>
                        <td>{device.problem}</td>
                    </tr>
                    </tbody>
                </table>
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
            <Divider/>
            <CardContent style={{height: 186}}>
                <p>Заметка приёмщика: {otherInfo.note}</p>
            </CardContent>
        </Card>
    )
};