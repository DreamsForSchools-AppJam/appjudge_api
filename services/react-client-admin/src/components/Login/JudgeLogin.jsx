import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SearchAppBar from '../AppBars/SearchAppBar'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Route, BrowserRouter } from 'react-router-dom'
import JudgeHome from '../JudgeHome';



const styles = theme => ({
    root: {
	  ...theme.mixins.gutters(),
	  paddingTop: theme.spacing.unit * 3,
	  paddingBottom: theme.spacing.unit * 3,
	  paddingLeft: theme.spacing.unit * 6,
	  paddingRight: theme.spacing.unit * 6,
      margin: theme.spacing.unit * 6
    },
  });

  class JudgeLogin extends Component {
  
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }
	
	getJudge(username, password){
        return axios.get(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/judge/${username}/${password}`)
	}
	
    handleSubmit = () => {
		// console.log(this.state)
		this.getJudge(this.state.username, this.state.password)
		.then((res) => { 
			// console.log(res)
			if (res.data.status === "success"){
				// Open link
				console.log("Inside JudgeLogin", res.data.data)
				this.setState({judge: res.data.date})
				this.props.history.push({
					pathname: '/home/judge',
					state: {judge: res.data.data}
				})
			}
			else{
                // Show pop up
                alert("ERROR: Invalid Username or password")
				console.log("ERROR: Invalid Username or password")
			}
		})
		.catch((err) => { 
            // Show pop up
            alert("ERROR: Invalid Username or password")
			console.log("ERROR: Invalid Username or password", err) 
		});
    }

	// renderRedirect = () => {
	// 	if (this.state.redirect) {
	// 		console.log("Inside redirect", this.state.judge)
	// 	  return <Redirect to=
	// 		{{
	// 			pathname: '/home/judge',
	// 			state: {judge: this.state.judge}
	// 		}}/>
	// 	}
	//   }
	
    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    render(){
        const {classes} = this.props        
        return (
            <div>
                <div>
                    <SearchAppBar text="Judge Login"/>
                </div>
                <div>
                    <Paper className={classes.root} elevation={3}>
                        <Typography variant="h5" component="h3">
                        Login with your assigned Username and Password.
                        </Typography>
                        <Typography component="p">
                        Please contact the event coordinators if you forgot, or didn't receive login information.
                        </Typography>
                        <div>
                            <TextField
                                required
                                id="standard-required"
                                label="Username"
                                className={this.state.username}
                                margin="normal"
                                onChange={this.handleChange('username')}
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                id="standard-required"
                                label="Password"
                                className={this.state.password}
                                margin="normal"
                                onChange={this.handleChange('password')}
                            />
                        </div>
                        <br></br>
						<div>
        					{/* {this.renderRedirect()} */}
							<Button 
							variant="contained" 
							color="primary" 
							onClick={this.handleSubmit}>
								Submit
							</Button>
						</div>
                    </Paper>
                </div>
				<BrowserRouter>
					<Route 
						path="/home/judge" 
						render={() => <JudgeHome judge={this.state.judge} />} 
					/>
				</BrowserRouter>
            </div>
        );
    }
}

JudgeLogin.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(JudgeLogin);