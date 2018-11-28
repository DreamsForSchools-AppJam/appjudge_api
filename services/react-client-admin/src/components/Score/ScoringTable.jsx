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
    minWidth: 100,
  },
});

// function ccyFormat(num) {
//   return `${num.toFixed(2)}`;
// }

// function priceRow(qty, unit) {
//   return qty * unit;
// }

// function createRow(id, desc, qty, unit) {
//   const price = priceRow(qty, unit);
//   return { id, desc, qty, unit, price };
// }

// function subtotal(items) {
//   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
// }

// const rows = [
//   ['Paperclips (Box)', 100, 1.15],
//   ['Paper (Case)', 10, 45.99],
//   ['Waste Basket', 2, 17.99],
// ].map((row, id) => createRow(id, ...row));

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

function ScoringTable(props) {
  const { classes } = props;
  var totalScore = 0
  var maxTotalScore = 0

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Question</TableCell>
            <TableCell numeric>Score</TableCell>
            <TableCell numeric>Max</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.questions.map(question => {
                totalScore = totalScore + question.score;
                maxTotalScore = maxTotalScore + question.max_score;
                return (
                <TableRow key={question.id}>
                    <TableCell>{question.question}</TableCell>
                    <TableCell numeric>{question.score}</TableCell>
                    <TableCell numeric>{question.max_score}</TableCell>
                </TableRow>
            );
          })}
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell numeric>{totalScore}</TableCell>
            <TableCell numeric>{maxTotalScore}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

ScoringTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScoringTable);
