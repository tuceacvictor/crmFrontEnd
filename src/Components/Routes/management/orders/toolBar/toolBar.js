import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import AddButton from "./addButton";
import Filter from "./filter";
import Search from "./search";

const styles = () => ({
    wrapper: {
        width: '100%',
        minHeight: '50px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row-reverse'
    }
});

class ToolBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {classes, toggleCreate} = this.props;
        return (
            <div className={classes.wrapper}>
                <AddButton toggleCreate={toggleCreate}/>
                <Filter/>
                <Search/>
            </div>
        );
    }

}

ToolBar.propTypes = {};

export default withStyles(styles)(ToolBar);