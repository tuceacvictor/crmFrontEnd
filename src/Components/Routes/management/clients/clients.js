import React, {Component} from 'react';
import {withSnackbar} from "notistack";
import whereKnownService from "../../../../Services/API/whereType.API";
import clientKnownService from "../../../../Services/API/client.API";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";

class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Имя', field: 'name'},
                {title: 'Номер Телефона', field: 'phone'},
                {title: 'Откуда Узнал', field: 'whereKnown_id'},
            ],
            formSchema: [
                {name: 'phone', label: "Номер Телефона", type: 'string', disabled: false, autoFocus: true},
                {name: 'name', label: "Имя", type: 'string', disabled: false, autoFocus: false},
                {name: 'whereKnown_id',
                    label: "Откуда узнал",
                    disabled: false,
                    type: 'selectRemote',
                    autoFocus: true,
                    service: whereKnownService
                },
            ]
        }
    }

    render() {
        const {columns, formSchema} = this.state;
        return (
            <CrudDefault
                title={"Клиенты"}
                actionTitle={'Клиент'}
                formSchema={formSchema}
                columns={columns}
                service={clientKnownService}
                creatable={true}
                tooltipCreate={'Создать Клиента'}
            />
        );
    }
}

export default withSnackbar(Client);