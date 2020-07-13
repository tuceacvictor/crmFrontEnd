import React, {Component} from 'react'
import MaterialTable from "material-table";
import OrderService from "../../../../../Services/API/order.API";
import ReadOrder from "../readOrder/readOrder";

class TableOrder extends Component {
    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
        this.state = {
            columns: [
                {title: 'ID', field: 'id'},
                {title: "Клиент", field: 'customer.phone'},
                {title: "Устройство", field: 'device.serial'},
                {
                    title: "Статус", field: 'status',
                    render: (rowData) =>
                        rowData.status === 'opened' ? <span style={{color: 'green'}}>Открыт</span> :
                            rowData.status === 'new' && <span style={{color: 'green'}}>Новый</span>
                }
            ],
            isOpenRead: false,
            recordId: null
        }
    }

    onClickAction = (id) => {
        this.setState({isOpenRead: true, recordId: id})
    };

    onCloseRead = () => {
        this.setState({isOpenRead: false})
    };


    render() {
        const {columns, isOpenRead, recordId} = this.state;
        return (
            <div style={{width: '100%'}}>
                <MaterialTable
                    tableRef={this.tableRef}
                    columns={columns}
                    title={"Заказы"}
                    onRowClick={(e, row) => this.onClickAction(row.id)}
                    data={query =>
                        new Promise((resolve) => {
                            OrderService
                                .getData(query.page, query.pageSize, query.search)
                                .then(response => {
                                    resolve({
                                        data: response.rows,
                                        page: response.page,
                                        totalCount: response.count
                                    })
                                })
                                .catch(() => {
                                    resolve({
                                        data: [],
                                        page: 0,
                                        totalCount: 0
                                    })
                                })
                        })
                    }
                    options={{
                        search: false
                    }}
                    localization={{
                        body: {
                            emptyDataSourceMessage: "Заказов нет",
                        },
                        pagination: {
                            labelDisplayedRows: '{from}-{to} из {count}',
                            labelRowsSelect: 'записей',
                            labelRowsPerPage: 'Записей на странице:',
                            firstAriaLabel: 'На первую страницу',
                            firstTooltip: 'На первую страницу',
                            previousAriaLabel: 'Предыдущая страница',
                            previousTooltip: 'Предыдущая страница',
                            nextAriaLabel: 'Следующая страница',
                            nextTooltip: 'Следующая страница',
                            lastAriaLabel: 'На последнюю страницу',
                            lastTooltip: 'На последнюю страницу'
                        }
                    }}
                    actions={[
                        {
                            icon: 'refresh',
                            tooltip: 'Обновить данные',
                            isFreeAction: true,
                            onClick: () => this.tableRef.current && this.tableRef.current.onQueryChange(),
                        }
                    ]}
                />
                {
                    isOpenRead && (
                        <ReadOrder
                            isOpen={isOpenRead}
                            recordId={recordId}
                            onClose={this.onCloseRead}
                        />
                    )}
            </div>
        );
    }
}

export default TableOrder;