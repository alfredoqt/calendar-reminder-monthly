// @flow

import type {Reminder} from 'constants/ReminderTypes';

import keyMirror from 'utils/keyMirror';
import dayjs from 'dayjs';

const ActionTypes = keyMirror({
  SET_SELECTED_DATE: null,
  REMOVE_SELECTED_DATE: null,
  SET_SELECTED_REMINDER: null,
  REMOVE_SELECTED_REMINDER: null,
  REMOVE_ALL: null,
});

export type CalendarCurrentReminderDataAction = $ReadOnly<
  | {
      type: typeof ActionTypes.SET_SELECTED_DATE,
      payload: dayjs.Dayjs,
    }
  | {
      type: typeof ActionTypes.REMOVE_SELECTED_DATE,
    }
  | {
      type: typeof ActionTypes.SET_SELECTED_REMINDER,
      payload: Reminder,
    }
  | {
      type: typeof ActionTypes.REMOVE_SELECTED_REMINDER,
    }
  | {
      type: typeof ActionTypes.REMOVE_ALL,
    },
>;

export default ActionTypes;
