import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormDialog from './FormDialog'
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

function SimpleTableSchool(props) {
  const { classes } = props;

  return (
    <div>
    <div>
      <FormDialog update={props.update} value={props.events}/>
    </div>
    <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>ID</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Team ID list</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.value.map(school => {
            return (
              <TableRow key={school.id}>
                <TableCell component="th" scope="row">
                  {school.name}
                </TableCell>
                <TableCell numeric>{school.id}</TableCell>
                <TableCell >{school.info}</TableCell>
                <TableCell >{school.team_list.toString()}</TableCell>
                <TableCell><AlertDialog remove={props.remove} qid={school.id}/></TableCell>
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

SimpleTableSchool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTableSchool);
