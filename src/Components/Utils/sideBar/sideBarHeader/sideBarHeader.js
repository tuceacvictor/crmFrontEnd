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
        const {currentUser: {user: {defaultOffice, offices = []}}, setOffice} = this.props;
        let currentOffice = defaultOffice ? defaultOffice.id : offices.length > 0 ? offices[0].id : null;
        this.setState({defaultOffice: currentOffice, offices: offices});
        setOffice(currentOffice)
    };

    onChange = (event) => {
        const {setOffice} = this.props;
        this.setState({defaultOffice: event.target.value});
        setOffice(event.target.value)
    };

    render() {
        const {classes} = this.props;
        const {defaultOffice = {}, offices} = this.state;
        return (
            <div className={classes.wrapper}>
                <FormControl fullWidth>
                    <InputLabel>Офис</InputLabel>
                    <Select
                        value={defaultOffice || 0}
                        disableUnderline={true}
                        onChange={this.onChange}
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