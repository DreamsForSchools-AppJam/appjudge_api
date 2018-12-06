import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormDialog from './FormDialog';
import { Button } from '@material-ui/core';
import axios from 'axios';
import FormDialogSmall from './FormDialogSmall';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  buttons: {
    display: 'flex'
  },
  buttonright: {
    marginLeft: theme.spacing.unit * 3
  }
});

function SimpleTableJudge(props) {
  const { classes } = props;

  return (
    <div>
    <div className={classes.buttons}>
      <FormDialog update={props.update} value={props.events}/>
      <FormDialogSmall update={props.update} value={props.events} className={classes.buttonright}/>
      {/* <Button className={classes.buttonright} onClick={classes.handleClick} variant="extendedFab" color="primary">Auto Assign Teams</Button> */}
    </div>
    <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>ID</TableCell>
            <TableCell numeric>Event ID</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Team ID List</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Password</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.value.map(judge => {
            classes.event_id = judge.event_id
            return (
              <TableRow key={judge.id}>
                <TableCell component="th" scope="row">
                  {judge.name}
                </TableCell>
                <TableCell numeric>{judge.id}</TableCell>
                <TableCell numeric>{judge.event_id}</TableCell>
                <TableCell>{judge.job_title}</TableCell>
                <TableCell>{judge.team_list.toString()}</TableCell>
                <TableCell>{judge.username}</TableCell>
                <TableCell>{judge.password}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
    </div>
    </div>
  );
}

SimpleTableJudge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTableJudge);
