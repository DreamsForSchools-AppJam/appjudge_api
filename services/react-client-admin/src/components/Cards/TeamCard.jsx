import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    minWidth: 275,
    marginBottom: 10,
    display: 'flex'
  },
  pos: {
    marginBottom: 12,
  },
});

function TeamCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card} elevation={3}>
      <CardContent>
        <Typography variant="h5" component="h5">
          {props.name}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" className={classes.pos}>
          {props.school_name}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography  variant="h6" component="h7">
          Total Score: {props.score} / {props.max_score}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Score</Button>
      </CardActions>
    </Card>
  );
}

TeamCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeamCard);
