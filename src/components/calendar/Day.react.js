// @flow

import * as React from 'react';
import {useCallback} from 'react';
import dayjs from 'dayjs';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {isWeekend} from 'utils/dates';
import ButtonBase from '@material-ui/core/ButtonBase';
import FlexLayout from 'components/shared/FlexLayout.react';
import useSortedRemindersInDay from 'stores/hooks/useSortedRemindersInDay';
import RemindersList from 'components/calendar/RemindersList.react';
import {useDispatch} from 'stores/hooks/CalendarStoreHooks';
import {setSelectedReminder} from 'actions/CalendarCurrentReminderDataActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    width: '100%',
    borderWidth: 1,
    borderColor: theme.palette.grey[400],
    borderStyle: 'solid',
    padding: theme.spacing(0.5),
    // Neighboring months background
    backgroundColor:
      props.date.month() !== props.monthIndex ? theme.palette.grey[200] : 'initial',
    color:
      props.date.month() !== props.monthIndex
        ? theme.palette.text.secondary
        : isWeekend(props.date)
        ? theme.palette.primary.main
        : theme.palette.text.primary,
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  layout: {
    width: '100%',
  },
  dayText: {
    fontWeight: 700,
  },
  delete: {
    flexGrow: 1,
  },
}));

type Props = $ReadOnly<{
  date: dayjs.Dayjs,
  // Index of the navigation month
  monthIndex: number,
  onSelectActiveDate: (date: dayjs.Dayjs) => void,
  onDeleteReminders: (date: dayjs.Dayjs) => void,
}>;

export default function Day({
  date,
  monthIndex,
  onSelectActiveDate,
  onDeleteReminders,
}: Props): React.Node {
  const classes = useStyles({date, monthIndex});
  const reminders = useSortedRemindersInDay(date);
  const dispatch = useDispatch();

  const onSelect = useCallback(
    (reminder) => {
      dispatch(setSelectedReminder(reminder));
    },
    [dispatch],
  );

  return (
    <ButtonBase className={classes.root} onClick={() => onSelectActiveDate(date)}>
      <FlexLayout className={classes.layout} direction="vertical">
        <FlexLayout className={classes.layout} align="center" justify="between">
          <IconButton
            disabled={reminders.size === 0}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteReminders(date);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <Typography
            className={classes.dayText}
            variant="subtitle2"
            align="right"
            color="inherit"
          >
            {date.date()}
          </Typography>
        </FlexLayout>
        <RemindersList reminders={reminders.toArray()} onSelect={onSelect} />
      </FlexLayout>
    </ButtonBase>
  );
}
