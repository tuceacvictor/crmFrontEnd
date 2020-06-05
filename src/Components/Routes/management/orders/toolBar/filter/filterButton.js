import React from 'react';
import Button from "@material-ui/core/Button";
import {Hidden} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const FilterButton = () => {
    return (
        <>
            <Hidden xsDown>
                <Button
                    variant={"contained"}
                    color={"primary"}
                    style={{margin: "0 5px", height: 50}}
                >
                    Фильтр
                </Button>
            </Hidden>
            <Hidden smUp>
                <IconButton
                    variant={"contained"}
                    color={"primary"}>
                    <Icon>
                        filter_list
                    </Icon>
                </IconButton>
            </Hidden>
        </>
    )
};
export default FilterButton;