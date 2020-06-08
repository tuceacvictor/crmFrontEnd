import React, {Component} from 'react';
import {withSnackbar} from "notistack";
import whereKnownService from "../../../../Services/API/whereType.API";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";

class WhereKnown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Откуда узнали', field: 'name'},
            ],
            formSchema: [
                {name: 'name', label: "Откуда узнали", disabled: false, type: 'string', autoFocus: true},
            ]
        }
    }

    render() {
        const {columns, formSchema} = this.state;
        return (
            <CrudDefault
                title={"Откуда узнали"}
                actionTitle={'Тип'}
                formSchema={formSchema}
                columns={columns}
                service={whereKnownService}
                creatable={true}
                tooltipCreate={'Создать Тип'}
            />
        );
    }
}

export default withSnackbar(WhereKnown);