import React, {Component} from 'react';
import {withSnackbar} from "notistack";
import OfficeService from "../../../../Services/API/office.API";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";

class Offices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Название', field: 'name'},
                {title: 'Адресс', field: 'address'},
            ],
            formSchema: [
                {name: 'name', label: "Название", disabled: false, type: 'string', autoFocus: true},
                {name: 'address', label: "Адресс", disabled: false, type: 'string', autoFocus: false}
            ]
        }
    }

    render() {
        const {columns, formSchema} = this.state;
        return (
            <CrudDefault
                title={"Офисы"}
                actionTitle={'Офис'}
                formSchema={formSchema}
                columns={columns}
                service={OfficeService}
                creatable={true}
                tooltipCreate={'Создать Офис'}
            />
        );
    }
}

export default withSnackbar(Offices);