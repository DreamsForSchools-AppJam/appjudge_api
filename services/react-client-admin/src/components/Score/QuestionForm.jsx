import React from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ScoringTable from "./ScoringTable"
import axios from 'axios';
import CustomizedSnackbars from '../Extras/Snackbar'

export default class QuestionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            team: this.props.team,
            mainQuestions: this.props.team.questions
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });

        console.log("Outside", this.state.mainQuestions)
    };

    checkLimit(){
        var flag = false
        for (var key in this.state.mainQuestions){
            if(this.state.mainQuestions[key].score > this.state.mainQuestions[key].max_score){
                flag = true
                break
            }
        }
        if (flag) {
            return "error"
        }
        else{
            this.sendScores(this.state.team.event_id, this.state.team.id, this.state.team.judge_id)
            this.props.isdone(this.props.teamid)
            return "success"
        }
    }

    setScores(event_id, team_id, judge_id){
        // console.log(this.state)
        var proms = [];
        for (var key in this.state.mainQuestions){
            proms.push(Promise.resolve(axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/score/${event_id}/${team_id}/${judge_id}/${key}`)
            .then((res) => {return res.data.data})))
        }
        // for(var i = 0; i < this.state.questions.length; i++){
        //     proms.push(Promise.resolve(axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/score/${event_id}/${team_id}/${judge_id}/${this.state.questions[i].id}`)
        //     .then((res) => {return res.data.data})))
        // }
        Promise.all(proms)
        .then((scores) => {
            var questions = this.state.mainQuestions
            for(var i = 0; i < scores.length; i++){
                questions[scores[i].question_id]['score'] = scores[i].score;
            }
            this.setState({ questions: questions })
        })
    }

    sendScores(event_id, team_id, judge_id){
        // console.log(this.state)
        var proms = [];
        for (var key in this.state.mainQuestions){
            console.log("Score", this.state.mainQuestions[key].score)
            proms.push(Promise.resolve(axios.post(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/score`,
            {
                judge_id: judge_id,
                event_id: event_id,
                team_id: team_id,
                question_id: key,
                score: this.state.mainQuestions[key].score
            })
            .then((res) => {return res.data.data})))
        }
        Promise.all(proms)
    }
    
    componentDidMount(){
        this.setScores(this.state.team.event_id, this.state.team.id, this.state.team.judge_id)
    }

    render() {
        return (
        <div>
            <Button onClick={this.handleClickOpen} size="small" variant="contained" color="primary">Score</Button>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            >
            <DialogTitle id="form-dialog-title">Score Team: {this.state.team.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Please make sure you check your score and make sure it is less than the max before submitting it
                </DialogContentText>

                <ScoringTable mainQuestions={this.state.mainQuestions} teams={this.props.team}/>

            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                Cancel
                </Button>
                <CustomizedSnackbars onClick={this.handleClose} checkLimit={this.checkLimit.bind(this)} close={this.handleClose} color="primary"/>
                {/* Submit
                </CustomizedSnackbars> */}
            </DialogActions>
            </Dialog>
        </div>
        );
    }
}
