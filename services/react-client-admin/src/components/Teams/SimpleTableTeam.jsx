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
            <TableCell numeric>Id</TableCell>
            <TableCell>Info</TableCell>
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
                <TableCell >{team.info}</TableCell>
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
