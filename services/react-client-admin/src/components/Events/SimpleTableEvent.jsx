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
import AlertDialog from '../SimpleDeleteDialog';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


function SimpleTable(props) {
  const { classes } = props;

  return (
    <div>
    <div>
      <FormDialog update={props.update}/>
    </div>
    <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>ID</TableCell>
            <TableCell>Judge ID List</TableCell>
            <TableCell>School ID List</TableCell>
            <TableCell >Location</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.value.map(event => {
            return (
              <TableRow key={event.id}>
                <TableCell component="th" scope="event">
                  {event.name}
                </TableCell>
                <TableCell numeric>{event.id}</TableCell>
                <TableCell>{event.judge_list.toString()}</TableCell>
                <TableCell>{event.school_list.toString()}</TableCell>
                <TableCell >{event.location}</TableCell>
                <TableCell><AlertDialog remove={props.remove} qid={event.id}/></TableCell>
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

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
