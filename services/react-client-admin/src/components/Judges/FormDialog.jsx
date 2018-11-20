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
  // constructor() {
  //   super();
  //   this.handleChange = this.handleChange.bind(this);
  // }

  state = {
    open: false,
    name: '',
    username: '',
    job_title: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeName(event) {
    this.setState({name:event.target.value});
  }

  handleChangeUsername(event) {
    this.setState({username:event.target.value});
  }

  handleChangeJob(event) {
    this.setState({job_title:event.target.value});
  }

  getJudges = () => {
    console.log(this.state)
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/judge`,{
      name: this.state.name,
      username: this.state.username,
      job_title: this.state.job_title
    })
    .catch((err) => { console.log(err); });
    this.handleClose()
    // this.props.update()
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
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              fullWidth
              required
              value={this.state.username}
              onChange={this.handleChangeUsername.bind(this)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              value={this.state.name}
              onChange={this.handleChangeName.bind(this)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="job_title"
              label="Job Title"
              fullWidth
              value={this.state.job_title}
              onChange={this.handleChangeJob.bind(this)}
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
