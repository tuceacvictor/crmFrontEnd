import React, {Component} from 'react';
import AppHoc from '../../../Services/HocHelpers/AppHoc';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton, Switch,
    Typography,
    withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import colors from "../../../Helpers/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import UserService from "../../../Services/API/user";
import getSafe from "../../../Helpers/getSafeValue";
import {withSnackbar} from "notistack";

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
    dialogDividers: {
        padding: 5
    },
    labelStart: {
        marginLeft: 0
    },
    switchType: {
        marginTop: 10
    }
});

class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem('userData')),
            tabValue: 0,
            loading: false,
        }
    }

    updateProfile = () => {
        const {themeValues: {primaryColor, secondaryColor, type}, currentUser: {user: {id}}} = this.props;
        let nightLight = type === 'dark';
        this.setState({loading: true});
        UserService
            .updateProfile({id, primaryColor, secondaryColor, nightLight})
            .then(() => {
                this.setState({loading: false});
                this.props.enqueueSnackbar('Профиль обновлен', {variant: 'success'});
            })
            .catch(err => {
                this.setState({loading: false});
                this.props.enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            })
    };

    onChangeTabValue = (event, value) => {
        this.setState({tabValue: value})
    };

    dialogTitle = () => {
        const {classes, onClose} = this.props;
        return (
            <DialogTitle disableTypography className={classes.root}>
                <Typography variant="h6">Настройка профиля</Typography>
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
        const {loading} = this.state;
        return (
            <DialogActions>
                <Button disabled={loading} variant={"contained"} color={"primary"}
                        onClick={this.updateProfile}>Применить</Button>
                <Button variant={"contained"} color={"default"} onClick={onClose}>Отмена</Button>
            </DialogActions>
        )
    };

    dialogContent = () => {
        const {tabValue} = this.state;
        return (
            <div>
                <Tabs onChange={this.onChangeTabValue}
                      value={tabValue}
                      indicatorColor="primary"
                      textColor="primary"
                      variant={"fullWidth"}>
                    <Tab label={'Тема'} value={0}/>
                    <Tab label={'Профиль'} value={1}/>
                </Tabs>
                <TabPanel index={0} value={tabValue}>
                    {this.themeSetup()}
                </TabPanel>
                <TabPanel index={1} value={tabValue}>
                    {this.profileSetup()}
                </TabPanel>
            </div>
        )
    };

    themeSetup = () => {
        const {
            classes,
            changeThemeType,
            changePrimaryColor,
            changeSecondaryColor,
            themeValues
        } = this.props;
        return (
            <>
                <FormControl fullWidth margin="normal" className={classes.formControl}>
                    <InputLabel id="chooseThemeType">Основной цвет</InputLabel>
                    <Select
                        onChange={changePrimaryColor}
                        value={themeValues.primaryColor}
                        labelId="choosePrimaryColor"
                    >
                        {colors.map((color, index) => {
                            return (
                                <MenuItem key={`${color}_${index}`} value={color.id}>
                                    {color.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" className={classes.formControl}>
                    <InputLabel id="chooseThemeType">Дополнительный цвет</InputLabel>
                    <Select
                        onChange={changeSecondaryColor}
                        value={themeValues.secondaryColor}
                        labelId="chooseSecondaryColor"
                    >
                        {colors.map((color, index) => {
                            return (
                                <MenuItem key={`${color}_${index}`} value={color.id}>
                                    {color.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControlLabel
                    classes={{labelPlacementStart: classes.labelStart}}
                    className={classes.switchType}
                    control={
                        <Switch
                            checked={themeValues.type === 'dark'}
                            onChange={changeThemeType}
                            value={themeValues.type}/>
                    }
                    labelPlacement="start"
                    label="Ночной режим"
                />
            </>
        )
    };


    profileSetup = () => {
        const {currentUser} = this.props;
        return (
            <div>
                <p>Ваш логин: <b>{currentUser.user.login}</b></p>
                <p>Дата регистрации: <b>{currentUser.user.registered}</b></p>
                <p>Почта регистрации: <b>{currentUser.user.email}</b></p>
                <p>Роль: <b>{currentUser.user.role}</b></p>
                <p>Последнее обновление профиля: <b>{currentUser.user.lastUpdated}</b></p>
            </div>
        )
    };


    render() {
        const {classes, open, onClose} = this.props;
        return (
            <Dialog open={open} onClose={onClose} maxWidth={"md"} fullWidth>
                {this.dialogTitle()}
                <DialogContent dividers classes={{dividers: classes.dialogDividers}}>
                    {this.dialogContent()}
                </DialogContent>
                {this.dialogActions()}
            </Dialog>
        );
    }

}

UserSettings.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default AppHoc(withStyles(styles)(withSnackbar(UserSettings)));


const TabPanel = ({value, index, children}) => {
    return (
        <div
            style={{display: value === index ? 'block' : 'none', minHeight: 250}}
        >
            {children}
        </div>
    )
};