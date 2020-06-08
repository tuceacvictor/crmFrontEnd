import React from 'react';
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import classNames from 'classnames';
import {Cancel} from "@material-ui/icons";
import {components} from 'react-select';
import {FormControl, Icon, Tooltip} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconButton from "@material-ui/core/IconButton";

export const InputComponent = ({inputRef, ...props}) => {
    return <div ref={inputRef} {...props} />;
};

export const Control = (props) => {
    return (
        <FormControl fullWidth={props.selectProps.fullWidth}>
            <TextField
                variant={props.selectProps.variant}
                fullWidth={props.selectProps.fullWidth}
                label={props.selectProps.label}
                error={props.selectProps.error}
                type={'string'}
                InputLabelProps={{
                    style: {backgroundColor: '#fff'}
                }}
                InputProps={{
                    inputComponent: InputComponent,
                    disableUnderline: !!props.selectProps.disableUnderline,
                    inputProps: {
                        variant: props.variant,
                        autoFocus: props.autoFocus,
                        className: props.selectProps.classes.input,
                        ref: props.innerRef,
                        children: props.children,
                        ...props.innerProps,
                    },
                }}
            />
        </FormControl>
    );
};

export const Option = (props) => {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                paddingBottom: 2,
                paddingTop: 2,
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
};

export const Placeholder = (props) => {
    return (
        <Typography
            color="textSecondary"
            {...props.innerProps}
            className={props.selectProps.classes.placeholder}
        >
            {props.children}
        </Typography>
    );
};

export const ValueContainer = (props) => {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
};


export const MultiValue = (props) => {
    return (
        <Chip
            tabIndex={-1}
            style={{height: 27}}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<Cancel {...props.removeProps} />}
        />
    );
};

export const DropdownIndicator = (
    props: ElementConfig<typeof components.DropdownIndicator>
) => {
    return (
        <components.DropdownIndicator {...props}>
            <IconButton style={{padding: 0}}>
                <ArrowDropDownIcon
                    style={{
                        color: 'rgba(0, 0, 0, 0.54)',
                        transform: props.selectProps.menuIsOpen === true ? 'rotate(180deg)' : "rotate(0deg)"
                    }}/>
            </IconButton>
        </components.DropdownIndicator>
    );
};

export const Menu = (props) => {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props} >
            {props.children}
        </Paper>
    );
};
