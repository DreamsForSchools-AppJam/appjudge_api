import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SimpleMenu from '../SimpleMenu';
import axios from 'axios';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  buttons: {
    display: 'flex'
  },
  buttonright: {
    marginLeft: theme.spacing.unit * 3
  }
});

class SimpleTableScores extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      event_id: 0,
      scores: [],
      judges: [],
      schools: [],
      team_list: [],
      teams: [],
      teamsMap: {},
      finalmap: {},
      judgenames: [],
      final: [["","",[""]]],
      teamnames: []
    }
  }

  setEventID = (id) => {
    this.setState({ event_id: id })
    this.getEvent(id)
    .then((event) => {
      this.setState({event: event.data.data})
      this.getTotalScore(id)
      .then(scores => {
        scores = scores.data.data
        this.setState({finalmap: scores})
        var final = []
        Object.keys(scores).sort().forEach(key => {
          var scs = []
          Object.keys(scores[key]['judges']).sort().forEach(k => {
            scs.push(scores[key]['judges'][k]['totalscore'])
          })
          final.push([scores[key]['name'], key, scs])
        })
        this.setState({final: final})
        console.log("Total scores", final)
        return scores
      })
      .then(teams => {
        // console.log("State", this.state.event)
        this.getJudges(this.state.event.judge_list)
        .then(judges => {
          judges = judges.map(judge => judge.name)
          // console.log("Judges", judges)
          this.setState({judgenames: judges})
        })
      })
    })
  }

  createEvent = (event_id) =>{
    var event;
    for(var i=0; i <= this.props.events.length; i++){
      if (this.props.events[i].id === event_id){
        event = this.props.events[i]
        break
      }
    }
    return event
  }
  
  createData = (event) => {
    this.getSchools(event.school_list)
    .then((schools)=> {
      var props = [] 
      for(var i=0; i<schools.length; i++){
        props.push(Promise.resolve(this.getTeams(schools[i].team_list)
        .then((res) => { return res })))
      }
      Promise.all(props)
      .then(res => {
        var teams = new Set()
        for(var i=0; i<res.length; i++){
          res[i].forEach(teams.add, teams) 
        }
        return [...teams]
      })
      .then(teams => {
        this.setState({teams: teams})
        console.log("Teams here", teams)
        // var teamsMap = new Map()
        var teamsMap = {}
        for(var i=0; i<teams.length; i++){
          teamsMap[teams[i].id] = teams[i]
          teamsMap[teams[i].id]['judges'] = new Set()
        }
        this.setState({teamsMap: teamsMap})
        // console.log("Teams Map", teamsMap)
      })
      .then(() => {
        return this.getJudges(event.judge_list)
      })
      .then((judges) => {
        this.setState({judges: judges})
        var teams = this.state.teamsMap
        for(var i=0; i<judges.length; i++){
          for(var j=0; j<judges[i].team_list.length; j++){
            teams[judges[i].team_list[j]]['judges'][judges[i].id] = judges[i]
          }
        }
        this.setState({teamsMap: teams})
        console.log("Final", teams)
        return teams
        // console.log(this.state)
      })
      // .then((teamsMap) => {
      //   console.log("state", this.state)
      //   console.log("teamsMap", teamsMap)
      //   const adder = (a, b) => a+b 
      //   var proms = []
      //   for (var team_id in teamsMap){
      //     if(teamsMap.hasOwnProperty(team_id)){
      //       for (var judge_id in teamsMap[team_id]['judges']){
      //         if(teamsMap[team_id]['judges'].hasOwnProperty(judge_id)){
      //           proms.push(Promise.resolve(
      //             this.getTotalScore(this.state.event_id, team_id, judge_id, teamsMap[team_id]['judges'][judge_id].question_list)
      //           .then(scores => {
      //             // teamsMap[team_id]['judges'][judge_id]['totalscore'] = scores.map(a => a.score).reduce(adder)
      //             // console.log("scores", scores.reduce(adder))
      //             return [team_id, judge_id, scores]
      //           })))
      //         }
      //       }
      //     }
      //   }
      //   Promise.all(proms)
      //   .then(res => {
      //     for(const [team_id, judge_id, score] of res){
      //       // console.log("scores", score)
      //       teamsMap[team_id]['judges'][judge_id]['totalscore'] = score
      //       console.log("scores", teamsMap[team_id]['judges'][judge_id]['totalscore'])
      //     }
      //     return teamsMap
      //   })
      //   .then((teamsMap) => {
      //     this.setState({teamsMap: teamsMap})
      //     console.log("More final", this.state.teamsMap[1]['judges'][1]['totalscore'])
      //   })
      // })
    })

    // .then(() => {return this.getJudges(event.judge_list)})
    // .then((judges) => {
    //   this.setState({judges: judges})
    //   return judges
    // })
    // .then((judges) => {
    //   var teams = []
    //   for(var i=0; i<judges.length; i++){
    //     teams = this.getTeams(judges[i].team_list)
    //     for(var j=0; j<teams.length; j++){
          
    //     }
    //   }
    //   console.log("Teams proms", judges, teams)
    //   return (judges, teams)
    // })
    // .then((judges, teams) => {
    //   for(var i=0; i<judges.length; i++){
    //     teams[i]['teams'] = teams[i]
    //   }
    //   this.setState({judges: judges})
    // })
    // .then(() => {console.log(this.state)})
  }

  getJudges = (judge_list) => {
    console.log("Judges")
    var proms = [];
			for(var i=0; i<judge_list.length; i++){
				proms.push(Promise.resolve(axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/judge/${judge_list[i]}`))
        .then((res) => {return res.data.data;}))
      }
      return Promise.all(proms)
  }

  getTotalScore = (event_id) => {
    console.log("Total question")
		return axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/event/totalscore/${event_id}`)
  }

  getSchools = (school_list) => {
    console.log("Schools")
    var proms = [];
			for(var i=0; i<school_list.length; i++){
				proms.push(Promise.resolve(axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/school/${school_list[i]}`))
        .then((res) => {return res.data.data;}))
      }
      return Promise.all(proms)
  }

  getTeams = (team_list) => {
    console.log("Teams")
    var proms = [];
			for(var i=0; i<team_list.length; i++){
				proms.push(Promise.resolve(axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/team/${team_list[i]}`))
        .then((res) => {return res.data.data;}))
      }
      return Promise.all(proms)
  }

  getEvent = (id) => {
    return axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/event/${id}`)
  }

  getScores = (id) => {
    console.log(this.state, id)
    axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/scores/${id}`)
    .then((res) => {this.setState({scores: res.data.data})})
    .catch((err) => { console.log(err); });
  }

  render(){
    const { classes } = this.props;

    return (
      <div>
      <div className={classes.buttons}>
        <SimpleMenu value={this.props.events} setter={this.setEventID} title="Choose Event"/>
      </div>
      <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Team name</TableCell>
              {this.state.judgenames.map(name => {
                return (
                  <TableCell key={name} numeric>{name}</TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.final.map(item => {
              // classes.event_id = score.event_id
              console.log("Finals", item)
              return (
                <TableRow key={item[1]}>
                  <TableCell component="th">{item[0]}</TableCell>
                  {item[2].map(score => {
                    return (
                    <TableCell numeric>{score}</TableCell>
                    )
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      </div>
      </div>
    );}
}

SimpleTableScores.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTableScores);
