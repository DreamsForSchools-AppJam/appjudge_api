import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import SimpleMenu from '../SimpleMenu';

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      info: '',
      team_id: '',
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

  setTeamID = (id) => {
    this.setState({ team_id: id })
  }

  getStudents = () => {
    console.log(this.state)
    axios.post(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/student`,{
      name: this.state.name,
      info: this.state.info,
      team_id: this.state.team_id,
    })
    .then(() => {this.props.update()})
    .then(() => {this.handleClose()})
    .catch((err) => { console.log(err); });
}

  render() {
    return (
      <div>
        <Button variant="extendedFab" color="primary" onClick={this.handleClickOpen}>Add Student</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Student</DialogTitle>
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
              id="info"
              label="Additional Info"
              fullWidth
              value={this.state.info}
              onChange={this.handleChange('info')}
            />
            <TextField
              margin="dense"
              id="team_id"
              label="Team ID or Choose Team below"
              fullWidth
              required
              value={this.state.team_id}
              onChange={this.handleChange('team_id')}
            />
            <SimpleMenu value={this.props.value} setter={this.setTeamID} title="Choose Team"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.getStudents} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
