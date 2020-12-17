// @flow

import type {Reminder} from 'constants/ReminderTypes';

import keyMirror from 'utils/keyMirror';
import dayjs from 'dayjs';

const ActionTypes = keyMirror({
  ADD_REMINDER: null,
  REMOVE_REMINDER: null,
  REMOVE_REMINDERS_IN_DAY: null,
  UPDATE_REMINDER: null,
});

export type CalendarRemindersAction = $ReadOnly<
  | {
      type: typeof ActionTypes.ADD_REMINDER,
      payload: Reminder,
    }
  | {
      type: typeof ActionTypes.REMOVE_REMINDER,
      // ID
      payload: string,
    }
  | {
      type: typeof ActionTypes.REMOVE_REMINDERS_IN_DAY,
      payload: dayjs.Dayjs,
    }
  | {
      type: typeof ActionTypes.UPDATE_REMINDER,
      // Contains new data and same ID
      payload: Reminder,
    },
>;

export default ActionTypes;
