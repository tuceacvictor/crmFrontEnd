import React from "react";

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
        margin: '5px 0'
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

const defaultAdditional = {
    page: 0
};

const loadPageOptions = async (q, prevOptions, { page }, service, getLabel, getValue) => {
    const { options, hasMore } = await loadOptions(q, page, service, getLabel, getValue);
    return {
        options,
        hasMore,
        additional: {
            page: page + 1
        }
    };
};

const ReactSelect = (props) => {
    const {classes} = props;
    const {value, label, onChange, service, getLabel, getValue, name} = props;
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
            display: 'block'
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
            additional={defaultAdditional}
            loadOptions={(q, prevOptions, p) => loadPageOptions(q, prevOptions, p, service, getLabel, getValue)}
            onChange={(value) => onChange(value, name)}
            isClearable
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