import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      username: '',
      job_title: '',
      event_id: '',
      password: ''
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  getJudges = () => {
    console.log(this.state)
    axios.post(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/judge`,{
      name: this.state.name,
      username: this.state.username,
      job_title: this.state.job_title,
      event_id: this.state.event_id,
      password: this.state.password
    })
    .then(() => {this.props.update()})
    .then(() => {this.handleClose()})
    .catch((err) => { console.log(err); });
}

  render() {
    return (
      <div>
        <Button variant="extendedFab" color="primary" onClick={this.handleClickOpen}>Add Judge</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Judge</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText> */}
            <TextField
              margin="dense"
              id="name"
              label="Name"
              required
              fullWidth
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
            <TextField
              margin="dense"
              id="job_title"
              label="Job Title"
              fullWidth
              value={this.state.job_title}
              onChange={this.handleChange('job_title')}
            />
            <TextField
              margin="dense"
              id="event_id"
              label="Event ID"
              fullWidth
              required
              value={this.state.event_id}
              onChange={this.handleChange('event_id')}
            />
            <TextField
              margin="dense"
              id="username"
              label="Username"
              fullWidth
              required
              value={this.state.username}
              onChange={this.handleChange('username')}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              fullWidth
              required
              value={this.state.password}
              onChange={this.handleChange('password')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.getJudges} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
