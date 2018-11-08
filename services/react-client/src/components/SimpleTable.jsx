import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function judgeTable(judges){
  return (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell numeric>Id</TableCell>
        <TableCell>Job Title</TableCell>
        <TableCell>Username</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {judges.map(judge => {
        return (
          <TableRow key={judge.id}>
            <TableCell component="th" scope="row">
              {judge.name}
            </TableCell>
            <TableCell numeric>{judge.id}</TableCell>
            <TableCell>{judge.job_title}</TableCell>
            <TableCell>{judge.username}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
    </Table>
  )
}

function teamTable(teams){
  return (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell numeric>Id</TableCell>
        <TableCell>Info</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {teams.map(team => {
        return (
          <TableRow key={team.id}>
            <TableCell component="th" scope="row">
              {team.name}
            </TableCell>
            <TableCell numeric>{team.id}</TableCell>
            <TableCell>{team.info}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
    </Table>
  )
}

function SimpleTable(props) {
  const { classes } = props;
  var result;

  if (props.key === "judge"){
    return (
      <Paper className={classes.root}>
        {judgeTable(props.value)}
      </Paper>
    );
    // result = judgeTable(props.value);
  }
  else if (props.key === "team"){
    return (
      <Paper className={classes.root}>
        {teamTable(props.value)}
      </Paper>
    );
    // result = teamTable(props.value);
  }

  // return (
  //   <Paper className={classes.root}>
  //     {result}
  //   </Paper>
  // );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
