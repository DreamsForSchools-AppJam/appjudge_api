import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Schedule from '@material-ui/icons/Schedule';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import List from '@material-ui/icons/List';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Accessibility from '@material-ui/icons/Accessibility';
import Work from '@material-ui/icons/Work';
import Typography from '@material-ui/core/Typography';
import SimpleTableJudge from './Judges/SimpleTableJudge';
import SimpleTableTeam from './Teams/SimpleTableTeam';
import SimpleTableSchool from './Schools/SimpleTableSchool';
import SimpleTableEvent from './Events/SimpleTableEvent';
import SimpleTableStudent from './Students/SimpleTableStudent';
import SimpleTableMentor from './Mentors/SimpleTableMentor';
import SimpleTableQuestion from './Questions/SimpleTableQuestion';
import axios from 'axios';
import SimpleTableScores from './Score/SimpleTableScores';


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
    students: [],
    mentors: [],
    events: [],
    schools: [],
    questions: [],
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

    getStudents(){
      axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/students`)
      .then((res) => { this.setState({ students: res.data.data.students }); })
      .catch((err) => { console.log(err); });
    }

    getMentors(){
      axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/mentors`)
      .then((res) => { this.setState({ mentors: res.data.data.mentors }); })
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

    getQuestions(){
      axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/questions`)
      .then((res) => { this.setState({ questions: res.data.data.questions }); })
      .catch((err) => { console.log(err); });
  }

    componentDidMount(){
        this.update()
    }

    update(){
        console.log("Update Called", this.state)
        this.getJudges()
        this.getTeams()
        this.getStudents()
        this.getMentors()
        this.getSchools()
        this.getEvents()
        this.getQuestions()
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
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Events" icon={<Schedule />} />
            <Tab label="Schools" icon={<Work />} />
            <Tab label="Teams" icon={<ShoppingBasket />} />
            <Tab label="Students" icon={<Accessibility />} />
            <Tab label="Mentors" icon={<Accessibility />} />
            <Tab label="Questions" icon={<List />} />
            <Tab label="Judges" icon={<PersonPinIcon />} />
            <Tab label="Scores" icon={<List />} />
          </Tabs>
        </AppBar>
        {/* {console.log(this.state.events)} */}
        {value === 0 && <TabContainer><SimpleTableEvent update={this.update.bind(this)} value={this.state.events}/></TabContainer>}
        {value === 1 && <TabContainer><SimpleTableSchool update={this.update.bind(this)} value={this.state.schools} events={this.state.events}/></TabContainer>}
        {value === 2 && <TabContainer><SimpleTableTeam update={this.update.bind(this)} value={this.state.teams} schools={this.state.schools}/></TabContainer>}
        {value === 3 && <TabContainer><SimpleTableStudent update={this.update.bind(this)} value={this.state.students}  teams={this.state.teams}/></TabContainer>}
        {value === 4 && <TabContainer><SimpleTableMentor update={this.update.bind(this)} value={this.state.mentors}  teams={this.state.teams}/></TabContainer>}
        {value === 5 && <TabContainer><SimpleTableQuestion update={this.update.bind(this)} value={this.state.questions} events={this.state.events}/></TabContainer>}
        {value === 6 && <TabContainer><SimpleTableJudge update={this.update.bind(this)} value={this.state.judges} events={this.state.events}/></TabContainer>}
        {value === 7 && <TabContainer><SimpleTableScores update={this.update.bind(this)} value={this.state.judges} events={this.state.events}/></TabContainer>}
      </div>
    );
  }
}

ScrollableTabsButtonForce.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonForce);
