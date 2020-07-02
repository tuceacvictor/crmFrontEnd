import React from 'react';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import {TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Form = ({schema, onChange, record, onChangeRemote}) => {
    return (
        schema.map(field => {
            return (
                <Field
                    field={field}
                    record={record}
                    onChange={onChange}
                    onChangeRemote={onChangeRemote}
                />
            )
        })
    )
};


const Field = ({field, record, onChange, onChangeRemote}) => {
    switch (field.type) {
        case 'string':
            return <FormControl fullWidth>
                <TextField
                    autoFocus={field.autoFocus}
                    style={{margin: '5px 0'}}
                    disabled={field.disabled}
                    variant={field.variant}
                    name={field.name}
                    label={field.label}
                    value={record[field.name] || ''}
                    type={"string"}
                    required={field.required}
                    onChange={onChange}
                />
            </FormControl>;
        case 'number':
            return <FormControl fullWidth>
                <TextField
                    autoFocus={field.autoFocus}
                    style={{margin: '5px 0'}}
                    variant={field.variant}
                    disabled={field.disabled}
                    name={field.name}
                    label={field.label}
                    value={record[field.name] || ''}
                    type={"number"}
                    required={field.required}
                    onChange={onChange}
                />
            </FormControl>;
        case 'date':
            return <FormControl fullWidth>
                <TextField
                    autoFocus={field.autoFocus}
                    style={{margin: '5px 0'}}
                    variant={field.variant}
                    disabled={field.disabled}
                    name={field.name}
                    label={field.label}
                    value={record[field.name] || ''}
                    InputLabelProps={{
                        shrink: true
                    }}
                    type={"date"}
                    required={field.required}
                    onChange={onChange}
                />
            </FormControl>;
        case 'dateTime':
            return <FormControl fullWidth>
                <TextField
                    autoFocus={field.autoFocus}
                    style={{margin: '5px 0'}}
                    variant={field.variant}
                    disabled={field.disabled}
                    name={field.name}
                    label={field.label}
                    value={record[field.name] || ''}
                    type={"datetime-local"}
                    required={field.required}
                    onChange={onChange}
                />
            </FormControl>;
        case 'select':
            return <FormControl fullWidth>
                <TextField
                    autoFocus={field.autoFocus}
                    style={{margin: '5px 0'}}
                    disabled={field.disabled}
                    variant={field.variant}
                    select
                    name={field.name}
                    label={field.label}
                    value={record[field.name] || ''}
                    required={field.required}
                    onChange={onChange}
                >
                    {field.options.map(opt => {
                        return (
                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                        )
                    })}

                </TextField>
            </FormControl>;
        case 'checkbox':
            return <FormControlLabel
                labelPlacement={"start"}
                control={
                    <Checkbox
                        checked={record[field.name]}
                        onChange={onChange}
                        name={field.name}
                        color={field.color || 'primary'}
                    />
                }
                label={field.label}
            />
        case 'selectRemote':
            return <SelectRemote field={field} onChangeRemote={onChangeRemote} record={record}/>;
        default:
            return <FormControl fullWidth>
                <TextField
                    autoFocus={field.autoFocus}
                    style={{margin: '5px 0'}}
                    disabled={field.disabled}
                    name={field.name}
                    label={field.label}
                    value={record[field.name] || ''}
                    type={"string"}
                    required={field.required}
                    onChange={onChange}
                />
            </FormControl>;
    }
};


const SelectRemote = ({field, onChangeRemote, record}) => {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;
    React.useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
        (async () => {
            const data = await field.service.getData();
            if (active) {
                setOptions(data.rows)
            }
        })();

        return () => {
            active = false;
        };
    }, [field.service, loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);
    return (
        <Autocomplete
            open={open}
            multiple={field.isArray}
            onOpen={() => {setOpen(true)}}
            onClose={() => {setOpen(false)}}
            autoFocus={field.autoFocus}
            disabled={field.disabled}
            onChange={(e, value = {}) => onChangeRemote(value, field.name)}
            getOptionLabel={(option) => option.name}
            options={options || [{}]}
            loading={loading}
            value={record[field.name] || []}
            renderInput={(params) => (
                <TextField
                    {...params}
                    style={{margin: '5px 0'}}
                    fullWidth
                    label={field.label}
                    variant={field.variant}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />

    )
};


Form.propTypes = {
    schema: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeRemote: PropTypes.func,
    record: PropTypes.object
};

export default Form;