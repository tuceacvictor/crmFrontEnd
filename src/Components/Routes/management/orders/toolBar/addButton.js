import React from 'react';
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import {Hidden} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";


const AddButton = ({toggleCreate}) => {
    return (
        <>
            <Hidden xsDown>
                <Button
                    onClick={toggleCreate}
                    variant={"contained"}
                    color={"primary"}
                    style={{margin: "0 5px", minWidth: 179, height: 50}}
                >
                    Создать Заказ
                    <Icon style={{marginLeft: 5}}>
                        add_outlined
                    </Icon>
                </Button>
            </Hidden>
            <Hidden smUp>
            <IconButton
                onClick={toggleCreate}
                variant={"contained"}
                color={"primary"}
            >
                <Icon>
                    add_outlined
                </Icon>
            </IconButton>
            </Hidden>
        </>
    )
};
AddButton.propTypes = {};

export default AddButton;