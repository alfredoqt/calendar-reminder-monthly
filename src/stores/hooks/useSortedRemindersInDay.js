// @flow

import type {Reminder} from 'constants/ReminderTypes';

import {useMappedState} from 'stores/hooks/CalendarStoreHooks';
import dayjs from 'dayjs';
import Immutable from 'immutable';

function getAllRemindersInDay(
  byId: Immutable.Map<string, Reminder>,
  ids: Immutable.List<string>,
  date: dayjs.Dayjs,
): Immutable.Map<string, Reminder> {
  const idsInDay = ids.filter((id) => {
    const reminder = byId.get(id);
    if (reminder == null) {
      return true;
    }

    if (
      reminder.date.year() === date.year() &&
      reminder.date.month() === date.month() &&
      reminder.date.date() === date.date()
    ) {
      return false;
    }
    return true;
  });

  return byId.deleteAll(idsInDay);
}

export default function useSortedRemindersInDay(
  date: dayjs.Dayjs,
): Immutable.List<Reminder> {
  const reminders = useMappedState((state) => state.reminders);
  const inDay = getAllRemindersInDay(reminders.byId, reminders.ids, date);

  // $FlowFixMe
  return inDay.toList().sort((a, b) => a.valueOf() - b.valueOf());
}
