import React, {Component} from 'react';
import UserService from "../../../../Services/API/user.API";
import {withSnackbar} from "notistack";
import CrudDefault from "../../../Utils/crudDefault/crudDefault";
import OfficeService from "../../../../Services/API/office.API";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Логин', field: 'login'},
                {title: 'Е-мейл', field: 'email'},
                {title: 'Роль', field: 'role.name'},],
            data: [],
            openAction: false,
            user: {},
            formSchema: [
                {name: 'login', label: "Логин", disabled: false, type: 'string', autoFocus: true},
                {name: 'email', label: "Email", disabled: false, type: 'string', autoFocus: false},
                {
                    name: 'roleId',
                    label: "Роль",
                    disabled: false,
                    type: 'select',
                    autoFocus: false,
                    options: [
                        {label: 'Менеджер', value: '2'},
                        {label: 'Админ', value: '1'}

                    ]
                },
                {
                    name: 'offices',
                    label: "Офисы",
                    disabled: false,
                    type: 'selectRemote',
                    autoFocus: false,
                    isArray: true,
                    service: OfficeService
                },

            ]
        }
    }


    render() {
        const {columns, formSchema} = this.state;
        return (
            <div style={{width: '100%'}}>
                <CrudDefault
                    service={UserService}
                    columns={columns}
                    title={'Пользователи'}
                    actionTitle={'Пользователь'}
                    tooltipCreate={'Создать Пользователя'}
                    creatable
                    formSchema={formSchema}
                />
            </div>

        );
    }
}

export default withSnackbar(Users);