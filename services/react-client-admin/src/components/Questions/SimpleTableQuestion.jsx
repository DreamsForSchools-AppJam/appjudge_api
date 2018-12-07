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

function SimpleTableQuestion(props) {
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
            <TableCell>Question</TableCell>
            <TableCell numeric>ID</TableCell>
            <TableCell numeric>Max Score</TableCell>
            <TableCell numeric>Event ID</TableCell>
            <TableCell numeric>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {props.value.map(question => {
            return (
              <TableRow key={question.id}>
                <TableCell component="th" scope="row">
                  {question.question}
                </TableCell>
                <TableCell numeric>{question.id}</TableCell>
                <TableCell numeric>{question.max_score}</TableCell>
                <TableCell numeric>{question.event_id}</TableCell>
                <TableCell numeric><AlertDialog remove={props.remove} qid={question.id}/></TableCell>
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

SimpleTableQuestion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTableQuestion);
