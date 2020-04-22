import React, {Component} from "react";

class Home extends Component {


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.isOpenDrawer !== this.props.isOpenDrawer
    }

    render() {
        return (
            <div>
                Home Page
            </div>
        );
    }
}

export default Home;