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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import ClientBlock from "./client";
import DialogContent from "@material-ui/core/DialogContent";
import DeviceBlock from "./device/device";
import OtherInformationBlock from "./otherInformation/otherInformation";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const DialogAppBar = ({classes, toggleCreate}) => {
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleCreate} aria-label="close">
                    <CloseIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Создать Заказ
                </Typography>
                <Button autoFocus color="inherit" onClick={toggleCreate}>
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
                    <DialogAppBar classes={classes} toggleCreate={toggleCreate}/>
                    <DialogContent>
                        <ClientBlock/>
                        <DeviceBlock/>
                        <OtherInformationBlock/>
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

export default withStyles(styles)(CreateOrder);