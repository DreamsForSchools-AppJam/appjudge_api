import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default class FormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      info: '',
      event_id: ''
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

  getSchools = () => {
    console.log(this.state)
    axios.post(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/school`,{
      name: this.state.name,
      info: this.state.info,
      event_id: this.state.event_id,
    })
    .then(() => {this.props.update()})
    .then(() => {this.handleClose()})
    .catch((err) => { console.log(err); });
}

  render() {
    return (
      <div>
        <Button variant="extendedFab" color="primary" onClick={this.handleClickOpen}>Add School</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add School</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText> */}
            <TextField
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              required
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
              id="event_id"
              label="Event ID"
              fullWidth
              required
              value={this.state.event_id}
              onChange={this.handleChange('event_id')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.getSchools} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
