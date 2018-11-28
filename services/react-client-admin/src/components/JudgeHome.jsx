import React, { Component } from 'react';
import TeamCardHolder from './Cards/TeamCardHolder';
import JudgeAppbar from './AppBars/JudgeAppBar';
import axios from 'axios';

class JudgeHome extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            teams: []
        };
        // Set the judge_id on login
        this.judge_id = 1
        this.update = this.update.bind(this)
        // console.log(this.state.teams)
    }

    componentDidMount(){
        // this.setState({team_list: this.props.team_list})
        this.setTeams(this.props.team_list)
    }

    update = () => {
        this.forceUpdate()
    }
	
	addTeam(team){
		// console.log(team.school_id)
		this.getSchool(team.school_id)
		// .then((res) => {return res.data.data})
		.then((school) => {team['event_id'] = school.event_id})
		// .then(() => {team['questions'].push(this.getQuestions(team['question_list']))})
		// .then(() => {console.log(this.getQuestions(team['question_list']))})
        // .then(() => {this.state.teams.push(team)})
        .then(() => {this.setState({teams: this.state.teams.concat(team)})})
        console.log(team)
	}

	getSchool(id){
		return axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/school/${id}`)
		// .then((res) => { console.log(res.data.data) });
		.then((res) => { return res.data.data });
		// .catch((err) => { console.log(err); });
	}

    getTeam(id){
        axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/team/${id}`)
        .then((res) => { this.addTeam(res.data.data) } )
        .catch((err) => { console.log(err); });
    }

	getQuestions(questions){
		var i;
		var que;
		var proms = [];
			for(i=0; i<questions.length; i++){
				proms.push(Promise.resolve(axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/question/${questions[i]}`)))
				// .then((res) => { que.push(res.data.data) })))
			}
		// Promise.all(proms).then(() => {console.log(proms); return que})
	}
	
	getQuestion(id){
		return axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/question/${id}`)
		.then((res) => { return res.data.data })
	}

	setTeams(team_list){
			var i;
			for(i=0; i<team_list.length; i++){
				this.getTeam(team_list[i])
			}
	}

    render() {
        var team = [
            {
                name:"some",
                school_name:"another",
                max_score:10,
                score:5
            },
            {
                name:"agfaf",
                school_name:"anotagdfadfher",
                max_score:10,
                score:5
            },
            {
                name:"agfaf",
                school_name:"anotagdfadfher",
                max_score:10,
                score:5
            },
            {
                name:"agfaf",
                school_name:"anotagdfadfher",
                max_score:10,
                score:5
            },
            {
                name:"agfaf",
                school_name:"anotagdfadfher",
                max_score:10,
                score:5
            }]

        return (
            <div>
                <div>
                    <JudgeAppbar />
                </div>
                <div>
                    <TeamCardHolder value={this.state.teams}/>
                </div>
            </div>
        );
    }
}

export default JudgeHome;
