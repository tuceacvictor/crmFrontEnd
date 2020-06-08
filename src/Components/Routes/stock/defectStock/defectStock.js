import React, {Component} from 'react';
import {withSnackbar} from "notistack";
import DefectStockService from "../../../../Services/API/defectStock.API";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";
import CategoryService from "../../../../Services/API/categories.API";

class DefectStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Название', field: 'name'},
                {title: 'Кол-во', field: 'count'},
                {title: 'Категория', field: 'category'},
            ],
            formSchema: [
                {name: 'name', label: "Название", disabled: true, type: 'string', autoFocus: false},
                {
                    name: 'category',
                    label: "Категория",
                    disabled: true,
                    type: 'selectRemote',
                    autoFocus: false,
                    service: CategoryService
                },
                {name: 'count', label: "Количество", disabled: false, type: 'number', autoFocus: true},
                {name: 'description', label: "Причина", disabled: false, type: 'string', autoFocus: false},
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
                creatable={false}
                service={DefectStockService}
                title={'Склад Бракованных Запчастей'}
                actionTitle={"Запчасть"}
                formSchema={formSchema}
            />
        );
    }
}

export default withSnackbar(DefectStock);