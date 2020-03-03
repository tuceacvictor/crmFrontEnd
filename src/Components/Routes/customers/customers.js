import React, {Component} from 'react';
import CustomerService from "../../../Services/API/customer";
import MaterialTable from "material-table";


class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            columns: [
                {title: 'Имя', field: 'name'},
                {title: 'Номер Телефона', field: 'phone'},
                {title: 'Кол-во Обращений', field: 'orders_count'},
            ]
        }
    }


    componentDidMount() {
        this.setState({loading: true});
        CustomerService
            .getCustomers()
            .then(res => {
                this.setState({data: res, loading: false});
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err)
            })
    }

    render() {
        const {data, columns, selectedRow, loading} = this.state;
        return (
            <div style={{width: '100%'}}>
                <MaterialTable
                    title="База Клиентов"
                    isLoading={loading}
                    columns={columns}
                    data={data}
                    onRowClick={((evt, selectedRow) => this.setState({selectedRow}))}
                    options={{
                        //selection: true,
                        exportButton: true,
                        exportAllData: true,
                        // grouping: true,
                        // rowStyle: rowData => ({
                        //     backgroundColor: (selectedRow && selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                        // })
                    }}
                />
            </div>
        );
    }
}

export default Customers;
