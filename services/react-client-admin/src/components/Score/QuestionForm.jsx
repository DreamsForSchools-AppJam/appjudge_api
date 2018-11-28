import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ScoringTable from "./ScoringTable"

export default class FormDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            team: this.props.team,
            questions: this.props.team.questions
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render(props) {
        return (
        <div>
            <Button onClick={this.handleClickOpen} size="small" variant="contained" color="primary">Score</Button>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Score Team: {this.state.team.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Please make sure you check your score and make sure it is less than the max before submitting it
                </DialogContentText>
                {/* <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                /> */}
                <ScoringTable questions={this.state.questions}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary">
                Subscribe
                </Button>
            </DialogActions>
            </Dialog>
        </div>
        );
    }
}
