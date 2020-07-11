import React, {Component} from 'react';
import {withSnackbar} from "notistack";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";
import DeviceService from "../../../../Services/API/device/device.API";
import DeviceBrandService from "../../../../Services/API/device/device_brand.API";
import DeviceTypeService from "../../../../Services/API/device/device_type.API";
import DeviceModelService from "../../../../Services/API/device/device_model.API";

class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Серийный номер', field: 'serial'},
                {title: 'Бренд', field: 'brand.name'},
                {title: 'Модель', field: 'model.name'}
            ],
            formSchema: [
                {name: 'serial', label: "Серийный номер", disabled: false, type: 'string', autoFocus: true},
                {
                    name: 'brandId',
                    label: "Бренд",
                    disabled: false,
                    type: 'selectRemote',
                    autoFocus: false,
                    service: DeviceBrandService
                },
                {
                    name: 'typeId',
                    label: "Тип Устройства",
                    disabled: false,
                    type: 'selectRemote',
                    autoFocus: false,
                    service: DeviceTypeService
                },
                {
                    name: 'modelId',
                    label: "Модель",
                    disabled: false,
                    type: 'selectRemote',
                    autoFocus: false,
                    service: DeviceModelService
                },
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
                service={DeviceService}
                title={'Бренды Моделей'}
                actionTitle={"Бренд"}
                formSchema={formSchema}
            />
        );
    }
}

export default withSnackbar(Device);