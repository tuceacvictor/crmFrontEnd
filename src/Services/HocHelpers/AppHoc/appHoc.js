import React from 'react';
import {AppConsumer} from '../../Context/AppContext'

const ListHoc = (Wrapped) => {
    return (props) => {
        return (
            <AppConsumer>
                {
                    (screenProps) => {
                        return (
                            <Wrapped {...props} {...screenProps}/>
                        )
                    }
                }
            </AppConsumer>
        )
    }
};
export default ListHoc;