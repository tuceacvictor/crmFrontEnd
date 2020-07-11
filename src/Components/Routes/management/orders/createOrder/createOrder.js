import React, {Component} from 'react';
import Dialog from "@material-ui/core/Dialog";
import PropTypes from 'prop-types';
import Slide from "@material-ui/core/Slide";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import ClientBlock from "./client";
import DialogContent from "@material-ui/core/DialogContent";
import DeviceBlock from "./device/device";
import OtherInformationBlock from "./otherInformation/otherInformation";
import {set} from 'object-path-immutable';
import {prepareDataToCreate} from "./utils/prepareDataToCreate";
import OrderService from "../../../../../Services/API/order.API";
import getSafe from "../../../../../Helpers/getSafeValue";
import {withSnackbar} from "notistack";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const DialogAppBar = ({classes, toggleCreate, createOrder}) => {
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleCreate} aria-label="close">
                    <CloseIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title} >
                    Создать Заказ
                </Typography>
                <Button autoFocus color="inherit" onClick={createOrder}>
                    Сохранить
                </Button>
            </Toolbar>
        </AppBar>
    )
};

const styles = (theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
});

class CreateOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                client: {},
                device: {},
                otherInformation: {},
            },
        }
    }
    setValues = (value, blockType) => {
        const {values} = this.state;
        let newValues = set(values, blockType, value);
        this.setState({values: newValues})
    };
    shouldComponentUpdate(nextProps, nextState, nextContext){
        return this.state.values === nextState.values;
    }

    createOrder = () => {
        const {values: {client, device, otherInformation}} = this.state;
        const {enqueueSnackbar} = this.props;
        const preparedData = prepareDataToCreate(client, device, otherInformation);
        console.log(preparedData);
        OrderService
            .create(preparedData)
            .then(res => {
                console.log(res)
                enqueueSnackbar("Заказ успешно создан", {variant: 'success'});
            })
            .catch(err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            })
        //TODO WAITING FOR READY BACKEND
    };

    render() {
        const {classes, open, toggleCreate} = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={toggleCreate}
                    maxWidth={"md"}
                    scroll={"paper"}
                    fullWidth
                    TransitionComponent={Transition}
                >
                    <DialogAppBar classes={classes} toggleCreate={toggleCreate} createOrder={this.createOrder}/>
                    <DialogContent>
                        <ClientBlock setValues={this.setValues}/>
                        <DeviceBlock setValues={this.setValues}/>
                        <OtherInformationBlock setValues={this.setValues}/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

CreateOrder.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleCreate: PropTypes.func.isRequired
};

export default withSnackbar(withStyles(styles)(CreateOrder));