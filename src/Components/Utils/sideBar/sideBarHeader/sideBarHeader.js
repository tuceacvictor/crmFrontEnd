import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import AppHoc from '../../../../Services/HocHelpers/AppHoc';
import Select from '@material-ui/core/Select';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';

const styles = () => ({
    wrapper: {
        marginLeft: 20,
        maxWidth: 155,
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
});

class SideBarHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultOffice: {},
            offices: [],
        }
    };

    componentDidMount() {
        const {currentUser: {user: {defaultOffice, office}}} = this.props;
        this.setState({defaultOffice: defaultOffice ? defaultOffice : office[0], offices: office}, () => {
            console.log(this.state)
        });
    };

    onChange = (event) => {

    };

    render() {
        const {classes} = this.props;
        const {defaultOffice, offices} = this.state;
        return (
            <div className={classes.wrapper}>
                <FormControl fullWidth>
                    <InputLabel>Офис</InputLabel>
                    <Select
                        value={defaultOffice.id || 0}
                        disableUnderline={true}

                    >
                        {offices.map(office => {
                            return (
                                <MenuItem key={office.id} value={office.id}>{office.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

            </div>
        );
    }
}

export default AppHoc(withStyles(styles)(SideBarHeader));