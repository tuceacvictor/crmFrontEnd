import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import withStyles from "@material-ui/core/styles/withStyles";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import getSafe from "../../../../../Helpers/getSafeValue";
import OrderService from "../../../../../Services/API/order.API";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import {CardClient, CardDevice, CardOtherInfo} from "./cards";
import {withSnackbar} from "notistack";

const styles = (theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    client_device_wrapper: {
        display: 'flex',
        width: '100%'
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const DialogAppBar = ({classes, onClose}) => {
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                    <CloseIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Детали Заказа
                </Typography>
            </Toolbar>
        </AppBar>
    )
};


class ReadOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            record: {},
        };
    }


    componentDidMount() {
        const {recordId} = this.props;
        this.read(recordId)
    }


    read = (recordId) => {
        const {enqueueSnackbar} = this.props;
        if (recordId) {
            OrderService
                .read(recordId)
                .then(res => {
                    console.log(res)
                    this.setState({record: res})
                })
                .catch(err => {
                    enqueueSnackbar(
                        getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                        {variant: 'error'});
                })
        }
    };

    render() {
        const {classes, isOpen, onClose} = this.props;
        const {record} = this.state;
        return (
            <Dialog
                open={isOpen}
                onClose={onClose}
                maxWidth={"md"}
                scroll={"paper"}
                fullWidth
                TransitionComponent={Transition}
            >
                <DialogAppBar classes={classes} onClose={onClose} createOrder={this.createOrder}/>
                <DialogContent>
                    <div className={classes.client_device_wrapper}>
                        <div style={{width: '50%'}}>
                            <CardClient
                                client={{...record.customer}}
                            />
                        </div>
                        <div style={{width: '50%'}}>
                            <CardDevice
                                device={{
                                    type: {},
                                    brand: {},
                                    model: {},
                                    ...record.device,
                                    password: record.password,
                                    appearance: record.appearance,
                                    equipment: record.equipment
                                }}
                            />
                        </div>
                    </div>
                    <CardOtherInfo
                        otherInfo={record}
                    />
                </DialogContent>
            </Dialog>
        );
    }
}

ReadOrder.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    recordId: PropTypes.number.isRequired,
};

export default withSnackbar(withStyles(styles)(ReadOrder));


