import React, {Component} from 'react';
import CustomerService from "../../../Services/API/customer";
import MaterialTable from "material-table";


class Customers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [
                {title: 'Имя', field: 'name'},
                {title: 'Уникальный номер', field: 'id'},
                {title: 'Номер Телефона', field: 'phone', type: 'numeric'},
            ]
        }
    }


    componentDidMount() {
        CustomerService
            .getCustomers()
            .then(res => {
                this.setState({data: res})
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {data, columns} = this.state;
        return (
            <div style={{width: '100%'}}>
                <MaterialTable
                    title="База Клиентов"
                    columns={columns}
                    data={data}

                    options={{
                        //selection: true,
                        grouping: true
                    }}
                />
            </div>
        );
    }
}

export default Customers;
