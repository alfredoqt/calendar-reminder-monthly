// @flow

import * as React from 'react';
import dayjs from 'dayjs';
import FlexLayout from 'components/shared/FlexLayout.react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(1),
  },
  icon: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

type Props = $ReadOnly<{
  navigationDate: dayjs.Dayjs,
  setNavigationDate: (dayjs.Dayjs) => void,
}>;

export default function MonthNavigator({
  navigationDate,
  setNavigationDate,
}: Props): React.Node {
  const classes = useStyles();

  // Not using useCallback here because the navigationDate changes frequently
  // so the callback would be recreated on every re render
  function onPrev() {
    setNavigationDate(navigationDate.subtract(1, 'month'));
  }
  function onNext() {
    setNavigationDate(navigationDate.add(1, 'month'));
  }

  return (
    <FlexLayout className={classes.root} justify="center" align="center">
      <IconButton className={classes.icon} onClick={onPrev}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography variant="h6">{navigationDate.format('MMMM YYYY')}</Typography>
      <IconButton className={classes.icon} onClick={onNext}>
        <ChevronRightIcon />
      </IconButton>
    </FlexLayout>
  );
}
