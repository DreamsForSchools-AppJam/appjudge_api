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
      question: '',
      max_score: '',
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

  setEventID = (id) => {
    this.setState({ event_id: id })
  }

  getSchools = () => {
    // console.log(this.state)
    // console.log(Number(this.state.max_score))
    axios.post(`${process.env.REACT_APP_APPJUDGE_SERVICE_URL}/question`,{
      question: this.state.question,
      max_score: Number(this.state.max_score),
      event_id: this.state.event_id,
    })
    .then(() => {this.props.update()})
    .then(() => {this.handleClose()})
    .catch((err) => { console.log(err); });
}

  render() {
    return (
      <div>
        <Button variant="extendedFab" color="primary" onClick={this.handleClickOpen}>Add Question</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText> */}
            <TextField
              margin="dense"
              id="question"
              label="Question text"
              fullWidth
              required
              value={this.state.question}
              onChange={this.handleChange('question')}
            />
            <TextField
              margin="dense"
              id="max_score"
              label="Max Score"
              fullWidth
              value={this.state.max_score}
              onChange={this.handleChange('max_score')}
            />
            <TextField
              margin="dense"
              id="event_id"
              label="Event ID or Choose Event below"
              fullWidth
              required
              value={this.state.event_id}
              onChange={this.handleChange('event_id')}
            />
            <SimpleMenu value={this.props.value} setter={this.setEventID} title="Choose Event"/>
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
