import React, {Component} from 'react';
import {withSnackbar} from "notistack";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";
import CategoryService from "../../../../Services/API/categories";

class Category extends Component {
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
                service={CategoryService}
                title={'Категории склада'}
                actionTitle={"Категория"}
                formSchema={formSchema}
            />
        );
    }
}

export default withSnackbar(Category);