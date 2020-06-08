import React, {useState} from "react";

import AsyncPaginate, { wrapMenuList } from "react-select-async-paginate";
import Creatable from "react-select/creatable";
import loadOptions from "./loadOptions";

import {
    Control, MultiValue,
    Menu,
    Option,
    ValueContainer,
    DropdownIndicator,
    Placeholder
} from './components';
import {withStyles} from "@material-ui/styles";

const styles = () => ({
    textField: {
        display: 'block',
        position: 'inherit',
        width: '100%',
        margin: 5
    },
    input: {
        display: 'flex',
    },
    chip: {
        margin: 3
    },
    valueContainer: {
        display: 'flex',
        overflow: 'hidden',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
    },
    paper: {
        position: 'absolute',
        overflow: 'auto',
        left: 0,
        right: 0,
        maxHeight: 200

    },
    groupFieldsWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const ReactSelect = (props) => {
    const {classes} = props;
    const {value, label, onChange} = props;
    const customStyles = {
        indicatorSeparator: () => ({display: 'none'}),
        placeholder: () => ({display: 'none'}),
        valueContainer: () => ({
            flex: '1 1 auto',
        }),
        menu: (styles) => ({
            ...styles,
            position: 'absolute',
            width: '100%',
            zIndex: 9999,

        }),
        clearIndicator: () => ({
            display: 'none'
        }),
        option: () => ({}),
        input: () => ({
            padding: 0
        }),
    };

    const MenuList = wrapMenuList(Menu);

    return (
        <AsyncPaginate
            SelectComponent={Creatable}
            className={classes.textField}
            value={value}
            fullWidth={true}
            variant={'outlined'}
            label={label}
            placeholder={''}
            styles={customStyles}
            loadOptions={loadOptions}
            onChange={onChange}
            classes={classes}
            components={{
                Control,
                ValueContainer,
                MultiValue,
                DropdownIndicator,
                Placeholder,
                MenuList,
                Option
            }}
        />
    )
};

export default withStyles(styles)(ReactSelect);