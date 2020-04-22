import React, {Component} from 'react';
import MaterialTable from "material-table";
import OfficeAction from "./officeAction/officeAction";
import {withSnackbar} from "notistack";
import getSafe from "../../../../Helpers/getSafeValue";
import OfficeService from "../../../../Services/API/office";

class Offices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title: 'Название', field: 'name'},
                {title: 'Адресс', field: 'address'},
            ],
            data: [],
            openAction: false,
            office: {}
        }
    }

    componentDidMount() {
        this.getOffices();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.isOpenDrawer !== this.props.isOpenDrawer
    }

    onClickAction = (officeId) => {
        this.setState(state => ({
            openAction: !state.openAction,
            officeId: officeId
        }))
    };

    getOffices = () => {
        const {enqueueSnackbar} = this.props;
        this.setState({loading: true});
        OfficeService
            .getOffices()
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

    render() {
        const {columns, data, openAction, loading, officeId} = this.state;
        return (
            <div style={{width: '100%'}}>
                <MaterialTable
                    isLoading={loading}
                    title={'Офисы'}
                    columns={columns}
                    data={data}
                    onRowClick={(e, row) => this.onClickAction(row.id)}
                    actions={[
                        {
                            icon: 'add',
                            tooltip: 'Создать Офис',
                            isFreeAction: true,
                            onClick: () => this.onClickAction(),
                        }
                    ]}
                />
                {
                    openAction && (
                        <OfficeAction open={openAction}
                                      getOffices={this.getOffices}
                                      onClose={this.onClickAction}
                                      officeId={officeId}
                        />
                    )
                }
            </div>
        );
    }
}

export default withSnackbar(Offices);