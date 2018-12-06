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

function SimpleTableMentor(props) {
  const { classes } = props;

  return (
    <div>
      <div>
        <FormDialog update={props.update} value={props.teams}/>
      </div>
    <div>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>ID</TableCell>
            <TableCell>info</TableCell>
            <TableCell>Team ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.value.map(mentor => {
            return (
              <TableRow key={mentor.id}>
                <TableCell component="th" scope="row">
                  {mentor.name}
                </TableCell>
                <TableCell numeric>{mentor.id}</TableCell>
                <TableCell>{mentor.info}</TableCell>
                <TableCell>{mentor.team_id}</TableCell>
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

SimpleTableMentor.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTableMentor);
