import React, {Component} from 'react';
import {Dialog, DialogTitle, Typography, IconButton, withStyles, TextField} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import DialogContent from "@material-ui/core/DialogContent";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

class UserAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    dialogTitle = () => {
        const {classes, children, onClose} = this.props;
        return (
            <DialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">Создать Пользователя</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </DialogTitle>
        )
    };

    render() {
        const {open, onClose, user} = this.props;
        return (
            <Dialog open={open} onClose={onClose}>
                {this.dialogTitle()}
                <DialogContent dividers>
                    <TextField />
                    <TextField />
                    <TextField />
                </DialogContent>
            </Dialog>
        );
    }
}

UserAction.propTypes = {
    user: PropTypes.object,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired

};

export default withStyles(styles)(UserAction)