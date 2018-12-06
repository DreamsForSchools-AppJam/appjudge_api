import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import SimpleMenu from '../SimpleMenu';

export default class FormDialogSmall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event_id: '',
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

  setEventID = (id) => {
    this.setState({ event_id: id })
  }

  handleClick = () =>{
    axios.post(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/judge/autoassign`,{
      event_id: this.state.event_id
    })
    .then((res) => {
      this.props.update()
      this.handleClose()
      alert(res.data.message);
    })
    .catch((err) => { console.log(err); });
  }

  render() {
    return (
      <div>
        <Button variant="extendedFab" color="primary" onClick={this.handleClickOpen}>Auto Assign Judges</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Select Event</DialogTitle>
          <DialogContent>
            <SimpleMenu value={this.props.value} setter={this.setEventID} title="Choose Event"/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClick} color="primary">
              Assign
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
