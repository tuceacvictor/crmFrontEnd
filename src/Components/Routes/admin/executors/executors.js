import React, {Component} from 'react';
import ExecutorService from "../../../../Services/API/executor.API";
import {withSnackbar} from "notistack";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";

class Executors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Имя', field: 'name'},
                {title: 'Номер телефона', field: 'phone'},
            ],
            data: [],
            openAction: false,
            user: {},
            formSchema: [
                {name: 'name', label: "Имя", disabled: false, type: 'string', autoFocus: true},
                {name: 'phone', label: "Номер телефона", disabled: false, type: 'string', autoFocus: false}
            ]
        }
    }


    render() {
        const {columns, formSchema} = this.state;
        return (
            <div style={{width: '100%'}}>
                <CrudDefault
                    service={ExecutorService}
                    columns={columns}
                    title={'Исполнители'}
                    actionTitle={'исполнитель'}
                    tooltipCreate={'Создать Исполнителя'}
                    creatable
                    formSchema={formSchema}
                />
            </div>

        );

    }
}

export default withSnackbar(Executors);