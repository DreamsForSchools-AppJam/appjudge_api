import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
// import InputBase from '@material-ui/core/InputBase';
// import { Input } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 100,
	},
	textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: 50,
  },
});

class ScoringTable extends React.Component {
// function ScoringTable(props) {
	constructor(props){
		super(props)
		this.state = {
			totalScore: 0,
			maxTotalScore: 0,
			mainQuestions: props.mainQuestions,
			questions: []
		}
	}

	componentDidMount(){
		this.updateScores()
	}

	updateScores(){
		var questions = []
		for(var key in this.state.mainQuestions){
			questions.push(this.state.mainQuestions[key])
		}
		this.setState({questions: questions})
		// console.log("here", this.state.mainQuestions)
	}

	// handleChange(id, score) {
	// 	var mainQuestions = this.state.mainQuestions
	// 	mainQuestions[id].score = score
	// 	this.setState({mainQuestions: mainQuestions})
	// 	// this.updateScores()
  // };
	
	handleChange(index, event){
		// console.log(index, event.target.value)
		var questions = this.state.questions
		questions[index].score = event.target.value
		this.setState({questions: questions})
	};

	render() {
		const { classes } = this.props;
		var totalScore = 0
		var maxScore = 0
		var questions = this.state.questions
		// console.log("State", this.state)

		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell colSpan={2}>Question</TableCell>
							<TableCell>Score</TableCell>
							<TableCell numeric>Max Score</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
							{/* {console.log(questions)} */}
							{questions.map((question, index) => {
									totalScore = Number(totalScore) + Number(question.score)
									this.props.teams.score = totalScore
									maxScore = Number(maxScore) + Number(question.max_score)
									return (
									<TableRow key={question.id}>
										<TableCell colSpan={2}>{question.question}</TableCell>
										{/* <TableCell numeric>{question.score}</TableCell> */}

										<TableCell>
											<TextField
												id="standard-number"
												// label="score"
												value={question.score}
												index={index}
												onChange={(event) => this.handleChange(index, event)}
												type="number"
												className={classes.textField}
												InputLabelProps={{
													shrink: true,
												}}
												margin="none"
											/>
										</TableCell>
										{/* <TableCell  defaultValue="number" colSpan={3}><Input></Input></TableCell> */}
										{/* <TableCell><InputBase className={classes.margin} defaultValue="Naked input" /></TableCell> */}
										<TableCell numeric>{question.max_score}</TableCell>
									</TableRow>
								);
							})}
						<TableRow>
							<TableCell rowSpan={1}></TableCell>
							<TableCell colSpan={1}><b>Total</b></TableCell>
							<TableCell ><b>{totalScore}</b></TableCell>
							<TableCell numeric><b>{maxScore}</b></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

ScoringTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScoringTable);
