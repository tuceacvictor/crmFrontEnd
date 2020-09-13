import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import LaunchIcon from '@material-ui/icons/Launch';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import withStyles from "@material-ui/core/styles/withStyles";
const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 5,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#283593',
    },
}))(LinearProgress);

const BorderLinearWork = withStyles((theme) => ({
    root: {
        height: 5,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#26c6da',
    },
}))(LinearProgress);

const BorderLinearFinish = withStyles((theme) => ({
    root: {
        height: 5,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#f57c00',
    },
}))(LinearProgress);

const Header = (props) => {
    return(
        <Grid container alignContent={"space-around"} space={2}>
            <Grid item md={4} >
                <Card style={{width: '90%', margin: 10}}>
                    <CardContent>
                        <div><LaunchIcon style={{color: '#283593'}}/></div>
                        <Typography variant={"h5"} style={{color: '#283593'}}>
                            15
                        </Typography>
                        <Typography variant={"body"} color={"textSecondary"} style={{marginBottom: 5}}>
                            Новых заказов
                        </Typography>
                        <BorderLinearProgress value={50} variant="determinate"/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={4}>
                <Card style={{width: '90%', margin: 10}}>
                    <CardContent>
                        <div><PhonelinkSetupIcon style={{color: '#26c6da'}}/></div>
                        <Typography variant={"h5"} style={{color: '#26c6da'}}>
                            7
                        </Typography>
                        <Typography variant={"body"} color={"textSecondary"} style={{marginBottom: 5}}>
                            В работе
                        </Typography>
                        <BorderLinearWork value={50} variant="determinate"/>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item md={4}>
                <Card style={{width: '90%', margin: 10}}>
                    <CardContent>
                        <div><QueryBuilderIcon style={{color: '#f57c00'}}/></div>
                        <Typography variant={"h5"} style={{color: '#f57c00'}}>
                            6
                        </Typography>
                        <Typography variant={"body"} color={"textSecondary"} style={{marginBottom: 5}}>
                            Ожидание оплаты
                        </Typography>
                        <BorderLinearFinish value={50} variant="determinate"/>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};

export default Header;