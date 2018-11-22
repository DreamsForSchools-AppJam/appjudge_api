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

  handleChangeinfo(event) {
    this.setState({info:event.target.value});
  }

  handleChangeJob(event) {
    this.setState({date:event.target.value});
  }

  handleChangeJudgelist(event) {
    this.setState({judge_list:event.target.value});
  }

  getTeams = () => {
    console.log(this.state)
    axios.post(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/event`,{
      name: this.state.name,
      info: this.state.info,
      date: this.state.date,
      judge_list: this.state.judge_list,
    })
    .catch((err) => { console.log(err); });
    this.handleClose()
    // this.props.update()
}

  render() {
    return (
      <div>
        <Button variant="extendedFab" color="primary" onClick={this.handleClickOpen}>Add Events</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Events</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="info"
              label="info"
              fullWidth
              required
              value={this.state.info}
              onChange={this.handleChangeinfo.bind(this)}
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
              id="date"
              label="Date"
              fullWidth
              value={this.state.date}
              onChange={this.handleChangeJob.bind(this)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="judge_list"
              label="Judge List"
              fullWidth
              value={this.state.judge_list}
              onChange={this.handleChangeJudgelist.bind(this)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.getTeams} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
