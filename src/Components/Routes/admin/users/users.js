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

    onClickAction = (userId) => {
        this.setState(state => ({
            openAction: !state.openAction,
            userId: userId
        }))
    };

    getUsers = () => {
        const {enqueueSnackbar} = this.props;
        this.setState({loading: true});
        UserService
            .getUsers()
            .then(res => {
                this.setState({data: res, loading: false})
            })
            .catch(err => {
                this.setState({loading: false});
                enqueueSnackbar(
                    getSafe(() => err.data.message, 'Произошла неизвестная ошибка!'),
                    {variant: 'error'});
            })
    };

    componentDidMount() {
        this.getUsers();
    }

    render() {
        const {columns, data, openAction, loading, userId} = this.state;
        return (
            <div style={{width: '100%'}}>
                <MaterialTable
                    isLoading={loading}
                    title={'Пользователи'}
                    columns={columns}
                    data={data}
                    onRowClick={(e, row) => this.onClickAction(row.id)}
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Создать Пользователя',
                            isFreeAction: true,
                            onClick: () => this.onClickAction(),
                        }
                    ]}
                />
                {
                    openAction && (
                        <UserAction open={openAction}
                                    getUsers={this.getUsers}
                                    onClose={this.onClickAction}
                                    userId={userId}
                        />
                    )
                }
            </div>
        );
    }
}

export default withSnackbar(Users);