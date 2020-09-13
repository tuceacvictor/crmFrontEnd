import React from 'react';
import Grid from "@material-ui/core/Grid";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/core/SvgIcon/SvgIcon";
const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];
const CashInformation = () => {
    return(
        <Grid container spacing={2}>
            <Grid item md={8}>
                <ResponsiveContainer width={'100%'} height={300}>
                <LineChart
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#009688" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="red" />
                </LineChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item md={4}>
                <Card style={{width: '92%', height: 240, background: '#009688'}}>
                    <CardContent>
                        <div><LocalAtmIcon style={{color: '#fff'}}/></div>
                        <Typography variant={"h5"} style={{color: '#fff'}}>
                            Касса: 132,148 &#8381;
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};

export default CashInformation;