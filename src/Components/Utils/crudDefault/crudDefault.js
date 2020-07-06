import React, {Component} from 'react';
import {withSnackbar} from "notistack";
import AppHoc from "../../../Services/HocHelpers/AppHoc";
import PropTypes from 'prop-types';
import MaterialTable from "material-table";
import CrudDefaultAction from "./crudDefaultAction/crudDefaultAction";



class CrudDefault extends Component {
    constructor(props) {
        super(props);
        this.tableRef = React.createRef();
        this.state = {
            columns: [],
            openAction: false,
            record: {}
        }
    }

    async componentDidMount() {
        const {columns} = this.props;
        this.setColumns(columns);

    }

    setColumns = (columns) => {
        this.setState({columns})
    };

    onClickAction = (recordId) => {
        this.setState(state => ({
            openAction: !state.openAction,
            recordId: recordId
        }))
    };

    render() {
        const {columns, openAction, loading, recordId} = this.state;
        const {title,
            tooltipCreate,
            service,
            creatable,
            formSchema,
            actionTitle,
            AdditionalActions,
            updateRecord
        } = this.props;
        return (
            <div style={{width: '100%'}}>
                <MaterialTable
                    isLoading={loading}
                    tableRef={this.tableRef}
                    title={title}
                    columns={columns}
                    data={query =>
                        new Promise((resolve) => {
                            service
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
                                        data:[],
                                        page: 0,
                                        totalCount: 0
                                    })
                                })
                        })
                    }

                    onRowClick={(e, row) => this.onClickAction(row.id)}
                    actions={creatable && [
                        {
                            icon: 'add',
                            tooltip: tooltipCreate,
                            isFreeAction: true,
                            onClick: () => this.onClickAction(),
                        }
                    ]}
                />
                {
                    openAction && (
                        <CrudDefaultAction
                                     open={openAction}
                                     getData={() => {this.tableRef.current.onQueryChange()}}
                                     onClose={this.onClickAction}
                                     recordId={recordId}
                                     service={service}
                                     formSchema={formSchema}
                                     actionTitle={actionTitle}
                                     updateRecord={updateRecord}
                                     AdditionalActions={AdditionalActions}

                        />
                    )
                }
            </div>
        );
    }

}

CrudDefault.propTypes = {
    service: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    creatable: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    actionTitle: PropTypes.string.isRequired,
    tooltipCreate: PropTypes.string.isRequired,
    formSchema: PropTypes.array.isRequired
};

export default AppHoc(withSnackbar(CrudDefault));