import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Schedule from '@material-ui/icons/Schedule';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Work from '@material-ui/icons/Work';
import Typography from '@material-ui/core/Typography';
import SimpleTableJudge from './Judges/SimpleTableJudge';
import SimpleTableTeam from './Teams/SimpleTableTeam';
import SimpleTableSchool from './Schools/SimpleTableSchool';
import SimpleTableEvent from './Events/SimpleTableEvent';
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
        axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/judges`)
        .then((res) => { this.setState({ judges: res.data.data.judges }); })
        .catch((err) => { console.log(err); });
    }

    getTeams(){
        axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/teams`)
        .then((res) => { this.setState({ teams: res.data.data.teams }); })
        .catch((err) => { console.log(err); });
    }

    getSchools(){
        axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/schools`)
        .then((res) => { this.setState({ schools: res.data.data.schools }); })
        .catch((err) => { console.log(err); });
    }

    getEvents(){
        axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/events`)
        .then((res) => { this.setState({ events: res.data.data.events }); })
        .catch((err) => { console.log(err); });
    }

    componentDidMount(){
        this.getJudges()
        this.getTeams()
        this.getSchools()
        this.getEvents()
    }

    update(){
        console.log("Update Called")
        this.getJudges()
        this.getTeams()
        this.getSchools()
        this.getEvents()
        this.render()
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
            centered
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Events" icon={<Schedule />} />
            <Tab label="Schools" icon={<Work />} />
            <Tab label="Teams" icon={<ShoppingBasket />} />
            <Tab label="Judges" icon={<PersonPinIcon />} />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><SimpleTableEvent update={this.update.bind(this)} value={this.state.events}/></TabContainer>}
        {value === 1 && <TabContainer><SimpleTableSchool update={this.update.bind(this)} value={this.state.schools}/></TabContainer>}
        {value === 2 && <TabContainer><SimpleTableTeam update={this.update.bind(this)} value={this.state.teams}/></TabContainer>}
        {value === 3 && <TabContainer><SimpleTableJudge update={this.update.bind(this)} value={this.state.judges}/></TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);
