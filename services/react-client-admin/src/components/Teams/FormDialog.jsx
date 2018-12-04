import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
      school_id: ''
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

  setSchoolID = (id) => {
    this.setState({ school_id: id })
  }

  getTeams = () => {
    console.log(this.state)
    axios.post(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/team`,{
      name: this.state.name,
      info: this.state.info,
      school_id: this.state.school_id,
    })
    .then(() => {this.props.update()})
    .then(() => {this.handleClose()})
    .catch((err) => { console.log(err); });
}

  render() {
    return (
      <div>
        <Button variant="extendedFab" color="primary" onClick={this.handleClickOpen}>Add team</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add team</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText> */}
            <TextField
              autoFocus
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
              label="Info"
              fullWidth
              value={this.state.info}
              onChange={this.handleChange('info')}
            />
            <TextField
              margin="dense"
              id="school_id"
              label="School ID or Choose School below"
              fullWidth
              required
              value={this.state.school_id}
              onChange={this.handleChange('school_id')}
            />
            <SimpleMenu value={this.props.value} setter={this.setSchoolID} title="Choose School"/>
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
