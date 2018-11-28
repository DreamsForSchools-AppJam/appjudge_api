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
    }

    componentDidMount(){
        this.setTeams(this.props.team_list)
    }

    update = () => {
        this.forceUpdate()
    }
	
	addTeam(team){
		// console.log(team.school_id)
		this.getSchool(team.school_id)
		// .then((res) => {return res.data.data})
		.then((school) => {
            team['event_id'] = school.event_id;
            team['school_name'] = school.name;
        })
		.then(() => {
            team['questions'] = [];
            // team['questions'].push(Promise.resolve(this.getQuestions(team['question_list'])));
            return this.getQuestions(team['question_list'])
        })
        .then((questions) => {
            // console.log("Result", questions);
            team['questions'] = team['questions'].concat(questions)
        })
		// .then((que = this.getQuestions(team['question_list'])) => {console.log(que.then())})
        .then(() => {
            // console.log("Questions", team['questions'])
            this.setState({teams: this.state.teams.concat(team)})
            console.log(team)
        })
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
		var proms = [];
			for(i=0; i<questions.length; i++){
				proms.push(Promise.resolve(axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/question/${questions[i]}`))
				.then((res) => { 
                    // console.log("Question", res.data.data)
                    return res.data.data;
                }))
            }
        // console.log("Proms", proms)
        return Promise.all(proms)
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
        // var team = [
        //     {
        //         name:"some",
        //         school_name:"another",
        //         max_score:10,
        //         score:5
        //     },
        //     {
        //         name:"agfaf",
        //         school_name:"anotagdfadfher",
        //         max_score:10,
        //         score:5
        //     },
        //     {
        //         name:"agfaf",
        //         school_name:"anotagdfadfher",
        //         max_score:10,
        //         score:5
        //     },
        //     {
        //         name:"agfaf",
        //         school_name:"anotagdfadfher",
        //         max_score:10,
        //         score:5
        //     },
        //     {
        //         name:"agfaf",
        //         school_name:"anotagdfadfher",
        //         max_score:10,
        //         score:5
        //     }]

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
