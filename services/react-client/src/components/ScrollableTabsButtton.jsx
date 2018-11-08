import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import Schedule from '@material-ui/icons/Schedule';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Work from '@material-ui/icons/Work';
import Typography from '@material-ui/core/Typography';
import SimpleTableJudge from './SimpleTableJudge';
import SimpleTableTeam from './SimpleTableTeam';
import SimpleTableSchool from './SimpleTableSchool';
import SimpleTableEvent from './SimpleTableEvent';
import axios from 'axios';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class ScrollableTabsButtonForce extends React.Component {
  state = {
    value: 0,
    judges: [],
    teams: [],
    events: [],
    schools: [],
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

// User defined
    getJudges(){
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/judges`)
        .then((res) => { this.setState({ judges: res.data.data.judges }); })
        .catch((err) => { console.log(err); });
    }

    getTeams(){
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/teams`)
        .then((res) => { this.setState({ teams: res.data.data.teams }); })
        .catch((err) => { console.log(err); });
    }

    getSchools(){
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/schools`)
        .then((res) => { this.setState({ schools: res.data.data.schools }); })
        .catch((err) => { console.log(err); });
    }

    getEvents(){
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/events`)
        .then((res) => { this.setState({ events: res.data.data.events }); })
        .catch((err) => { console.log(err); });
    }

    componentDidMount(){
        this.getJudges()
        this.getTeams()
        this.getSchools()
        this.getEvents()
    }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            centered
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Judges" icon={<PersonPinIcon />} />
            <Tab label="Teams" icon={<ShoppingBasket />} />
            <Tab label="Schools" icon={<Work />} />
            <Tab label="Events" icon={<Schedule />} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><SimpleTableJudge value={this.state.judges}/></TabContainer>}
        {value === 1 && <TabContainer><SimpleTableTeam value={this.state.teams}/></TabContainer>}
        {value === 2 && <TabContainer><SimpleTableSchool value={this.state.schools}/></TabContainer>}
        {value === 3 && <TabContainer><SimpleTableEvent value={this.state.events}/></TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);
