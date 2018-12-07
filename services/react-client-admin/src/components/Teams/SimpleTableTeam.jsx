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


function SimpleTableTeam(props) {
  const { classes } = props;

  return (
    <div>
    <div>
      <FormDialog update={props.update}  value={props.schools}/>
    </div>
    <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>ID</TableCell>
            <TableCell numeric>School ID</TableCell>
            <TableCell>Info</TableCell>
            <TableCell numeric>Student List</TableCell>
            <TableCell numeric>Mentor List</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.value.map(team => {
            return (
              <TableRow key={team.id}>
                <TableCell component="th" scope="row">
                  {team.name}
                </TableCell>
                <TableCell numeric>{team.id}</TableCell>
                <TableCell numeric>{team.school_id}</TableCell>
                <TableCell >{team.info}</TableCell>
                <TableCell numeric>{team.student_list.toString()}</TableCell>
                <TableCell numeric>{team.mentor_list.toString()}</TableCell>
                <TableCell><AlertDialog remove={props.remove} qid={team.id}/></TableCell>
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

SimpleTableTeam.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTableTeam);
