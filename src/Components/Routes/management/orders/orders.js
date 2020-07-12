import React, {Component} from 'react';
import AppHoc from '../../../../Services/HocHelpers/AppHoc';
import withStyles from "@material-ui/core/styles/withStyles";
import ToolBar from "./toolBar";
import CreateOrder from "./createOrder";
import TableOrder from "./table";

const styles = () => ({
    wrapper: {
        width: '100%'
    }

});

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filter: {},
            isOpenCreate: false,
        };
    }

    componentDidMount() {

    }

    toggleCreateOrder = () => {
        this.setState(state => ({
            isOpenCreate: !state.isOpenCreate
        }))
    };

    onChangeSearch = (event) => {

    };

    onChangeFilter = (event) => {

    };


    render() {
        const {classes} = this.props;
        const {isOpenCreate} = this.state;
        return (
            <div className={classes.wrapper}>
                <ToolBar
                    toggleCreate={this.toggleCreateOrder}
                />
                <CreateOrder
                    open={isOpenCreate}
                    toggleCreate={this.toggleCreateOrder}
                />
                <div style={{marginTop: 10}}>
                    <TableOrder/>
                </div>
            </div>
        );
    }

}

Orders.propTypes = {};


export default AppHoc(withStyles(styles)(Orders));