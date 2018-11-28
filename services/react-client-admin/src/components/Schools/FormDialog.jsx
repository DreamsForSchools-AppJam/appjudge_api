import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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
    info: '',
    event_id: ''
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

  handleChangeInfo(event) {
    this.setState({info:event.target.value});
  }

  handleChangeEventId(event) {
    this.setState({event_id:event.target.value});
  }

  getSchools = () => {
    console.log(this.state)
    axios.post(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/school`,{
      name: this.state.name,
      info: this.state.info,
      event_id: this.state.event_id,
    })
    .catch((err) => { console.log(err); });
    this.handleClose()
    // this.props.update()
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
              value={this.state.name}
              onChange={this.handleChangeName.bind(this)}
            />
            <TextField
              margin="dense"
              id="info"
              label="Info"
              fullWidth
              value={this.state.info}
              onChange={this.handleChangeInfo.bind(this)}
            />
            <TextField
              margin="dense"
              id="event_id"
              label="Event ID"
              fullWidth
              required
              value={this.state.event_id}
              onChange={this.handleChangeEventId.bind(this)}
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
