// @flow

import * as React from 'react';
import dayjs from 'dayjs';
import FlexLayout from 'components/shared/FlexLayout.react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  day: {
    flexGrow: 1,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

/**
 * Shows the list of weekdays in the dayjs locale: Sunday, Monday, ...
 */
export default function DaysOfWeek(): React.Node {
  const classes = useStyles();
  const weekdays = dayjs.weekdays();
  return (
    <FlexLayout className={classes.root}>
      {weekdays.map((weekday) => (
        <FlexLayout
          className={classes.day}
          key={weekday}
          align="center"
          justify="center"
        >
          <Typography color="inherit">{weekday}</Typography>
        </FlexLayout>
      ))}
    </FlexLayout>
  );
}
