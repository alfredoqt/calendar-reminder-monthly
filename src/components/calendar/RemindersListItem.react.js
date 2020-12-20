// @flow

import type {Reminder} from 'constants/ReminderTypes';

import * as React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import FlexLayout from 'components/shared/FlexLayout.react';
import {getIconSrc} from 'utils/forecast';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#bedaf0',
    borderRadius: 4,
    width: '100%',
    justifyContent: 'flex-start',
  },
  icon: {
    width: 24,
    height: 24,
  },
}));

type Props = $ReadOnly<{
  reminder: Reminder,
  onSelect: (reminder: Reminder) => void,
}>;

export default function RemindersListItem({reminder, onSelect}: Props): React.Node {
  const classes = useStyles();
  return (
    <ButtonBase
      className={classes.root}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(reminder);
      }}
    >
      <FlexLayout align="center">
        <span>{reminder.date.format('LT')}</span>
        {reminder.forecast != null ? (
          <img
            alt={reminder.forecast.weather[0].main}
            src={getIconSrc(reminder.forecast.weather[0].icon)}
            className={classes.icon}
          />
        ) : null}
        <span>{reminder.name}</span>
      </FlexLayout>
    </ButtonBase>
  );
}
