import React, {Component} from 'react';
import {withSnackbar} from "notistack";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";
import DeviceModelService from "../../../../Services/API/device/device_model.API";

class Device_model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Название', field: 'name'},
            ],
            formSchema: [
                {name: 'name', label: "Название", disabled: false, type: 'string', autoFocus: true},
            ],
            data: [],
            openAction: false,
            record: {}
        }
    }

    render() {
        const {columns, formSchema} = this.state;
        return (
            <CrudDefault
                columns={columns}
                creatable={true}
                service={DeviceModelService}
                title={'Модели устройств'}
                actionTitle={"Модель"}
                formSchema={formSchema}
            />
        );
    }
}

export default withSnackbar(Device_model);