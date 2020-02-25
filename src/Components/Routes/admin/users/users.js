import React, {Component} from 'react';
import MaterialTable from "material-table";
import UserAction from "./userAction/userAction";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Логин', field: 'login'},
                {title: 'Е-мейл', field: 'email'},
                {title: 'Роль', field: 'role'},],
            data: [],
            openAction: false,
            user: {}
        }
    }

    onClickAction = (user) => {
        this.setState(state => ({
            openAction: !state.openAction,
            user: user
        }))
    };

    render() {
        const {columns, data, openAction} = this.state;
        return (
            <div style={{width: '100%'}}>
                <MaterialTable
                    title={'Пользователи'}
                    columns={columns}
                    data={data}
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Создать Пользователя',
                            isFreeAction: true,
                            onClick: () => this.onClickAction()
                        }
                    ]}
                />
                <UserAction open={openAction} onClose={this.onClickAction} user={{}}/>
            </div>
        );
    }
}

export default Users;