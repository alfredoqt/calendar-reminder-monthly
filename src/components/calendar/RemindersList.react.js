// @flow

import type {Reminder} from 'constants/ReminderTypes';

import * as React from 'react';
import RemindersListItem from 'components/calendar/RemindersListItem.react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    border: 0,
    fontSize: '100%',
    font: 'inherit',
    verticalAlign: 'baseline',
    width: '100%',
  },
  item: {
    marginBottom: theme.spacing(0.5),
  },
}));

type Props = $ReadOnly<{
  reminders: Array<Reminder>,
  onSelect: (reminder: Reminder) => void,
}>;

export default function RemindersList({reminders, onSelect}: Props): React.Node {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      {reminders.map((reminder) => (
        <li className={classes.item} key={reminder.id}>
          <RemindersListItem reminder={reminder} onSelect={onSelect} />
        </li>
      ))}
    </ul>
  );
}
