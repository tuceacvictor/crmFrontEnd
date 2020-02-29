import React, {Component} from 'react';
import {Dialog, DialogTitle, Typography, IconButton, withStyles, TextField, DialogActions} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

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
        const {classes, onClose} = this.props;
        return (
            <DialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">Новый Пользователь</Typography>
                {onClose ? (
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                ) : null}
            </DialogTitle>
        )
    };

    dialogActions = () => {
        const {onClose} = this.props;
        return (
            <DialogActions>
                <Button variant={"contained"} color={"primary"}>Создать</Button>
                <Button variant={"contained"} color={"default"} onClick={onClose}>Отмена</Button>
            </DialogActions>
        )
    };

    render() {
        const {open, onClose} = this.props;
        return (
            <Dialog open={open} onClose={onClose}>
                {this.dialogTitle()}
                <DialogContent dividers>
                    <FormControl fullWidth margin="normal">
                        <TextField
                        label={'Логин'}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label={'Е-майл'}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label={'Роль'}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label={'Пароль'}
                        />
                    </FormControl>
                </DialogContent>
                {this.dialogActions()}
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