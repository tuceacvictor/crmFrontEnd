import React, {Component} from 'react';
import {withSnackbar} from "notistack";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";
import DeviceTypeService from "../../../../Services/API/device/device_type.API";

class Device_type extends Component {
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
                service={DeviceTypeService}
                title={'Типы устройств'}
                actionTitle={"Тип"}
                formSchema={formSchema}
            />
        );
    }
}

export default withSnackbar(Device_type);