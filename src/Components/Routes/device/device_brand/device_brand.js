import React, {Component} from 'react';
import {withSnackbar} from "notistack";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";
import DeviceBrandService from "../../../../Services/API/device/device_brand.API";

class Device_brand extends Component {
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
                service={DeviceBrandService}
                title={'Бренды Моделей'}
                actionTitle={"Бренд"}
                formSchema={formSchema}
            />
        );
    }
}

export default withSnackbar(Device_brand);