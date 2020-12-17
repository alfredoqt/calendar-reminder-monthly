// @flow

import type {Action} from 'constants/CalendarActionTypes';
import type {Reminder} from 'constants/ReminderTypes';

import dayjs from 'dayjs';
import CalendarCurrentReminderDataActionTypes from 'actions/CalendarCurrentReminderDataActionTypes';

export type CalendarCurrentReminderDataStoreState = {
  selectedDate: ?dayjs.Dayjs,
  selectedReminder: ?Reminder,
};

export default function CalendarCurrentReminderDataReducer(
  state: CalendarCurrentReminderDataStoreState = {
    selectedDate: null,
    selectedReminder: null,
  },
  action: Action,
): CalendarCurrentReminderDataStoreState {
  switch (action.type) {
    case CalendarCurrentReminderDataActionTypes.SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };
    case CalendarCurrentReminderDataActionTypes.REMOVE_SELECTED_DATE:
      return {
        ...state,
        selectedDate: null,
      };
    case CalendarCurrentReminderDataActionTypes.SET_SELECTED_REMINDER:
      return {
        ...state,
        selectedReminder: action.payload,
      };
    case CalendarCurrentReminderDataActionTypes.REMOVE_SELECTED_REMINDER:
      return {
        ...state,
        selectedReminder: null,
      };
    case CalendarCurrentReminderDataActionTypes.REMOVE_ALL:
      return {
        selectedDate: null,
        selectedReminder: null,
      };
    default:
      return state;
  }
}
