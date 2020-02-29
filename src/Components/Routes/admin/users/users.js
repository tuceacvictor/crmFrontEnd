import React, {Component} from 'react';
import MaterialTable from "material-table";
import UserAction from "./userAction/userAction";
import UserService from "../../../../Services/API/user";
import {withSnackbar} from "notistack";
import getSafe from "../../../../Helpers/getSafeValue";

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

    componentDidMount() {
        const {enqueueSnackbar} = this.props;
        UserService
            .getUsers()
            .then(res => {
                this.setState({data: res})
            })
            .catch(err => {
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            })
    }

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

export default withSnackbar(Users);