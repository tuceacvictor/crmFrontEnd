import React from 'react';
import TextField from "@material-ui/core/TextField";

const Search = () => {
    return(
        <TextField
            variant={"outlined"}
            fullWidth
            placeholder={'Поиск заказов...'}
        />
    )
};

export default Search;